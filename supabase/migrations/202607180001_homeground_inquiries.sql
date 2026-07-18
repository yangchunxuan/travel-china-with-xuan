begin;

create extension if not exists pgcrypto with schema extensions;
create schema if not exists homeground_private;

revoke all on schema homeground_private from public, anon, authenticated;

create table homeground_private.inquiries (
  inquiry_id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  created_at timestamptz not null default now(),
  schema_version smallint not null,
  form_version text not null,
  entry_path text not null check (entry_path = 'generated_route'),
  locale text not null check (locale in ('en', 'zh', 'ko')),

  journey_id uuid not null,
  journey_revision integer not null check (journey_revision > 0),
  route_id text not null,
  rule_version text not null,
  answers_json jsonb not null check (jsonb_typeof(answers_json) = 'object'),
  route_snapshot_json jsonb not null
    check (jsonb_typeof(route_snapshot_json) = 'object'),

  contact_channel text not null check (contact_channel in ('email', 'whatsapp')),
  contact_email text,
  contact_phone_e164 text,
  note text,

  privacy_notice_version text not null,
  landing_path text not null,
  attribution_json jsonb not null default '{}'::jsonb
    check (jsonb_typeof(attribution_json) = 'object'),

  first_response_due_at timestamptz not null,

  idempotency_key_hash text not null unique
    check (idempotency_key_hash ~ '^[0-9a-f]{64}$'),
  payload_hash text not null check (payload_hash ~ '^[0-9a-f]{64}$'),

  constraint inquiry_selected_contact_check check (
    (
      contact_channel = 'email'
      and contact_email is not null
      and contact_phone_e164 is null
    )
    or
    (
      contact_channel = 'whatsapp'
      and contact_email is null
      and contact_phone_e164 is not null
      and contact_phone_e164 ~ '^\+[1-9][0-9]{7,14}$'
    )
  )
);

create index inquiries_created_idx
  on homeground_private.inquiries(created_at);

