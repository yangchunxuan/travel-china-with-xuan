begin;

create extension if not exists pg_cron with schema pg_catalog;
create schema if not exists homeground_private;

create table homeground_private.traffic_sessions (
  session_hash text primary key
    check (session_hash ~ '^[0-9a-f]{64}$'),
  first_seen_at timestamptz not null default clock_timestamp(),
  last_seen_at timestamptz not null default clock_timestamp(),
  contract_version text not null
    check (contract_version = 'homeground-traffic-events.v1'),
  notice_version text not null
    check (notice_version = '2026-07-31.1'),
  hash_key_version smallint not null default 1
    check (hash_key_version = 1),
  locale text not null check (locale in ('en', 'zh', 'ko')),
  entry_path text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  constraint traffic_session_time_check
    check (last_seen_at >= first_seen_at),
  constraint traffic_session_entry_path_check check (
    char_length(entry_path) between 1 and 180
    and entry_path ~ '^/[A-Za-z0-9/_-]*$'
    and position('//' in entry_path) = 0
    and position('..' in entry_path) = 0
  ),
  constraint traffic_session_utm_source_check check (
    utm_source is null or (
      char_length(utm_source) between 1 and 64
      and utm_source ~ '^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$'
    )
  ),
  constraint traffic_session_utm_medium_check check (
    utm_medium is null or (
      char_length(utm_medium) between 1 and 64
      and utm_medium ~ '^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$'
    )
  ),
  constraint traffic_session_utm_campaign_check check (
    utm_campaign is null or (
      char_length(utm_campaign) between 1 and 96
      and utm_campaign ~ '^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$'
    )
  ),
  constraint traffic_session_utm_content_check check (
    utm_content is null or (
      char_length(utm_content) between 1 and 96
      and utm_content ~ '^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$'
    )
  )
);

create index traffic_sessions_retention_idx
  on homeground_private.traffic_sessions(first_seen_at);

