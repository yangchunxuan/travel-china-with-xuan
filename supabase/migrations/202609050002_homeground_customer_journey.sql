begin;

-- Additive collector v2. Existing v1 write/read RPC definitions are unchanged.
create or replace function homeground_private.is_valid_traffic_product_v2(
  p_slug text, p_package_id text, p_travelers integer
) returns boolean
language sql immutable set search_path = pg_catalog
as $$
  select case
    when p_slug is null then p_package_id is null and p_travelers is null
    when p_slug in (
      'shanghai-suzhou-hangzhou-6-day-private-tour',
      'chengdu-pandas-sanxingdui-5-day-private-tour',
      'xian-terracotta-warriors-5-day-private-tour',
      'chongqing-wulong-5-day-private-tour',
      'guilin-yangshuo-5-day-private-tour',
      'harbin-winter-5-day-private-tour',
      'shanghai-suzhou-5-day-private-tour',
      'beijing-highlights-5-day-private-tour',
      'zhangjiajie-forest-4-day-private-tour',
      'zhangjiajie-4-day-private-tour'
    ) then (p_package_id is null and p_travelers is null) or
      (p_package_id is not null and p_travelers in (2, 4) and
        case p_slug
          when 'beijing-highlights-5-day-private-tour' then p_package_id in ('english-guided', 'no-guide')
          when 'harbin-winter-5-day-private-tour' then p_package_id = 'standard-guided-winter'
          when 'zhangjiajie-forest-4-day-private-tour' then p_package_id = 'fixed-route-english-guided'
          when 'zhangjiajie-4-day-private-tour' then false
          else p_package_id = 'standard-guided'
        end)
    else false end is true;
$$;

alter table homeground_private.traffic_sessions
  drop constraint traffic_sessions_contract_version_check,
  drop constraint traffic_sessions_notice_version_check,
  add constraint traffic_session_version_pair_check check (
    (contract_version = 'homeground-traffic-events.v1' and notice_version = '2026-07-31.1') or
    (contract_version = 'homeground-traffic-events.v2' and notice_version = '2026-09-05.1')
  );
alter table homeground_private.inquiry_traffic_attribution
  drop constraint inquiry_traffic_attribution_notice_version_check,
  add constraint inquiry_traffic_notice_version_check check (
    notice_version in ('2026-07-31.1', '2026-09-05.1')
  );
alter table homeground_private.traffic_events
  add column client_sequence integer,
  add column product_slug text,
  add column package_id text,
  add column travelers smallint,
  add column surface text,
  add column error_code text,
  drop constraint traffic_events_contract_version_check,
  drop constraint traffic_events_event_type_check,
  drop constraint traffic_event_action_check,
  add constraint traffic_events_contract_version_check check (
    contract_version in ('homeground-traffic-events.v1', 'homeground-traffic-events.v2')),
  add constraint traffic_events_event_type_check check (event_type in (
    'page_view', 'contact_options_viewed', 'contact_channel_clicked', 'email_form_started',
    'product_selection_changed', 'contact_channel_selected', 'enquiry_submit_attempted',
    'enquiry_submit_failed', 'enquiry_submit_uncertain')),
  add constraint traffic_event_action_check check (
    (event_type in ('contact_channel_clicked', 'contact_channel_selected') and
      action_code is not null and action_code in ('email', 'whatsapp', 'messenger')) or
    (event_type not in ('contact_channel_clicked', 'contact_channel_selected') and action_code is null)),
  add constraint traffic_event_journey_v2_check check (
    (contract_version = 'homeground-traffic-events.v1' and
      event_type in ('page_view', 'contact_options_viewed', 'contact_channel_clicked', 'email_form_started') and
      client_sequence is null and product_slug is null and package_id is null and
      travelers is null and surface is null and error_code is null) or
    (contract_version = 'homeground-traffic-events.v2' and
      client_sequence is not null and client_sequence between 1 and 1000000 and
      homeground_private.is_valid_traffic_product_v2(product_slug, package_id, travelers::integer) and
      (event_type <> 'product_selection_changed' or
        (product_slug is not null and package_id is not null and travelers is not null)) and
      (surface in ('product', 'homepage_quick_email', 'planner', 'contact_options') or surface is null) and
      (event_type = 'page_view' or surface is not null) and
      ((event_type in ('enquiry_submit_failed', 'enquiry_submit_uncertain') and
        error_code is not null and error_code in ('validation', 'network', 'rate_limited',
          'service_unavailable', 'server_error', 'unknown_response')) or
       (event_type not in ('enquiry_submit_failed', 'enquiry_submit_uncertain') and error_code is null)))
  );