create table homeground_private.notification_outbox (
  job_id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null unique
    references homeground_private.inquiries(inquiry_id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'accepted', 'failed')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  next_attempt_at timestamptz not null default now(),
  lease_until timestamptz,
  leased_by text,
  lease_token uuid,
  provider_message_id text,
  last_error_code text,
  row_version bigint not null default 1 check (row_version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint notification_lease_check check (
    (
      status = 'processing'
      and lease_until is not null
      and leased_by is not null
      and lease_token is not null
    )
    or status <> 'processing'
  )
);

create index notification_outbox_due_idx
  on homeground_private.notification_outbox(next_attempt_at, created_at)
  where status = 'pending';
create index notification_outbox_failed_idx
  on homeground_private.notification_outbox(updated_at)
  where status = 'failed';

create table homeground_private.inquiry_rate_limit_buckets (
  subject_hash text not null check (subject_hash ~ '^[0-9a-f]{64}$'),
  window_seconds integer not null check (window_seconds > 0),
  bucket_started_at timestamptz not null,
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (subject_hash, window_seconds, bucket_started_at)
);

create index inquiry_rate_limit_buckets_cleanup_idx
  on homeground_private.inquiry_rate_limit_buckets(updated_at);

alter table homeground_private.inquiries enable row level security;
alter table homeground_private.inquiries force row level security;
alter table homeground_private.notification_outbox enable row level security;
alter table homeground_private.notification_outbox force row level security;
alter table homeground_private.inquiry_rate_limit_buckets enable row level security;
alter table homeground_private.inquiry_rate_limit_buckets force row level security;

revoke all on all tables in schema homeground_private
  from public, anon, authenticated;
revoke all on all sequences in schema homeground_private
  from public, anon, authenticated;

create or replace function homeground_private.generate_public_reference()
returns text
language plpgsql
volatile
set search_path = pg_catalog, extensions
as $$
declare
  reference_alphabet constant text := '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  random_value bytea := gen_random_bytes(8);
  raw_reference text := '';
  character_index integer;
  bit_index integer;
  character_value integer;
begin
  -- Twelve Base32 characters carry 60 bits of randomness.
  for character_index in 0..11 loop
    character_value := 0;
    for bit_index in 0..4 loop
      character_value := character_value
        + get_bit(random_value, character_index * 5 + bit_index)
          * (2 ^ bit_index)::integer;
    end loop;
    raw_reference := raw_reference
      || substr(reference_alphabet, character_value + 1, 1);
  end loop;

  return 'HG-'
    || substr(raw_reference, 1, 4)
    || '-'
    || substr(raw_reference, 5, 4)
    || '-'
    || substr(raw_reference, 9, 4);
end;
$$;

create or replace function homeground_private.consume_inquiry_rate_limit(
  p_subject_hash text,
  p_short_limit integer,
  p_daily_limit integer
)
returns jsonb
language plpgsql
set search_path = pg_catalog, homeground_private
as $$
declare
  current_time timestamptz := clock_timestamp();
  short_window_seconds constant integer := 600;
  daily_window_seconds constant integer := 86400;
  short_bucket timestamptz;
  daily_bucket timestamptz;
  short_count integer;
  daily_count integer;
  retry_after integer := 0;
begin
  if p_subject_hash !~ '^[0-9a-f]{64}$'
    or p_short_limit < 1
    or p_daily_limit < 1
  then
    raise exception using
      errcode = '22023',
      message = 'invalid rate-limit input';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_subject_hash, 1));

  short_bucket := to_timestamp(
    floor(extract(epoch from current_time) / short_window_seconds)
      * short_window_seconds
  );
  daily_bucket := to_timestamp(
    floor(extract(epoch from current_time) / daily_window_seconds)
      * daily_window_seconds
  );

  insert into homeground_private.inquiry_rate_limit_buckets (
    subject_hash,
    window_seconds,
    bucket_started_at,
    request_count
  )
  values (p_subject_hash, short_window_seconds, short_bucket, 1)
  on conflict (subject_hash, window_seconds, bucket_started_at)
  do update set
    request_count =
      homeground_private.inquiry_rate_limit_buckets.request_count + 1,
    updated_at = current_time
  returning request_count into short_count;

  insert into homeground_private.inquiry_rate_limit_buckets (
    subject_hash,
    window_seconds,
    bucket_started_at,
    request_count
  )
  values (p_subject_hash, daily_window_seconds, daily_bucket, 1)
  on conflict (subject_hash, window_seconds, bucket_started_at)
  do update set
    request_count =
      homeground_private.inquiry_rate_limit_buckets.request_count + 1,
    updated_at = current_time
  returning request_count into daily_count;

  if short_count > p_short_limit then
    retry_after := greatest(
      retry_after,
      ceil(
        extract(
          epoch from short_bucket
            + make_interval(secs => short_window_seconds)
            - current_time
        )
      )::integer
    );
  end if;

  if daily_count > p_daily_limit then
    retry_after := greatest(
      retry_after,
      ceil(
        extract(
          epoch from daily_bucket
            + make_interval(secs => daily_window_seconds)
            - current_time
        )
      )::integer
    );
  end if;

  delete from homeground_private.inquiry_rate_limit_buckets
    where updated_at < current_time - interval '2 days';

  return jsonb_build_object(
    'allowed', retry_after = 0,
    'retryAfter', greatest(retry_after, 0)
  );
end;
$$;