create table homeground_private.traffic_events (
  event_id uuid primary key,
  session_hash text not null
    references homeground_private.traffic_sessions(session_hash)
    on delete cascade,
  received_at timestamptz not null default clock_timestamp(),
  contract_version text not null
    check (contract_version = 'homeground-traffic-events.v1'),
  event_type text not null check (
    event_type in (
      'page_view',
      'contact_options_viewed',
      'contact_channel_clicked',
      'email_form_started'
    )
  ),
  page_path text not null,
  action_code text,
  payload_hash text not null
    check (payload_hash ~ '^[0-9a-f]{64}$'),
  constraint traffic_event_id_v4_check check (
    event_id::text
      ~* '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  ),
  constraint traffic_event_page_path_check check (
    char_length(page_path) between 1 and 180
    and page_path ~ '^/[A-Za-z0-9/_-]*$'
    and position('//' in page_path) = 0
    and position('..' in page_path) = 0
  ),
  constraint traffic_event_action_check check (
    (
      event_type = 'contact_channel_clicked'
      and action_code is not null
      and action_code in ('email', 'whatsapp', 'messenger')
    )
    or (
      event_type <> 'contact_channel_clicked'
      and action_code is null
    )
  )
);

create index traffic_events_session_received_idx
  on homeground_private.traffic_events(session_hash, received_at);
create index traffic_events_retention_idx
  on homeground_private.traffic_events(received_at);

create table homeground_private.traffic_rate_limit_buckets (
  subject_hash text not null check (subject_hash ~ '^[0-9a-f]{64}$'),
  window_seconds integer not null check (window_seconds in (600, 86400)),
  bucket_started_at timestamptz not null,
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default clock_timestamp(),
  primary key (subject_hash, window_seconds, bucket_started_at)
);

create index traffic_rate_limit_buckets_retention_idx
  on homeground_private.traffic_rate_limit_buckets(updated_at);

create table homeground_private.inquiry_traffic_attribution (
  inquiry_id uuid primary key
    references homeground_private.inquiries(inquiry_id)
    on delete cascade,
  session_hash text
    references homeground_private.traffic_sessions(session_hash)
    on delete set null,
  linked_at timestamptz not null default clock_timestamp(),
  attribution_model text not null
    check (attribution_model = 'same_browser_session_first_touch'),
  entry_path text not null,
  locale text not null check (locale in ('en', 'zh', 'ko')),
  first_seen_at_snapshot timestamptz not null,
  notice_version text not null
    check (notice_version = '2026-07-31.1'),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  constraint inquiry_traffic_entry_path_check check (
    char_length(entry_path) between 1 and 180
    and entry_path ~ '^/[A-Za-z0-9/_-]*$'
    and position('//' in entry_path) = 0
    and position('..' in entry_path) = 0
  ),
  constraint inquiry_traffic_utm_source_check check (
    utm_source is null or (
      char_length(utm_source) between 1 and 64
      and utm_source ~ '^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$'
    )
  ),
  constraint inquiry_traffic_utm_medium_check check (
    utm_medium is null or (
      char_length(utm_medium) between 1 and 64
      and utm_medium ~ '^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$'
    )
  ),
  constraint inquiry_traffic_utm_campaign_check check (
    utm_campaign is null or (
      char_length(utm_campaign) between 1 and 96
      and utm_campaign ~ '^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$'
    )
  ),
  constraint inquiry_traffic_utm_content_check check (
    utm_content is null or (
      char_length(utm_content) between 1 and 96
      and utm_content ~ '^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$'
    )
  )
);

create index inquiry_traffic_attribution_linked_idx
  on homeground_private.inquiry_traffic_attribution(linked_at)
  where session_hash is not null;

alter table homeground_private.traffic_sessions
  enable row level security;
alter table homeground_private.traffic_sessions
  force row level security;
alter table homeground_private.traffic_events
  enable row level security;
alter table homeground_private.traffic_events
  force row level security;
alter table homeground_private.traffic_rate_limit_buckets
  enable row level security;
alter table homeground_private.traffic_rate_limit_buckets
  force row level security;
alter table homeground_private.inquiry_traffic_attribution
  enable row level security;
alter table homeground_private.inquiry_traffic_attribution
  force row level security;

revoke all on table homeground_private.traffic_sessions
  from public, anon, authenticated, service_role;
revoke all on table homeground_private.traffic_events
  from public, anon, authenticated, service_role;
revoke all on table homeground_private.traffic_rate_limit_buckets
  from public, anon, authenticated, service_role;
revoke all on table homeground_private.inquiry_traffic_attribution
  from public, anon, authenticated, service_role;

create or replace function homeground_private.is_valid_traffic_path(
  p_value text
)
returns boolean
language sql
immutable
set search_path = pg_catalog
as $$
  select
    p_value is not null
    and char_length(p_value) between 1 and 180
    and p_value ~ '^/[A-Za-z0-9/_-]*$'
    and position('//' in p_value) = 0
    and position('..' in p_value) = 0;
$$;

create or replace function homeground_private.is_valid_traffic_utm(
  p_value text,
  p_maximum_length integer
)
returns boolean
language sql
immutable
set search_path = pg_catalog
as $$
  select
    p_value is null
    or (
      p_maximum_length in (64, 96)
      and char_length(p_value) between 1 and p_maximum_length
      and p_value ~ '^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$'
    );
$$;

create or replace function homeground_private.consume_traffic_rate_limit(
  p_subject_hash text,
  p_short_limit integer,
  p_daily_limit integer,
  p_event_count integer
)
returns jsonb
language plpgsql
set search_path = pg_catalog, homeground_private
as $$
declare
  observed_at timestamptz := clock_timestamp();
  short_window_seconds constant integer := 600;
  daily_window_seconds constant integer := 86400;
  short_bucket timestamptz;
  daily_bucket timestamptz;
  short_count integer;
  daily_count integer;
  retry_after integer := 0;
begin
  if p_subject_hash is null
    or p_subject_hash !~ '^[0-9a-f]{64}$'
    or p_short_limit is null
    or p_short_limit < 1
    or p_daily_limit is null
    or p_daily_limit < 1
    or p_event_count is null
    or p_event_count not between 1 and 20
  then
    raise exception using
      errcode = '22023',
      message = 'invalid traffic rate-limit input';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_subject_hash, 51));

  short_bucket := to_timestamp(
    floor(extract(epoch from observed_at) / short_window_seconds)
      * short_window_seconds
  );
  daily_bucket := to_timestamp(
    floor(extract(epoch from observed_at) / daily_window_seconds)
      * daily_window_seconds
  );

  insert into homeground_private.traffic_rate_limit_buckets (
    subject_hash,
    window_seconds,
    bucket_started_at,
    request_count
  )
  values (
    p_subject_hash,
    short_window_seconds,
    short_bucket,
    p_event_count
  )
  on conflict (subject_hash, window_seconds, bucket_started_at)
  do update set
    request_count =
      homeground_private.traffic_rate_limit_buckets.request_count
        + p_event_count,
    updated_at = observed_at
  returning request_count into short_count;

  insert into homeground_private.traffic_rate_limit_buckets (
    subject_hash,
    window_seconds,
    bucket_started_at,
    request_count
  )
  values (
    p_subject_hash,
    daily_window_seconds,
    daily_bucket,
    p_event_count
  )
  on conflict (subject_hash, window_seconds, bucket_started_at)
  do update set
    request_count =
      homeground_private.traffic_rate_limit_buckets.request_count
        + p_event_count,
    updated_at = observed_at
  returning request_count into daily_count;

  if short_count > p_short_limit then
    retry_after := greatest(
      retry_after,
      ceil(
        extract(
          epoch from short_bucket
            + make_interval(secs => short_window_seconds)
            - observed_at
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
            - observed_at
        )
      )::integer
    );
  end if;

  delete from homeground_private.traffic_rate_limit_buckets
    where updated_at <= observed_at - interval '24 hours';

  return jsonb_build_object(
    'allowed', retry_after = 0,
    'retryAfter', greatest(retry_after, 0)
  );