-- Marker access is service-only and accepts a synthetic event ID, never a browser hash.
create table homeground_private.traffic_test_markers (
  session_hash text primary key references homeground_private.traffic_sessions(session_hash) on delete cascade,
  reason_code text not null default 'synthetic_verification' check (reason_code = 'synthetic_verification'),
  marked_at timestamptz not null default clock_timestamp()
);
alter table homeground_private.traffic_test_markers enable row level security;
alter table homeground_private.traffic_test_markers force row level security;
revoke all on table homeground_private.traffic_test_markers from public, anon, authenticated, service_role;
create or replace function public.mark_homeground_traffic_test_session_v1(p_event_id uuid)
returns jsonb language plpgsql security definer set search_path = pg_catalog, homeground_private
as $$
declare candidate_session_hash text;
begin
  select session.session_hash into candidate_session_hash
    from homeground_private.traffic_events event
    join homeground_private.traffic_sessions session using (session_hash)
    where event.event_id = p_event_id for key share of session;
  if not found then return jsonb_build_object('outcome', 'unknown'); end if;
  insert into homeground_private.traffic_test_markers(session_hash)
    values (candidate_session_hash) on conflict (session_hash) do nothing;
  return jsonb_build_object('outcome', 'marked');
end;
$$;
revoke all on function public.mark_homeground_traffic_test_session_v1(uuid) from public, anon, authenticated;
grant execute on function public.mark_homeground_traffic_test_session_v1(uuid) to service_role;

create or replace function homeground_private.is_valid_traffic_event_v2(candidate jsonb)
returns boolean language plpgsql immutable set search_path = pg_catalog, homeground_private
as $$
declare sequence_value integer; travelers_value integer;
begin
  if jsonb_typeof(candidate) is distinct from 'object' then return false; end if;
  if exists (select 1 from jsonb_object_keys(candidate) supplied(key)
    where key not in ('eventId', 'type', 'pagePath', 'actionCode', 'payloadHash',
      'clientSequence', 'productSlug', 'packageId', 'travelers', 'surface', 'errorCode'))
    or (candidate ->> 'eventId') is null
    or (candidate ->> 'eventId') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    or (candidate ->> 'payloadHash') is null
    or (candidate ->> 'payloadHash') !~ '^[0-9a-f]{64}$'
    or not homeground_private.is_valid_traffic_path(candidate ->> 'pagePath')
    or (candidate ->> 'type') is null
    or (candidate ->> 'type') not in ('page_view', 'contact_options_viewed', 'contact_channel_clicked',
      'email_form_started', 'product_selection_changed', 'contact_channel_selected',
      'enquiry_submit_attempted', 'enquiry_submit_failed', 'enquiry_submit_uncertain')
  then return false; end if;
  if jsonb_typeof(candidate -> 'clientSequence') is distinct from 'number'
    or (candidate ->> 'clientSequence') !~ '^[1-9][0-9]{0,6}$'
  then return false; end if;
  sequence_value := (candidate ->> 'clientSequence')::integer;
  if sequence_value not between 1 and 1000000 then return false; end if;
  if (candidate ->> 'travelers') is not null then
    if (candidate -> 'travelers') not in ('2'::jsonb, '4'::jsonb) then return false; end if;
    travelers_value := (candidate ->> 'travelers')::integer;
  end if;
  if not homeground_private.is_valid_traffic_product_v2(candidate ->> 'productSlug',
    candidate ->> 'packageId', travelers_value) then return false; end if;
  if (candidate ->> 'type') = 'product_selection_changed' and
    ((candidate ->> 'productSlug') is null or (candidate ->> 'packageId') is null or travelers_value is null)
  then return false; end if;
  if (candidate ->> 'type') in ('contact_channel_clicked', 'contact_channel_selected') then
    if (candidate ->> 'actionCode') is null or (candidate ->> 'actionCode') not in ('email', 'whatsapp', 'messenger')
    then return false; end if;
  elsif (candidate ->> 'actionCode') is not null then return false;
  end if;
  if ((candidate ->> 'surface') is not null and
    (candidate ->> 'surface') not in ('product', 'homepage_quick_email', 'planner', 'contact_options')) or
    ((candidate ->> 'type') <> 'page_view' and (candidate ->> 'surface') is null)
  then return false; end if;
  if (candidate ->> 'type') in ('enquiry_submit_failed', 'enquiry_submit_uncertain') then
    if (candidate ->> 'errorCode') is null or (candidate ->> 'errorCode') not in
      ('validation', 'network', 'rate_limited', 'service_unavailable', 'server_error', 'unknown_response')
    then return false; end if;
  elsif (candidate ->> 'errorCode') is not null then return false;
  end if;
  return true;