create or replace function public.create_homeground_inquiry(
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
  p_first_response_due_at timestamptz
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, extensions, homeground_private
as $$
declare
  existing_inquiry homeground_private.inquiries%rowtype;
  created_inquiry homeground_private.inquiries%rowtype;
  candidate_reference text;
  reference_attempt integer;
  rate_limit_result jsonb;
begin
  if p_schema_version <> 1
    or p_locale not in ('en', 'zh', 'ko')
    or p_journey_revision < 1
    or jsonb_typeof(p_answers) <> 'object'
    or jsonb_typeof(p_route_snapshot) <> 'object'
    or p_contact_channel not in ('email', 'whatsapp')
    or p_idempotency_key_hash !~ '^[0-9a-f]{64}$'
    or p_payload_hash !~ '^[0-9a-f]{64}$'
    or (
      p_rate_limit_subject_hash is not null
      and p_rate_limit_subject_hash !~ '^[0-9a-f]{64}$'
    )
    or p_short_rate_limit < 1
    or p_daily_rate_limit < 1
  then
    raise exception using
      errcode = '22023',
      message = 'invalid inquiry RPC input';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_idempotency_key_hash, 0));

  select *
    into existing_inquiry
    from homeground_private.inquiries
    where idempotency_key_hash = p_idempotency_key_hash
    for update;

  if found then
    if existing_inquiry.payload_hash <> p_payload_hash then
      return jsonb_build_object(
        'outcome', 'idempotency_conflict'
      );
    end if;

    return jsonb_build_object(
      'outcome', 'replay',
      'inquiryId', existing_inquiry.inquiry_id,
      'publicReference', existing_inquiry.public_reference,
      'receivedAt', existing_inquiry.created_at
    );
  end if;

  -- Idempotent replays are resolved before consuming an IP rate-limit slot.
  -- This is deliberately inside the same transaction and behind the same
  -- advisory lock as persistence, so a concurrent replay cannot be rejected
  -- as a new rate-limited submission.
  if p_rate_limit_subject_hash is not null then
    rate_limit_result :=
      homeground_private.consume_inquiry_rate_limit(
        p_rate_limit_subject_hash,
        p_short_rate_limit,
        p_daily_rate_limit
      );

    if not coalesce((rate_limit_result ->> 'allowed')::boolean, false) then
      return jsonb_build_object(
        'outcome', 'rate_limited',
        'retryAfter',
          greatest((rate_limit_result ->> 'retryAfter')::integer, 1)
      );
    end if;
  end if;

  for reference_attempt in 1..5 loop
    candidate_reference :=
      homeground_private.generate_public_reference();
    exit when not exists (
      select 1
        from homeground_private.inquiries
        where public_reference = candidate_reference
    );
  end loop;

  if candidate_reference is null or exists (
    select 1
      from homeground_private.inquiries
      where public_reference = candidate_reference
  ) then
    raise exception using
      errcode = '23505',
      message = 'unable to allocate public reference';
  end if;

  insert into homeground_private.inquiries (
    public_reference,
    schema_version,
    form_version,
    entry_path,
    locale,
    journey_id,
    journey_revision,
    route_id,
    rule_version,
    answers_json,
    route_snapshot_json,
    contact_channel,
    contact_email,
    contact_phone_e164,
    note,
    privacy_notice_version,
    landing_path,
    attribution_json,
    first_response_due_at,
    idempotency_key_hash,
    payload_hash
  )
  values (
    candidate_reference,
    p_schema_version,
    p_form_version,
    'generated_route',
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
    coalesce(p_attribution, '{}'::jsonb),
    p_first_response_due_at,
    p_idempotency_key_hash,
    p_payload_hash
  )
  returning * into created_inquiry;

  insert into homeground_private.notification_outbox (
    inquiry_id
  )
  values (
    created_inquiry.inquiry_id
  );

  return jsonb_build_object(
    'outcome', 'created',
    'inquiryId', created_inquiry.inquiry_id,
    'publicReference', created_inquiry.public_reference,
    'receivedAt', created_inquiry.created_at
  );
end;
$$;

create or replace function public.claim_homeground_notification_jobs(
  p_worker_id text,
  p_job_limit integer default 10,
  p_lease_seconds integer default 60
)
returns table (
  job_id uuid,
  inquiry_id uuid,
  public_reference text,
  locale text,
  route_id text,
  answers jsonb,
  route_snapshot jsonb,
  reply_channel text,
  contact_email text,
  contact_phone_e164 text,
  note text,
  inquiry_created_at timestamptz,
  first_response_due_at timestamptz,
  lease_token uuid,
  row_version bigint,
  attempt_count integer
)
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
begin
  if length(trim(p_worker_id)) = 0
    or p_job_limit < 1
    or p_job_limit > 50
    or p_lease_seconds < 15
    or p_lease_seconds > 300
  then
    raise exception using
      errcode = '22023',
      message = 'invalid notification claim input';
  end if;

  return query
  with due_jobs as (
    select candidate.job_id
      from homeground_private.notification_outbox candidate
      where (
        candidate.status = 'pending'
        and candidate.next_attempt_at <= now()
      )
      or (
        candidate.status = 'processing'
        and candidate.lease_until <= now()
      )
      order by candidate.next_attempt_at, candidate.created_at
      for update skip locked
      limit p_job_limit
  ),
  claimed_jobs as (
    update homeground_private.notification_outbox claimed
      set
        status = 'processing',
        attempt_count = claimed.attempt_count + 1,
        lease_until = now() + make_interval(secs => p_lease_seconds),
        leased_by = p_worker_id,
        lease_token = gen_random_uuid(),
        row_version = claimed.row_version + 1,
        updated_at = now()
      from due_jobs
      where claimed.job_id = due_jobs.job_id
      returning claimed.*
  )
  select
    claimed.job_id,
    inquiry.inquiry_id,
    inquiry.public_reference,
    inquiry.locale,
    inquiry.route_id,
    inquiry.answers_json,
    inquiry.route_snapshot_json,
    inquiry.contact_channel,
    inquiry.contact_email,
    inquiry.contact_phone_e164,
    inquiry.note,
    inquiry.created_at,
    inquiry.first_response_due_at,
    claimed.lease_token,
    claimed.row_version,
    claimed.attempt_count
  from claimed_jobs claimed
  join homeground_private.inquiries inquiry
    on inquiry.inquiry_id = claimed.inquiry_id;
