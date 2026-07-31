begin;

-- A traffic event may reach the collector after an inquiry reaches intake.
-- Persist the requested association with the inquiry transaction, then retry
-- resolution without ever making the traveller's inquiry depend on analytics.
create table homeground_private.inquiry_traffic_attribution_outbox (
  inquiry_id uuid primary key
    references homeground_private.inquiries(inquiry_id)
    on delete cascade,
  requested_session_hash text,
  status text not null default 'pending'
    check (status in ('pending', 'attributed', 'expired')),
  created_at timestamptz not null default clock_timestamp(),
  updated_at timestamptz not null default clock_timestamp(),
  next_attempt_at timestamptz,
  last_attempt_at timestamptz,
  resolved_at timestamptz,
  attempt_count integer not null default 0 check (attempt_count >= 0),
  conflict_count integer not null default 0 check (conflict_count >= 0),
  last_conflict_at timestamptz,
  last_result text not null default 'pending'
    check (
      last_result in (
        'pending',
        'waiting_for_session',
        'attributed',
        'expired',
        'internal_error'
      )
    ),
  constraint inquiry_traffic_outbox_session_hash_check check (
    requested_session_hash is null
    or requested_session_hash ~ '^[0-9a-f]{64}$'
  ),
  constraint inquiry_traffic_outbox_state_check check (
    (
      status = 'pending'
      and requested_session_hash is not null
      and next_attempt_at is not null
      and resolved_at is null
    )
    or (
      status in ('attributed', 'expired')
      and next_attempt_at is null
      and resolved_at is not null
    )
  )
);

create index inquiry_traffic_attribution_outbox_claim_idx
  on homeground_private.inquiry_traffic_attribution_outbox(
    next_attempt_at,
    created_at
  )
  where status = 'pending';

alter table homeground_private.inquiry_traffic_attribution_outbox
  enable row level security;
alter table homeground_private.inquiry_traffic_attribution_outbox
  force row level security;

revoke all on table
  homeground_private.inquiry_traffic_attribution_outbox
  from public, anon, authenticated, service_role;