end;
$$;
revoke all on function homeground_private.is_valid_traffic_product_v2(text, text, integer) from public, anon, authenticated, service_role;
revoke all on function homeground_private.is_valid_traffic_event_v2(jsonb) from public, anon, authenticated, service_role;

create or replace function public.record_homeground_traffic_events_v2(
  p_contract_version text,
  p_notice_version text,
  p_session_hash text,
  p_locale text,
  p_entry_path text,
  p_utm_source text,
  p_utm_medium text,
  p_utm_campaign text,
  p_utm_content text,
  p_events jsonb,
  p_ip_rate_limit_subject_hash text,
  p_session_rate_limit_subject_hash text,
  p_global_rate_limit_subject_hash text,
  p_ip_short_rate_limit integer,
  p_ip_daily_rate_limit integer,
  p_session_short_rate_limit integer,
  p_session_daily_rate_limit integer,
  p_global_short_rate_limit integer,
  p_global_daily_rate_limit integer
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  observed_at timestamptz := clock_timestamp();
  candidate jsonb;
  normalized_event_id uuid;
  existing_event homeground_private.traffic_events%rowtype;
  new_event_count integer := 0;
  replayed_event_count integer := 0;
  ip_rate_limit_result jsonb;
  session_rate_limit_result jsonb;
  global_rate_limit_result jsonb;
  rate_limit_retry_after integer := 0;
begin
  if p_contract_version is distinct from 'homeground-traffic-events.v2'
    or p_notice_version is distinct from '2026-09-05.1'
    or p_session_hash is null
    or p_session_hash !~ '^[0-9a-f]{64}$'
    or p_locale is null
    or p_locale not in ('en', 'zh', 'ko')
    or not homeground_private.is_valid_traffic_path(p_entry_path)
    or not homeground_private.is_valid_traffic_utm(p_utm_source, 64)
    or not homeground_private.is_valid_traffic_utm(p_utm_medium, 64)
    or not homeground_private.is_valid_traffic_utm(p_utm_campaign, 96)
    or not homeground_private.is_valid_traffic_utm(p_utm_content, 96)
    or p_ip_rate_limit_subject_hash is null
    or p_ip_rate_limit_subject_hash !~ '^[0-9a-f]{64}$'
    or p_session_rate_limit_subject_hash is null
    or p_session_rate_limit_subject_hash !~ '^[0-9a-f]{64}$'
    or p_global_rate_limit_subject_hash is null
    or p_global_rate_limit_subject_hash !~ '^[0-9a-f]{64}$'
    or p_ip_short_rate_limit is null
    or p_ip_short_rate_limit < 1
    or p_ip_daily_rate_limit is null
    or p_ip_daily_rate_limit < 1
    or p_session_short_rate_limit is null
    or p_session_short_rate_limit < 1
    or p_session_daily_rate_limit is null
    or p_session_daily_rate_limit < 1
    or p_global_short_rate_limit is null
    or p_global_short_rate_limit < 1
    or p_global_daily_rate_limit is null
    or p_global_daily_rate_limit < 1
  then
    raise exception using
      errcode = '22023',
      message = 'invalid traffic event RPC input';
  end if;

  if jsonb_typeof(p_events) is distinct from 'array' then
    raise exception using
      errcode = '22023',
      message = 'traffic events must be an array';
  end if;
  if jsonb_array_length(p_events) not between 1 and 20 then
    raise exception using
      errcode = '22023',
      message = 'invalid traffic event count';
  end if;

  for candidate in
    select value from jsonb_array_elements(p_events)
  loop
    if not homeground_private.is_valid_traffic_event_v2(candidate) then
      raise exception using errcode = '22023', message = 'invalid traffic v2 event';
    end if;
  end loop;

  if (
    select count(*) <> count(distinct lower(value ->> 'eventId'))
    from jsonb_array_elements(p_events)
  ) then
    raise exception using
      errcode = '22023',
      message = 'duplicate traffic event id';
  end if;

  -- Event-ID locks are taken in stable order so retries and concurrent
  -- batches cannot race or deadlock around the idempotency decision.
  for normalized_event_id in
    select (value ->> 'eventId')::uuid
    from jsonb_array_elements(p_events)
    order by 1
  loop
    perform pg_advisory_xact_lock(
      hashtextextended(normalized_event_id::text, 52)
    );
  end loop;
  perform pg_advisory_xact_lock(hashtextextended(p_session_hash, 53));

  for candidate in
    select value from jsonb_array_elements(p_events)
  loop
    normalized_event_id := (candidate ->> 'eventId')::uuid;
    select *
      into existing_event
      from homeground_private.traffic_events
      where event_id = normalized_event_id
      for update;

    if found then
      if existing_event.session_hash <> p_session_hash
        or existing_event.payload_hash <> (candidate ->> 'payloadHash')
      then
        return jsonb_build_object(
          'outcome', 'idempotency_conflict'
        );
      end if;
      replayed_event_count := replayed_event_count + 1;
    else
      new_event_count := new_event_count + 1;
    end if;
  end loop;

  if new_event_count = 0 then
    update homeground_private.traffic_sessions
      set last_seen_at = greatest(last_seen_at, observed_at)
      where session_hash = p_session_hash;

    return jsonb_build_object(
      'outcome', 'replay',
      'acceptedCount', 0,
      'replayedCount', replayed_event_count
    );
  end if;

  -- Charge only newly accepted events (not requests or idempotent replays)
  -- against three independent dimensions. This makes batching neutral and
  -- prevents one rotating session or one shared IP from bypassing every cap.
  ip_rate_limit_result :=
    homeground_private.consume_traffic_rate_limit(
      p_ip_rate_limit_subject_hash,
      p_ip_short_rate_limit,
      p_ip_daily_rate_limit,
      new_event_count
    );
  session_rate_limit_result :=
    homeground_private.consume_traffic_rate_limit(
      p_session_rate_limit_subject_hash,
      p_session_short_rate_limit,
      p_session_daily_rate_limit,
      new_event_count
    );
  global_rate_limit_result :=
    homeground_private.consume_traffic_rate_limit(
      p_global_rate_limit_subject_hash,
      p_global_short_rate_limit,
      p_global_daily_rate_limit,
      new_event_count
    );

  rate_limit_retry_after := greatest(
    coalesce(
      (ip_rate_limit_result ->> 'retryAfter')::integer,
      0
    ),
    coalesce(
      (session_rate_limit_result ->> 'retryAfter')::integer,
      0
    ),
    coalesce(
      (global_rate_limit_result ->> 'retryAfter')::integer,
      0
    )
  );
  if rate_limit_retry_after > 0 then
    return jsonb_build_object(
      'outcome', 'rate_limited',
      'retryAfter',
        greatest(rate_limit_retry_after, 1)
    );
  end if;

  -- First-touch fields never change on conflict. The Edge function passes
  -- labels only after verifying a Homeground-signed campaign link; unsigned
  -- or altered labels have already collapsed to Unknown.
  insert into homeground_private.traffic_sessions (
    session_hash,
    first_seen_at,
    last_seen_at,
    contract_version,
    notice_version,
    hash_key_version,
    locale,
    entry_path,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content
  )
  values (
    p_session_hash,
    observed_at,
    observed_at,
    p_contract_version,
    p_notice_version,
    1,
    p_locale,
    p_entry_path,
    p_utm_source,
    p_utm_medium,
    p_utm_campaign,
    p_utm_content
  )
  on conflict (session_hash)
  do update set
    last_seen_at = greatest(
      homeground_private.traffic_sessions.last_seen_at,
      excluded.last_seen_at
    );

  for candidate in
    select value from jsonb_array_elements(p_events)
  loop
    normalized_event_id := (candidate ->> 'eventId')::uuid;
    if not exists (
      select 1
      from homeground_private.traffic_events
      where event_id = normalized_event_id
    ) then
      insert into homeground_private.traffic_events (
        event_id,
        session_hash,
        received_at,
        contract_version,
        event_type,
        page_path,
        action_code,
        payload_hash, client_sequence, product_slug, package_id, travelers, surface, error_code
      )
      values (
        normalized_event_id,
        p_session_hash,
        observed_at,
        p_contract_version,
        candidate ->> 'type',
        candidate ->> 'pagePath',
        candidate ->> 'actionCode',
        candidate ->> 'payloadHash',
        (candidate ->> 'clientSequence')::integer, candidate ->> 'productSlug',
        candidate ->> 'packageId', (candidate ->> 'travelers')::smallint,
        candidate ->> 'surface', candidate ->> 'errorCode'
      );
    end if;
  end loop;

  return jsonb_build_object(
    'outcome', 'created',
    'acceptedCount', new_event_count,
    'replayedCount', replayed_event_count
  );
end;
$$;

revoke all on function public.record_homeground_traffic_events_v2(
  text,
  text,
  text,
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
  integer,
  integer,
  integer,
  integer
) from public, anon, authenticated;
grant execute on function public.record_homeground_traffic_events_v2(
  text,
  text,
  text,
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
  integer,
  integer,
  integer,
  integer
) to service_role;

-- Reserve the real Unknown/low-count buckets, then keep the highest-volume
-- visible labels. Omitted high-volume labels are never called suppressed.
-- Totals are calculated before this presentation cap and need not reconcile
-- to the displayed dimension buckets.
create or replace function homeground_private.bound_traffic_dimension_v2(p_buckets jsonb)
returns jsonb language sql immutable set search_path = pg_catalog
as $$
  with items as (
    select value as bucket, ordinality
      from jsonb_array_elements(p_buckets) with ordinality
  ), reserved as (
    select count(*) as bucket_count from items where bucket ->> 'bucketType' <> 'value'
  ), visible as (
    select bucket, ordinality from items where bucket ->> 'bucketType' = 'value'
      order by (bucket ->> 'count')::integer desc, bucket ->> 'label'
      limit greatest(0, 30 - (select bucket_count from reserved))
  ), chosen as (
    select bucket, ordinality from items where bucket ->> 'bucketType' <> 'value'
    union all select bucket, ordinality from visible
  )
  select coalesce(jsonb_agg(bucket order by ordinality), '[]'::jsonb) from chosen;
$$;
revoke all on function homeground_private.bound_traffic_dimension_v2(jsonb)
  from public, anon, authenticated, service_role;

create or replace function public.get_homeground_admin_traffic_v2()
returns table(payload jsonb)
language plpgsql
security definer
set search_path = pg_catalog, homeground_private, extensions
as $$
declare
  generated_at timestamptz := clock_timestamp();
  window_started_at timestamptz :=
    generated_at - interval '30 days';
begin
  return query
  with
  window_sessions as (
    select session.*
      from homeground_private.traffic_sessions as session
      where session.first_seen_at >= window_started_at
        and session.first_seen_at <= generated_at
        and ((session.contract_version = 'homeground-traffic-events.v1' and session.notice_version = '2026-07-31.1') or
          (session.contract_version = 'homeground-traffic-events.v2' and session.notice_version = '2026-09-05.1'))
        and not exists (select 1 from homeground_private.traffic_test_markers marker
          where marker.session_hash = session.session_hash)
  ),
  window_events as (
    select event.*
      from homeground_private.traffic_events as event
      join window_sessions as session
        on session.session_hash = event.session_hash
      where event.received_at >= window_started_at
        and event.received_at <= generated_at
        and event.contract_version in ('homeground-traffic-events.v1', 'homeground-traffic-events.v2')
  ),
  total_counts as (
    select
      (select count(*)::integer from window_sessions)
        as sessions,
      (
        select count(*)::integer
          from window_sessions as unknown_session
          where unknown_session.utm_source is null
      ) as unknown_source_sessions,
      (
        select count(*)::integer
          from homeground_private.inquiry_traffic_attribution
            as attribution
          join homeground_private.non_test_inquiries inquiry using (inquiry_id)
          where not exists (select 1 from homeground_private.traffic_test_markers marker
            where marker.session_hash = attribution.session_hash)
            and attribution.linked_at >= window_started_at
            and attribution.linked_at <= generated_at
      ) as attributed_enquiries,
      count(*) filter (
        where event.event_type = 'page_view'
      )::integer as page_views,
      count(*) filter (
        where event.event_type = 'contact_channel_clicked'
      )::integer as contact_click_attempts,
      count(*) filter (
        where event.event_type = 'email_form_started'
      )::integer as email_form_started,
      count(*) filter (where event.event_type = 'page_view' and event.product_slug is not null)::integer as product_views,
      count(*) filter (where event.event_type = 'product_selection_changed')::integer as product_selections,
      count(*) filter (where event.event_type = 'enquiry_submit_attempted')::integer as form_submit_attempts,
      count(*) filter (where event.event_type = 'enquiry_submit_failed')::integer as form_submit_failures,
      count(*) filter (where event.event_type = 'enquiry_submit_uncertain')::integer as form_submit_uncertain
      from window_events as event
  ),
  source_counts as (
    select
      session.utm_source as label,
      count(*)::integer as observed_count
      from window_sessions as session
      group by session.utm_source
  ),
  source_dimension as (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'bucketType', bucket.bucket_type,
          'label', bucket.label,
          'count',
            case
              when bucket.observed_count = 0
                or bucket.observed_count >= 5
              then bucket.observed_count
              else null
            end,
          'suppressed',
            bucket.observed_count between 1 and 4
        )
        order by
          case bucket.bucket_type
            when 'unknown' then 0
            when 'suppressed' then 2
            else 1
          end,
          bucket.observed_count desc,
          bucket.label
      ),
      '[]'::jsonb
    ) as buckets
      from (
        select
          case
            when label is null then 'unknown'
            else 'value'
          end::text as bucket_type,
          label,
          observed_count
          from source_counts
          where label is null
            or observed_count >= 5
        union all
        select
          'suppressed'::text,
          null::text,
          1
          where exists (
            select 1
              from source_counts
              where label is not null
                and observed_count between 1 and 4
          )
      ) as bucket
  ),
  campaign_counts as (
    select
      session.utm_campaign as label,
      count(*)::integer as observed_count
      from window_sessions as session
      group by session.utm_campaign
  ),
  campaign_dimension as (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'bucketType', bucket.bucket_type,
          'label', bucket.label,
          'count',
            case
              when bucket.observed_count = 0
                or bucket.observed_count >= 5
              then bucket.observed_count
              else null
            end,
          'suppressed',
            bucket.observed_count between 1 and 4
        )
        order by
          case bucket.bucket_type
            when 'unknown' then 0
            when 'suppressed' then 2
            else 1
          end,
          bucket.observed_count desc,
          bucket.label
      ),
      '[]'::jsonb
    ) as buckets
      from (
        select
          case
            when label is null then 'unknown'
            else 'value'
          end::text as bucket_type,
          label,
          observed_count
          from campaign_counts
          where label is null
            or observed_count >= 5
        union all
        select
          'suppressed'::text,
          null::text,
          1
          where exists (
            select 1
              from campaign_counts
              where label is not null
                and observed_count between 1 and 4
          )
      ) as bucket
  ),
  page_counts as (
    select
      event.page_path as label,
      count(*)::integer as observed_count
      from window_events as event
      where event.event_type = 'page_view'
      group by event.page_path
  ),
  page_dimension as (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'bucketType', bucket.bucket_type,
          'label', bucket.label,
          'count',
            case
              when bucket.observed_count >= 5
              then bucket.observed_count
              else null
            end,
          'suppressed', bucket.observed_count between 1 and 4
        )
        order by
          case bucket.bucket_type
            when 'suppressed' then 1
            else 0
          end,
          bucket.observed_count desc,
          bucket.label
      ),
      '[]'::jsonb
    ) as buckets
      from (
        select
          'value'::text as bucket_type,
          label,
          observed_count
          from page_counts
          where observed_count >= 5
        union all
        select
          'suppressed'::text,
          null::text,
          1
          where exists (
            select 1
              from page_counts
              where observed_count between 1 and 4
          )
      ) as bucket
  ),
  product_counts as (
    select event.product_slug as label, count(*)::integer as observed_count
      from window_events event where event.event_type = 'page_view' and event.product_slug is not null group by 1
  ),
  product_dimension as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'bucketType', bucket_type, 'label', label, 'count', observed_count,
      'suppressed', bucket_type = 'suppressed') order by bucket_type desc, observed_count desc, label), '[]'::jsonb) as buckets
    from (
      select 'value'::text as bucket_type, label, observed_count from product_counts where observed_count >= 5
      union all select 'suppressed'::text, null::text, null::integer
        where exists (select 1 from product_counts where observed_count between 1 and 4)
    ) bucket
  ),
  selection_counts as (
    select event.product_slug || '|' || event.package_id || '|' || event.travelers::text as label, count(*)::integer as observed_count
      from window_events event where event.event_type = 'product_selection_changed' group by 1
  ),
  selection_dimension as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'bucketType', bucket_type, 'label', label, 'count', observed_count,
      'suppressed', bucket_type = 'suppressed') order by bucket_type desc, observed_count desc, label), '[]'::jsonb) as buckets
    from (
      select 'value'::text as bucket_type, label, observed_count from selection_counts where observed_count >= 5
      union all select 'suppressed'::text, null::text, null::integer
        where exists (select 1 from selection_counts where observed_count between 1 and 4)
    ) bucket
  ),
  entry_page_counts as (
    select
      session.entry_path as label,
      count(*)::integer as observed_count
      from window_sessions as session
      group by session.entry_path
  ),
  recent_candidates as (
    select
      session.*,
      'HG-' || upper(
        substr(
          encode(
            extensions.digest(
              convert_to(
                session.session_hash
                  || ':homeground-admin-traffic:'
                  || window_started_at::date::text,
                'UTF8'
              ),
              'sha256'
            ),
            'hex'
          ),
          1,
          8
        )
      ) as session_label,
      case
        when session.utm_source is null then 'unknown'
        when source_count.observed_count >= 5 then 'value'
        else 'suppressed'
      end as source_bucket_type,
      case
        when source_count.observed_count >= 5
        then session.utm_source
        else null
      end as source_label,
      case
        when session.utm_campaign is null then 'unknown'
        when campaign_count.observed_count >= 5 then 'value'
        else 'suppressed'
      end as campaign_bucket_type,
      case
        when campaign_count.observed_count >= 5
        then session.utm_campaign
        else null
      end as campaign_label,
      case
        when entry_page_count.observed_count >= 5
        then 'value'
        else 'suppressed'
      end as entry_page_bucket_type,
      case
        when entry_page_count.observed_count >= 5
        then session.entry_path
        else null
      end as entry_page_label
      from window_sessions as session
      left join source_counts as source_count
        on source_count.label is not distinct from session.utm_source
      left join campaign_counts as campaign_count
        on campaign_count.label is not distinct from session.utm_campaign
      left join entry_page_counts as entry_page_count
        on entry_page_count.label = session.entry_path
      where (select sessions from total_counts) >= 5
        and (
          select count(*)
            from window_sessions as eligible_session
            where not exists (
              select 1
                from homeground_private.inquiry_traffic_attribution
                  as eligible_attribution
                where eligible_attribution.session_hash =
                  eligible_session.session_hash
            )
        ) >= 5
        and not exists (
        select 1
          from homeground_private.inquiry_traffic_attribution
            as attribution
          where attribution.session_hash = session.session_hash
      )
      order by session.last_seen_at desc, session.session_hash
      limit 12
  ),
  recent_sessions as (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'sessionLabel', candidate.session_label,
          'startedAt',
            date_trunc(
              'day',
              candidate.first_seen_at at time zone 'UTC'
            ) at time zone 'UTC',
          'lastSeenAt',
            date_trunc(
              'day',
              candidate.last_seen_at at time zone 'UTC'
            ) at time zone 'UTC',
          'locale', candidate.locale,
          'source', jsonb_build_object(
            'bucketType', candidate.source_bucket_type,
            'label', candidate.source_label
          ),
          'campaign', jsonb_build_object(
            'bucketType', candidate.campaign_bucket_type,
            'label', candidate.campaign_label
          ),
          'entryPage', jsonb_build_object(
            'bucketType', candidate.entry_page_bucket_type,
            'label', candidate.entry_page_label
          )
        )
        order by candidate.last_seen_at desc, candidate.session_label
      ),
      '[]'::jsonb
    ) as sessions
      from recent_candidates as candidate
  )
  select jsonb_build_object(
    'contractVersion', 'homeground-admin-traffic.v2',
    'generatedAt', generated_at,
    'timezone', 'Asia/Shanghai',
    'window', jsonb_build_object(
      'days', 30,
      'startsAt', window_started_at,
      'endsAt', generated_at
    ),
    'totals', jsonb_build_object(
      'productViews', jsonb_build_object('count', case when total.product_views = 0 or total.product_views >= 5 then total.product_views else null end, 'suppressed', total.product_views between 1 and 4),
      'productSelections', jsonb_build_object('count', case when total.product_selections = 0 or total.product_selections >= 5 then total.product_selections else null end, 'suppressed', total.product_selections between 1 and 4),
      'formSubmitAttempts', jsonb_build_object('count', case when total.form_submit_attempts = 0 or total.form_submit_attempts >= 5 then total.form_submit_attempts else null end, 'suppressed', total.form_submit_attempts between 1 and 4),
      'formSubmitFailures', jsonb_build_object('count', case when total.form_submit_failures = 0 or total.form_submit_failures >= 5 then total.form_submit_failures else null end, 'suppressed', total.form_submit_failures between 1 and 4),
      'formSubmitUncertain', jsonb_build_object('count', case when total.form_submit_uncertain = 0 or total.form_submit_uncertain >= 5 then total.form_submit_uncertain else null end, 'suppressed', total.form_submit_uncertain between 1 and 4),
      'sessions', jsonb_build_object(
        'count',
          case
            when total.sessions = 0 or total.sessions >= 5
            then total.sessions
            else null
          end,
        'suppressed', total.sessions between 1 and 4
      ),
      'pageViews', jsonb_build_object(
        'count',
          case
            when total.page_views = 0 or total.page_views >= 5
            then total.page_views
            else null
          end,
        'suppressed', total.page_views between 1 and 4
      ),
      'contactClickAttempts', jsonb_build_object(
        'count',
          case
            when total.contact_click_attempts = 0
              or total.contact_click_attempts >= 5
            then total.contact_click_attempts
            else null
          end,
        'suppressed',
          total.contact_click_attempts between 1 and 4
      ),
      'emailFormStarts', jsonb_build_object(
        'count',
          case
            when total.email_form_started = 0
              or total.email_form_started >= 5
            then total.email_form_started
            else null
          end,
        'suppressed',
          total.email_form_started between 1 and 4
      ),
      'attributedEnquiries', jsonb_build_object(
        'count',
          case
            when total.attributed_enquiries = 0
              or total.attributed_enquiries >= 5
            then total.attributed_enquiries
            else null
          end,
        'suppressed',
          total.attributed_enquiries between 1 and 4
      ),
      'unknownSourceSessions', jsonb_build_object(
        'count',
          case
            when total.unknown_source_sessions = 0
              or total.unknown_source_sessions >= 5
            then total.unknown_source_sessions
            else null
          end,
        'suppressed',
          total.unknown_source_sessions between 1 and 4
      )
    ),
    'dimensions', jsonb_build_object(
      'sources', homeground_private.bound_traffic_dimension_v2(source_dimension.buckets),
      'campaigns', homeground_private.bound_traffic_dimension_v2(campaign_dimension.buckets),
      'pages', homeground_private.bound_traffic_dimension_v2(page_dimension.buckets),
      'products', homeground_private.bound_traffic_dimension_v2(product_dimension.buckets),
      'productSelections', homeground_private.bound_traffic_dimension_v2(selection_dimension.buckets)
    ),
    'recentSessions', recent_sessions.sessions,
    'limits', jsonb_build_object(
      'minimumVisibleCount', 5,
      'maximumRecentSessions', 12,
      'recentSessionsMinimumEligibleCount', 5,
      'perSessionEventsIncluded', false,
      'timeResolution', 'day',
      'linkedInquirySessionsExcluded', true,
      'sessionLabelScope', 'current_30_day_window'
    ),
    'notice', jsonb_build_object(
      'scope',
        'Consented anonymous sessions; not people, customers, or market share.',
      'clickMeaning',
        'A contact-channel click does not prove that a message was sent.'
    )
  )
    from total_counts as total
    cross join source_dimension
    cross join campaign_dimension
    cross join product_dimension
    cross join selection_dimension
    cross join page_dimension
    cross join recent_sessions;
end;
$$;

revoke all on function public.get_homeground_admin_traffic_v2() from public, anon, authenticated;
grant execute on function public.get_homeground_admin_traffic_v2() to service_role;
comment on function public.get_homeground_admin_traffic_v2() is
  'Thirty-day consented anonymous aggregates excluding marked synthetic sessions and verified test inquiries. No per-session events or inquiry identifiers; small counts suppressed.';
comment on table homeground_private.traffic_test_markers is
  'Service-only synthetic verification classification. Does not delete or rewrite traffic evidence; cascades with the session thirty-day retention.';
notify pgrst, 'reload schema';
commit;