end;
$$;

create or replace function public.finish_homeground_notification_job(
  p_job_id uuid,
  p_lease_token uuid,
  p_expected_row_version bigint,
  p_accepted boolean,
  p_terminal boolean,
  p_provider_message_id text,
  p_error_code text,
  p_next_attempt_at timestamptz
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  updated_job_id uuid;
begin
  update homeground_private.notification_outbox
    set
      status = case
        when p_accepted then 'accepted'
        when p_terminal then 'failed'
        else 'pending'
      end,
      next_attempt_at = case
        when p_accepted or p_terminal then next_attempt_at
        else coalesce(p_next_attempt_at, now() + interval '5 minutes')
      end,
      lease_until = null,
      leased_by = null,
      lease_token = null,
      provider_message_id = case
        when p_accepted then left(p_provider_message_id, 255)
        else provider_message_id
      end,
      last_error_code = case
        when p_accepted then null
        else left(p_error_code, 80)
      end,
      row_version = row_version + 1,
      updated_at = now()
    where job_id = p_job_id
      and status = 'processing'
      and lease_token = p_lease_token
      and row_version = p_expected_row_version
    returning job_id into updated_job_id;

  return updated_job_id is not null;
end;
$$;

create or replace function homeground_private.retry_failed_notification_jobs()
returns integer
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  retried_count integer;
begin
  update homeground_private.notification_outbox
    set
      status = 'pending',
      attempt_count = 0,
      next_attempt_at = now(),
      lease_until = null,
      leased_by = null,
      lease_token = null,
      last_error_code = null,
      row_version = row_version + 1,
      updated_at = now()
    where status = 'failed';

  get diagnostics retried_count = row_count;
  return retried_count;
end;
$$;

revoke all on function public.create_homeground_inquiry(
  smallint,
  text,
  text,
  uuid,
  integer,
  text,
  text,
  jsonb,
  jsonb,
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb,
  text,
  text,
  text,
  integer,
  integer,
  timestamptz
) from public, anon, authenticated;
revoke all on function homeground_private.consume_inquiry_rate_limit(
  text,
  integer,
  integer
) from public, anon, authenticated;
revoke all on function
  homeground_private.retry_failed_notification_jobs()
  from public, anon, authenticated, service_role;
revoke all on function public.claim_homeground_notification_jobs(
  text,
  integer,
  integer
) from public, anon, authenticated;
revoke all on function public.finish_homeground_notification_job(
  uuid,
  uuid,
  bigint,
  boolean,
  boolean,
  text,
  text,
  timestamptz
) from public, anon, authenticated;

grant usage on schema homeground_private to service_role;
grant execute on function public.create_homeground_inquiry(
  smallint,
  text,
  text,
  uuid,
  integer,
  text,
  text,
  jsonb,
  jsonb,
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb,
  text,
  text,
  text,
  integer,
  integer,
  timestamptz
) to service_role;
grant execute on function public.claim_homeground_notification_jobs(
  text,
  integer,
  integer
) to service_role;
grant execute on function public.finish_homeground_notification_job(
  uuid,
  uuid,
  bigint,
  boolean,
  boolean,
  text,
  text,
  timestamptz
) to service_role;

commit;