create or replace function
  homeground_private.resolve_inquiry_traffic_attribution_v1(
    p_inquiry_id uuid
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  observed_at timestamptz := clock_timestamp();
  candidate_job
    homeground_private.inquiry_traffic_attribution_outbox%rowtype;
  candidate_session homeground_private.traffic_sessions%rowtype;
  existing_attribution
    homeground_private.inquiry_traffic_attribution%rowtype;
begin
  select *
    into candidate_job
    from homeground_private.inquiry_traffic_attribution_outbox
    where inquiry_id = p_inquiry_id
    for update;

  if not found then
    return jsonb_build_object('outcome', 'unknown');
  end if;
  if candidate_job.status = 'attributed' then
    return jsonb_build_object('outcome', 'attributed');
  end if;
  if candidate_job.status = 'expired' then
    return jsonb_build_object('outcome', 'expired');
  end if;

  update homeground_private.inquiry_traffic_attribution_outbox
    set
      attempt_count = attempt_count + 1,
      last_attempt_at = observed_at,
      updated_at = observed_at
    where inquiry_id = p_inquiry_id;

  select *
    into candidate_session
    from homeground_private.traffic_sessions
    where session_hash = candidate_job.requested_session_hash
      and first_seen_at > observed_at - interval '30 days'
    for share;

  if not found then
    if candidate_job.created_at <= observed_at - interval '30 days' then
      update homeground_private.inquiry_traffic_attribution_outbox
        set
          requested_session_hash = null,
          status = 'expired',
          updated_at = observed_at,
          next_attempt_at = null,
          resolved_at = observed_at,
          last_result = 'expired'
        where inquiry_id = p_inquiry_id;
      return jsonb_build_object('outcome', 'expired');
    end if;

    update homeground_private.inquiry_traffic_attribution_outbox
      set
        updated_at = observed_at,
        next_attempt_at = observed_at + interval '5 minutes',
        last_result = 'waiting_for_session'
      where inquiry_id = p_inquiry_id;
    return jsonb_build_object('outcome', 'pending');
  end if;

  select *
    into existing_attribution
    from homeground_private.inquiry_traffic_attribution
    where inquiry_id = p_inquiry_id
    for update;

  if found then
    if existing_attribution.session_hash is distinct from
      candidate_job.requested_session_hash
    then
      update homeground_private.inquiry_traffic_attribution_outbox
        set
          conflict_count = conflict_count + 1,
          last_conflict_at = observed_at,
          updated_at = observed_at,
          next_attempt_at = observed_at + interval '5 minutes',
          last_result = 'internal_error'
        where inquiry_id = p_inquiry_id;
      return jsonb_build_object('outcome', 'conflict');
    end if;
  else
    insert into homeground_private.inquiry_traffic_attribution (
      inquiry_id,
      session_hash,
      linked_at,
      attribution_model,
      entry_path,
      locale,
      first_seen_at_snapshot,
      notice_version,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content
    )
    values (
      p_inquiry_id,
      candidate_session.session_hash,
      observed_at,
      'same_browser_session_first_touch',
      candidate_session.entry_path,
      candidate_session.locale,
      candidate_session.first_seen_at,
      candidate_session.notice_version,
      candidate_session.utm_source,
      candidate_session.utm_medium,
      candidate_session.utm_campaign,
      candidate_session.utm_content
    );
  end if;

  update homeground_private.inquiry_traffic_attribution_outbox
    set
      status = 'attributed',
      updated_at = observed_at,
      next_attempt_at = null,
      resolved_at = observed_at,
      last_result = 'attributed'
    where inquiry_id = p_inquiry_id;

  return jsonb_build_object('outcome', 'attributed');
end;
$$;

create or replace function
  homeground_private.enqueue_inquiry_traffic_attribution_v1(
    p_inquiry_id uuid,
    p_session_hash text
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  observed_at timestamptz := clock_timestamp();
  existing_job
    homeground_private.inquiry_traffic_attribution_outbox%rowtype;
  existing_attribution
    homeground_private.inquiry_traffic_attribution%rowtype;
  resolution jsonb;
begin
  if p_inquiry_id is null
    or p_session_hash is null
    or p_session_hash !~ '^[0-9a-f]{64}$'
  then
    return jsonb_build_object('outcome', 'invalid');
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(p_inquiry_id::text, 54)
  );

  if not exists (
    select 1
      from homeground_private.inquiries
      where inquiry_id = p_inquiry_id
  ) then
    return jsonb_build_object('outcome', 'unknown');
  end if;

  select *
    into existing_job
    from homeground_private.inquiry_traffic_attribution_outbox
    where inquiry_id = p_inquiry_id
    for update;

  if found then
    if existing_job.requested_session_hash is null then
      if existing_job.status = 'attributed' then
        update homeground_private.inquiry_traffic_attribution_outbox
          set
            conflict_count = conflict_count + 1,
            last_conflict_at = observed_at,
            updated_at = observed_at
          where inquiry_id = p_inquiry_id;
      end if;
      return jsonb_build_object(
        'outcome',
        case
          when existing_job.status = 'expired' then 'expired'
          else 'conflict'
        end
      );
    end if;
    if existing_job.requested_session_hash <> p_session_hash then
      update homeground_private.inquiry_traffic_attribution_outbox
        set
          conflict_count = conflict_count + 1,
          last_conflict_at = observed_at,
          updated_at = observed_at
        where inquiry_id = p_inquiry_id;
      return jsonb_build_object('outcome', 'conflict');
    end if;
    if existing_job.status = 'attributed' then
      return jsonb_build_object('outcome', 'attributed');
    end if;
    if existing_job.status = 'expired' then
      return jsonb_build_object('outcome', 'expired');
    end if;
    begin
      return homeground_private.resolve_inquiry_traffic_attribution_v1(
        p_inquiry_id
      );
    exception when others then
      update homeground_private.inquiry_traffic_attribution_outbox
        set
          attempt_count = attempt_count + 1,
          last_attempt_at = observed_at,
          updated_at = observed_at,
          next_attempt_at = observed_at + interval '5 minutes',
          last_result = 'internal_error'
        where inquiry_id = p_inquiry_id
          and status = 'pending';
      return jsonb_build_object('outcome', 'internal_error');
    end;
  end if;

  -- Handle rows created by the former two-RPC implementation during a
  -- rolling deployment. They may be adopted only by the same session.
  select *
    into existing_attribution
    from homeground_private.inquiry_traffic_attribution
    where inquiry_id = p_inquiry_id
    for update;

  if found then
    if existing_attribution.session_hash is distinct from p_session_hash then
      insert into homeground_private.inquiry_traffic_attribution_outbox (
        inquiry_id,
        requested_session_hash,
        status,
        created_at,
        updated_at,
        next_attempt_at,
        resolved_at,
        conflict_count,
        last_conflict_at,
        last_result
      )
      values (
        p_inquiry_id,
        existing_attribution.session_hash,
        'attributed',
        existing_attribution.linked_at,
        observed_at,
        null,
        observed_at,
        1,
        observed_at,
        'attributed'
      );
      return jsonb_build_object('outcome', 'conflict');
    end if;
    insert into homeground_private.inquiry_traffic_attribution_outbox (
      inquiry_id,
      requested_session_hash,
      status,
      created_at,
      updated_at,
      next_attempt_at,
      resolved_at,
      last_result
    )
    values (
      p_inquiry_id,
      p_session_hash,
      'attributed',
      existing_attribution.linked_at,
      observed_at,
      null,
      observed_at,
      'attributed'
    );
    return jsonb_build_object('outcome', 'attributed');
  end if;

  insert into homeground_private.inquiry_traffic_attribution_outbox (
    inquiry_id,
    requested_session_hash,
    status,
    created_at,
    updated_at,
    next_attempt_at,
    last_result
  )
  values (
    p_inquiry_id,
    p_session_hash,
    'pending',
    observed_at,
    observed_at,
    observed_at,
    'pending'
  );

  begin
    resolution :=
      homeground_private.resolve_inquiry_traffic_attribution_v1(
        p_inquiry_id
      );
  exception when others then
    -- The durable pending row remains committed with the real inquiry. Only
    -- snapshot resolution is retried; it can never roll the inquiry back.
    update homeground_private.inquiry_traffic_attribution_outbox
      set
        attempt_count = attempt_count + 1,
        last_attempt_at = observed_at,
        updated_at = observed_at,
        next_attempt_at = observed_at + interval '5 minutes',
        last_result = 'internal_error'
      where inquiry_id = p_inquiry_id
        and status = 'pending';
    resolution := jsonb_build_object('outcome', 'internal_error');
  end;
  return resolution;
end;
$$;

create or replace function
  homeground_private.process_pending_inquiry_traffic_attribution_v1(
    p_job_limit integer default 100
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  observed_at timestamptz := clock_timestamp();
  candidate record;
  resolution jsonb;
  processed_count integer := 0;
  attributed_count integer := 0;
  pending_count integer := 0;
  expired_count integer := 0;
  error_count integer := 0;
begin
  if p_job_limit is null or p_job_limit not between 1 and 500 then
    raise exception using
      errcode = '22023',
      message = 'invalid attribution job limit';
  end if;

  for candidate in
    select job.inquiry_id
      from homeground_private.inquiry_traffic_attribution_outbox as job
      where job.status = 'pending'
        and job.next_attempt_at <= observed_at
      order by job.next_attempt_at, job.created_at, job.inquiry_id
      for update skip locked
      limit p_job_limit
  loop
    processed_count := processed_count + 1;
    begin
      resolution :=
        homeground_private.resolve_inquiry_traffic_attribution_v1(
          candidate.inquiry_id
        );
      case resolution ->> 'outcome'
        when 'attributed' then
          attributed_count := attributed_count + 1;
        when 'expired' then
          expired_count := expired_count + 1;
        else
          pending_count := pending_count + 1;
      end case;
    exception when others then
      error_count := error_count + 1;
      update homeground_private.inquiry_traffic_attribution_outbox
        set
          attempt_count = attempt_count + 1,
          last_attempt_at = observed_at,
          updated_at = observed_at,
          next_attempt_at = observed_at + interval '5 minutes',
          last_result = 'internal_error'
        where inquiry_id = candidate.inquiry_id
          and status = 'pending';
    end;
  end loop;

  return jsonb_build_object(
    'processed', processed_count,
    'attributed', attributed_count,
    'stillPending', pending_count,
    'expired', expired_count,
    'errors', error_count
  );
end;
$$;

create or replace function
  homeground_private.purge_expired_inquiry_traffic_outbox_v1()
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  observed_at timestamptz := clock_timestamp();
  expired_count integer := 0;
  association_count integer := 0;
begin
  update homeground_private.inquiry_traffic_attribution_outbox
    set
      requested_session_hash = null,
      status = 'expired',
      updated_at = observed_at,
      next_attempt_at = null,
      resolved_at = observed_at,
      last_result = 'expired'
    where status = 'pending'
      and created_at <= observed_at - interval '30 days';
  get diagnostics expired_count = row_count;

  update homeground_private.inquiry_traffic_attribution_outbox
    set
      requested_session_hash = null,
      updated_at = observed_at
    where requested_session_hash is not null
      and status = 'attributed'
      and resolved_at <= observed_at - interval '30 days';
  get diagnostics association_count = row_count;

  return jsonb_build_object(
    'jobsExpired', expired_count,
    'sessionAssociationsCleared', association_count
  );
end;
$$;

-- Compatibility entry point for operational callers during rollout. It now
-- has conflict-safe semantics and enqueues missing sessions instead of losing
-- them, but website intake no longer needs a second Edge-to-database call.
create or replace function
  public.attach_homeground_inquiry_traffic_attribution_v1(
    p_inquiry_id uuid,
    p_session_hash text
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
begin
  return homeground_private.enqueue_inquiry_traffic_attribution_v1(
    p_inquiry_id,
    p_session_hash
  );
end;
$$;

create or replace function
  public.create_homeground_inquiry_with_traffic_v1(
    p_schema_version smallint,
    p_form_version text,
    p_locale text,
    p_journey_id uuid,
    p_journey_revision integer,
    p_route_id text,
    p_rule_version text,
    p_answers jsonb,
    p_route_snapshot jsonb,
    p_contact_channel text,
    p_contact_email text,
    p_contact_phone_e164 text,
    p_note text,
    p_privacy_notice_version text,
    p_landing_path text,
    p_attribution jsonb,
    p_idempotency_key_hash text,
    p_payload_hash text,
    p_rate_limit_subject_hash text,
    p_short_rate_limit integer,
    p_daily_rate_limit integer,
    p_first_response_due_at timestamptz,
    p_traffic_session_hash text
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  result jsonb;
  attribution_result jsonb :=
    jsonb_build_object('outcome', 'not_requested');
begin
  result := public.create_homeground_inquiry(
    p_schema_version,
    p_form_version,
    p_locale,
    p_journey_id,
    p_journey_revision,
    p_route_id,
    p_rule_version,
    p_answers,
    p_route_snapshot,
    p_contact_channel,
    p_contact_email,
    p_contact_phone_e164,
    p_note,
    p_privacy_notice_version,
    p_landing_path,
    p_attribution,
    p_idempotency_key_hash,
    p_payload_hash,
    p_rate_limit_subject_hash,
    p_short_rate_limit,
    p_daily_rate_limit,
    p_first_response_due_at
  );

  if p_traffic_session_hash is not null
    and (result ->> 'outcome') in ('created', 'replay')
  then
    attribution_result :=
      homeground_private.enqueue_inquiry_traffic_attribution_v1(
        (result ->> 'inquiryId')::uuid,
        p_traffic_session_hash
      );
  end if;

  return result || jsonb_build_object(
    'attributionOutcome',
    attribution_result ->> 'outcome'
  );
end;
$$;

create or replace function
  public.create_homeground_destination_inquiry_with_traffic_v1(
    p_schema_version smallint,
    p_form_version text,
    p_locale text,
    p_journey_id uuid,
    p_journey_revision integer,
    p_route_id text,
    p_rule_version text,
    p_answers jsonb,
    p_route_snapshot jsonb,
    p_contact_channel text,
    p_contact_email text,
    p_contact_phone_e164 text,
    p_departure_country text,
    p_rough_budget_per_person text,
    p_note text,
    p_privacy_notice_version text,
    p_landing_path text,
    p_attribution jsonb,
    p_idempotency_key_hash text,
    p_payload_hash text,
    p_rate_limit_subject_hash text,
    p_short_rate_limit integer,
    p_daily_rate_limit integer,
    p_first_response_due_at timestamptz,
    p_traffic_session_hash text
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  result jsonb;
  attribution_result jsonb :=
    jsonb_build_object('outcome', 'not_requested');
begin
  case p_form_version
    when '2026-07-21.1' then
      result := public.create_homeground_destination_inquiry_v4(
        p_schema_version, p_form_version, p_locale, p_journey_id,
        p_journey_revision, p_route_id, p_rule_version, p_answers,
        p_route_snapshot, p_contact_channel, p_contact_email,
        p_contact_phone_e164, p_departure_country,
        p_rough_budget_per_person, p_note, p_privacy_notice_version,
        p_landing_path, p_attribution, p_idempotency_key_hash,
        p_payload_hash, p_rate_limit_subject_hash, p_short_rate_limit,
        p_daily_rate_limit, p_first_response_due_at
      );
    when '2026-07-20.2' then
      result := public.create_homeground_destination_inquiry_v3(
        p_schema_version, p_form_version, p_locale, p_journey_id,
        p_journey_revision, p_route_id, p_rule_version, p_answers,
        p_route_snapshot, p_contact_channel, p_contact_email,
        p_contact_phone_e164, p_departure_country,
        p_rough_budget_per_person, p_note, p_privacy_notice_version,
        p_landing_path, p_attribution, p_idempotency_key_hash,
        p_payload_hash, p_rate_limit_subject_hash, p_short_rate_limit,
        p_daily_rate_limit, p_first_response_due_at
      );
    when '2026-07-20.1' then
      result := public.create_homeground_destination_inquiry_v2(
        p_schema_version, p_form_version, p_locale, p_journey_id,
        p_journey_revision, p_route_id, p_rule_version, p_answers,
        p_route_snapshot, p_contact_channel, p_contact_email,
        p_contact_phone_e164, p_departure_country, p_note,
        p_privacy_notice_version, p_landing_path, p_attribution,
        p_idempotency_key_hash, p_payload_hash,
        p_rate_limit_subject_hash, p_short_rate_limit,
        p_daily_rate_limit, p_first_response_due_at
      );
    when '2026-07-19.1' then
      result := public.create_homeground_destination_inquiry(
        p_schema_version, p_form_version, p_locale, p_journey_id,
        p_journey_revision, p_route_id, p_rule_version, p_answers,
        p_route_snapshot, p_contact_channel, p_contact_email,
        p_contact_phone_e164, p_note, p_privacy_notice_version,
        p_landing_path, p_attribution, p_idempotency_key_hash,
        p_payload_hash, p_rate_limit_subject_hash, p_short_rate_limit,
        p_daily_rate_limit, p_first_response_due_at
      );
    else
      raise exception using
        errcode = '22023',
        message = 'unsupported destination inquiry form version';
  end case;

  if p_traffic_session_hash is not null
    and (result ->> 'outcome') in ('created', 'replay')
  then
    attribution_result :=
      homeground_private.enqueue_inquiry_traffic_attribution_v1(
        (result ->> 'inquiryId')::uuid,
        p_traffic_session_hash
      );
  end if;

  return result || jsonb_build_object(
    'attributionOutcome',
    attribution_result ->> 'outcome'
  );
end;
$$;

create or replace function
  public.create_homeground_homepage_email_with_traffic_v1(
    p_schema_version smallint,
    p_form_version text,
    p_locale text,
    p_contact_email text,
    p_privacy_notice_version text,
    p_landing_path text,
    p_attribution jsonb,
    p_idempotency_key_hash text,
    p_payload_hash text,
    p_rate_limit_subject_hash text,
    p_short_rate_limit integer,
    p_daily_rate_limit integer,
    p_first_response_due_at timestamptz,
    p_traffic_session_hash text
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  result jsonb;
  attribution_result jsonb :=
    jsonb_build_object('outcome', 'not_requested');
begin
  result := public.create_homeground_homepage_email_v1(
    p_schema_version,
    p_form_version,
    p_locale,
    p_contact_email,
    p_privacy_notice_version,
    p_landing_path,
    p_attribution,
    p_idempotency_key_hash,
    p_payload_hash,
    p_rate_limit_subject_hash,
    p_short_rate_limit,
    p_daily_rate_limit,
    p_first_response_due_at
  );

  if p_traffic_session_hash is not null
    and (result ->> 'outcome') in ('created', 'replay')
  then
    attribution_result :=
      homeground_private.enqueue_inquiry_traffic_attribution_v1(
        (result ->> 'inquiryId')::uuid,
        p_traffic_session_hash
      );
  end if;

  return result || jsonb_build_object(
    'attributionOutcome',
    attribution_result ->> 'outcome'
  );
end;
$$;

create or replace function
  public.get_homeground_traffic_attribution_health_v1()
returns jsonb
language sql
security definer
set search_path = pg_catalog, homeground_private
as $$
  select jsonb_build_object(
    'generatedAt', clock_timestamp(),
    'pending',
      count(*) filter (where status = 'pending'),
    'overduePending',
      count(*) filter (
        where status = 'pending'
          and next_attempt_at <= clock_timestamp()
      ),
    'attributed',
      count(*) filter (where status = 'attributed'),
    'expired',
      count(*) filter (where status = 'expired'),
    'internalErrors',
      count(*) filter (where last_result = 'internal_error'),
    'conflictsObserved',
      coalesce(sum(conflict_count), 0),
    'oldestPendingAt',
      min(created_at) filter (where status = 'pending')
  )
  from homeground_private.inquiry_traffic_attribution_outbox;
$$;

revoke all on function
  homeground_private.resolve_inquiry_traffic_attribution_v1(uuid)
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.enqueue_inquiry_traffic_attribution_v1(uuid, text)
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.process_pending_inquiry_traffic_attribution_v1(integer)
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.purge_expired_inquiry_traffic_outbox_v1()
  from public, anon, authenticated, service_role;

revoke all on function
  public.attach_homeground_inquiry_traffic_attribution_v1(uuid, text)
  from public, anon, authenticated;
grant execute on function
  public.attach_homeground_inquiry_traffic_attribution_v1(uuid, text)
  to service_role;

revoke all on function
  public.create_homeground_inquiry_with_traffic_v1(
    smallint, text, text, uuid, integer, text, text, jsonb, jsonb,
    text, text, text, text, text, text, jsonb, text, text, text,
    integer, integer, timestamptz, text
  )
  from public, anon, authenticated;
grant execute on function
  public.create_homeground_inquiry_with_traffic_v1(
    smallint, text, text, uuid, integer, text, text, jsonb, jsonb,
    text, text, text, text, text, text, jsonb, text, text, text,
    integer, integer, timestamptz, text
  )
  to service_role;

revoke all on function
  public.create_homeground_destination_inquiry_with_traffic_v1(
    smallint, text, text, uuid, integer, text, text, jsonb, jsonb,
    text, text, text, text, text, text, text, text, jsonb, text, text,
    text, integer, integer, timestamptz, text
  )
  from public, anon, authenticated;
grant execute on function
  public.create_homeground_destination_inquiry_with_traffic_v1(
    smallint, text, text, uuid, integer, text, text, jsonb, jsonb,
    text, text, text, text, text, text, text, text, jsonb, text, text,
    text, integer, integer, timestamptz, text
  )
  to service_role;

revoke all on function
  public.create_homeground_homepage_email_with_traffic_v1(
    smallint, text, text, text, text, text, jsonb, text, text, text,
    integer, integer, timestamptz, text
  )
  from public, anon, authenticated;
grant execute on function
  public.create_homeground_homepage_email_with_traffic_v1(
    smallint, text, text, text, text, text, jsonb, text, text, text,
    integer, integer, timestamptz, text
  )
  to service_role;

revoke all on function
  public.get_homeground_traffic_attribution_health_v1()
  from public, anon, authenticated;
grant execute on function
  public.get_homeground_traffic_attribution_health_v1()
  to service_role;

comment on table
  homeground_private.inquiry_traffic_attribution_outbox is
  'Atomic inquiry attribution requests with bounded retry state; session associations are cleared after thirty days.';

do $schedule$
begin
  if exists (
    select 1
      from cron.job
      where jobname = 'homeground-resolve-inquiry-traffic-attribution'
  ) then
    perform cron.unschedule(
      'homeground-resolve-inquiry-traffic-attribution'
    );
  end if;
  perform cron.schedule(
    'homeground-resolve-inquiry-traffic-attribution',
    '* * * * *',
    'select homeground_private.process_pending_inquiry_traffic_attribution_v1(100);'
  );

  if exists (
    select 1
      from cron.job
      where jobname =
        'homeground-purge-inquiry-traffic-attribution-outbox'
  ) then
    perform cron.unschedule(
      'homeground-purge-inquiry-traffic-attribution-outbox'
    );
  end if;
  perform cron.schedule(
    'homeground-purge-inquiry-traffic-attribution-outbox',
    '10 19 * * *',
    'select homeground_private.purge_expired_inquiry_traffic_outbox_v1();'
  );
end;
$schedule$;

notify pgrst, 'reload schema';

commit;