end;
$$;

create or replace function public.record_homeground_traffic_events_v1(
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
  if p_contract_version is distinct from 'homeground-traffic-events.v1'
    or p_notice_version is distinct from '2026-07-31.1'
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
    if jsonb_typeof(candidate) is distinct from 'object' then
      raise exception using
        errcode = '22023',
        message = 'invalid traffic event';
    end if;

    if exists (
        select 1
        from jsonb_object_keys(candidate) as supplied(supplied_key)
        where supplied_key not in (
          'eventId',
          'type',
          'pagePath',
          'actionCode',
          'payloadHash'
        )
      )
      or (candidate ->> 'eventId') is null
      or (candidate ->> 'eventId')
        !~* '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      or (candidate ->> 'type') is null
      or (candidate ->> 'type') not in (
        'page_view',
        'contact_options_viewed',
        'contact_channel_clicked',
        'email_form_started'
      )
      or not homeground_private.is_valid_traffic_path(
        candidate ->> 'pagePath'
      )
      or (candidate ->> 'payloadHash') is null
      or (candidate ->> 'payloadHash') !~ '^[0-9a-f]{64}$'
      or (
        (candidate ->> 'type') = 'contact_channel_clicked'
        and (
          (candidate ->> 'actionCode') is null
          or (candidate ->> 'actionCode') not in (
            'email',
            'whatsapp',
            'messenger'
          )
        )
      )
      or (
        (candidate ->> 'type') <> 'contact_channel_clicked'
        and (candidate ->> 'actionCode') is not null
      )
    then
      raise exception using
        errcode = '22023',
        message = 'invalid traffic event';
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
        payload_hash
      )
      values (
        normalized_event_id,
        p_session_hash,
        observed_at,
        p_contract_version,
        candidate ->> 'type',
        candidate ->> 'pagePath',
        candidate ->> 'actionCode',
        candidate ->> 'payloadHash'
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

create or replace function
  public.attach_homeground_inquiry_traffic_attribution_v1(
    p_inquiry_id uuid,
    p_session_hash text
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  candidate_session homeground_private.traffic_sessions%rowtype;
begin
  if p_inquiry_id is null
    or p_session_hash is null
    or p_session_hash !~ '^[0-9a-f]{64}$'
  then
    raise exception using
      errcode = '22023',
      message = 'invalid inquiry traffic attribution input';
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(p_inquiry_id::text, 54)
  );

  if exists (
    select 1
    from homeground_private.inquiry_traffic_attribution
    where inquiry_id = p_inquiry_id
  ) then
    return jsonb_build_object('outcome', 'replay');
  end if;

  if not exists (
    select 1
    from homeground_private.inquiries
    where inquiry_id = p_inquiry_id
  ) then
    return jsonb_build_object('outcome', 'unknown');
  end if;

  select *
    into candidate_session
    from homeground_private.traffic_sessions
    where session_hash = p_session_hash
      and first_seen_at > clock_timestamp() - interval '30 days'
    for share;

  if not found then
    return jsonb_build_object('outcome', 'unknown');
  end if;

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
    clock_timestamp(),
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

  return jsonb_build_object('outcome', 'attributed');
end;
$$;

create or replace function
  homeground_private.purge_expired_traffic_rate_limit_buckets_v1()
returns integer
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  deleted_count integer;
begin
  delete from homeground_private.traffic_rate_limit_buckets
    where updated_at <= clock_timestamp() - interval '24 hours';
  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

create or replace function
  homeground_private.purge_expired_homeground_traffic_v1()
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  association_count integer := 0;
  event_count integer := 0;
  session_count integer := 0;
begin
  -- Keep the immutable attribution snapshot with its inquiry, but remove the
  -- reversible session association after 30 days.
  update homeground_private.inquiry_traffic_attribution
    set session_hash = null
    where session_hash is not null
      and linked_at <= clock_timestamp() - interval '30 days';
  get diagnostics association_count = row_count;

  delete from homeground_private.traffic_events
    where received_at <= clock_timestamp() - interval '30 days';
  get diagnostics event_count = row_count;

  -- Age sessions from first touch, not last activity, so an active browser
  -- token cannot keep a historical association alive indefinitely.
  delete from homeground_private.traffic_sessions
    where first_seen_at <= clock_timestamp() - interval '30 days';
  get diagnostics session_count = row_count;

  return jsonb_build_object(
    'sessionAssociationsCleared', association_count,
    'eventsDeleted', event_count,
    'sessionsDeleted', session_count
  );
end;
$$;

revoke all on function homeground_private.is_valid_traffic_path(text)
  from public, anon, authenticated, service_role;
revoke all on function homeground_private.is_valid_traffic_utm(text, integer)
  from public, anon, authenticated, service_role;
revoke all on function homeground_private.consume_traffic_rate_limit(
  text,
  integer,
  integer,
  integer
) from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.purge_expired_traffic_rate_limit_buckets_v1()
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.purge_expired_homeground_traffic_v1()
  from public, anon, authenticated, service_role;

revoke all on function public.record_homeground_traffic_events_v1(
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
grant execute on function public.record_homeground_traffic_events_v1(
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

revoke all on function
  public.attach_homeground_inquiry_traffic_attribution_v1(uuid, text)
  from public, anon, authenticated;
grant execute on function
  public.attach_homeground_inquiry_traffic_attribution_v1(uuid, text)
  to service_role;

comment on table homeground_private.traffic_sessions is
  'Thirty-day first-party session hashes and controlled first-touch labels; never raw browser identifiers.';
comment on table homeground_private.traffic_events is
  'Thirty-day bounded first-party product events; no raw IP, user agent, referrer, PII or free-text payload.';
comment on table homeground_private.inquiry_traffic_attribution is
  'Immutable first-touch snapshot retained with an inquiry; reversible session association is removed after thirty days.';

do $schedule$
begin
  if exists (
    select 1
    from cron.job
    where jobname = 'homeground-purge-traffic-rate-limit-buckets'
  ) then
    perform cron.unschedule(
      'homeground-purge-traffic-rate-limit-buckets'
    );
  end if;
  perform cron.schedule(
    'homeground-purge-traffic-rate-limit-buckets',
    '* * * * *',
    'select homeground_private.purge_expired_traffic_rate_limit_buckets_v1();'
  );

  if exists (
    select 1
    from cron.job
    where jobname = 'homeground-purge-traffic-daily'
  ) then
    perform cron.unschedule('homeground-purge-traffic-daily');
  end if;
  if exists (
    select 1
    from cron.job
    where jobname = 'homeground-purge-traffic-hourly'
  ) then
    perform cron.unschedule('homeground-purge-traffic-hourly');
  end if;
  perform cron.schedule(
    'homeground-purge-traffic-hourly',
    '17 * * * *',
    'select homeground_private.purge_expired_homeground_traffic_v1();'
  );
end;
$schedule$;

commit;
