-- KakaoTalk contact channel for Korean pages (traffic contract v2 only).
-- The button copies a prepared inquiry and shows the owner's KakaoTalk number;
-- a click is stored as action_code 'kakao' and never proves a message was sent.
-- v1 events keep the original three channels. Historical migrations stay
-- unchanged; this forward migration replaces the v2 event validator and the
-- event action check, and adds an opt-in v4 RPC with a fifth 'kakao' slice.
-- The original v3 RPC remains unchanged for old Edge/UI clients, including
-- its exact legacy all-channel deduplication and dimension totals. The v4 RPC
-- keeps the existing response contract; the new parser accepts four or five slices.

begin;

alter table homeground_private.traffic_events
  drop constraint traffic_event_action_check,
  add constraint traffic_event_action_check check (
    (event_type in ('contact_channel_clicked', 'contact_channel_selected') and action_code is not null and (
      action_code in ('email', 'whatsapp', 'messenger') or
      (contract_version = 'homeground-traffic-events.v2' and action_code = 'kakao'))) or
    (event_type not in ('contact_channel_clicked', 'contact_channel_selected') and action_code is null));

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
    if (candidate -> 'travelers') not in (
      '2'::jsonb, '3'::jsonb, '4'::jsonb, '5'::jsonb,
      '6'::jsonb, '7'::jsonb, '8'::jsonb, '9'::jsonb
    ) then return false; end if;
    travelers_value := (candidate ->> 'travelers')::integer;
  end if;
  if not homeground_private.is_valid_traffic_product_v2(candidate ->> 'productSlug',
    candidate ->> 'packageId', travelers_value) then return false; end if;
  if (candidate ->> 'type') = 'product_selection_changed' and
    ((candidate ->> 'productSlug') is null or (candidate ->> 'packageId') is null or travelers_value is null)
  then return false; end if;
  if (candidate ->> 'type') in ('contact_channel_clicked', 'contact_channel_selected') then
    if (candidate ->> 'actionCode') is null or (candidate ->> 'actionCode') not in ('email', 'whatsapp', 'messenger', 'kakao')
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

revoke all on function homeground_private.is_valid_traffic_event_v2(jsonb)
  from public, anon, authenticated, service_role;

create or replace function public.get_homeground_admin_traffic_v4()
returns table(payload jsonb)
language plpgsql
security definer
set search_path = pg_catalog, homeground_private, extensions
as $$
declare
  base jsonb;
  report jsonb;
  generated_at timestamptz;
begin
  select v.payload into strict base from public.get_homeground_admin_traffic_v2() v;
  generated_at := (base->>'generatedAt')::timestamptz;
  with sessions as materialized (
    select s.* from homeground_private.traffic_sessions s
    where s.first_seen_at between generated_at - interval '30 days' and generated_at
      and ((s.contract_version = 'homeground-traffic-events.v1' and s.notice_version = '2026-07-31.1')
        or (s.contract_version = 'homeground-traffic-events.v2' and s.notice_version = '2026-09-05.1'))
      and not exists (select 1 from homeground_private.traffic_test_markers m where m.session_hash=s.session_hash)
  ), events as materialized (
    select e.*, s.entry_path, s.utm_source, s.first_seen_at
    from homeground_private.traffic_events e join sessions s using (session_hash)
    where e.received_at between generated_at - interval '30 days' and generated_at
      and e.contract_version in ('homeground-traffic-events.v1', 'homeground-traffic-events.v2')
      and e.event_type = 'contact_channel_clicked'
      and e.action_code in ('whatsapp', 'email', 'messenger', 'kakao')
  ), periods as (
    select days, generated_at - make_interval(days => days) as starts_at
    from (values (7), (30)) d(days)
  ), slices as (
    select p.*, c.channel,
      (select count(*)::integer from sessions s where s.first_seen_at >= p.starts_at) as eligible_sessions
    from periods p cross join (values ('all'), ('whatsapp'), ('email'), ('messenger'), ('kakao')) c(channel)
  ), slice_reports as (
    select slice.days, slice.channel, detail.result
    from slices slice
    cross join lateral (
      with selected as materialized (
        select * from events e where e.received_at >= slice.starts_at and e.first_seen_at >= slice.starts_at
          and (slice.channel='all' or e.action_code=slice.channel)
      ), expanded as (
        select e.session_hash, d.kind, d.key from selected e cross join lateral (values
          ('pages', e.page_path), ('entryPages', e.entry_path), ('sources', coalesce(e.utm_source, 'Unknown')),
          ('products', coalesce(e.product_slug, 'Unknown')), ('surfaces', coalesce(e.surface, 'Unknown'))
        ) d(kind, key)
      ), grouped as (
        select kind, key, count(*)::integer clicks, count(distinct session_hash)::integer sessions
        from expanded group by kind, key
      ), ranked as (
        select *, row_number() over (partition by kind order by clicks desc, key) position from grouped
      )
      select jsonb_build_object(
      'channel', slice.channel,
      'clicks', (select count(*)::integer from selected),
      'sessions', (select count(distinct session_hash)::integer from selected),
      'unknownSourceClicks', (select count(*)::integer from selected where utm_source is null),
      'dimensions', (select jsonb_object_agg(kind, dimension) from (
        select kind, jsonb_build_object(
          'rows', coalesce((select jsonb_agg(jsonb_build_object('key', key, 'clicks', clicks, 'sessions', sessions)
            order by clicks desc, key) from ranked where ranked.kind = kinds.kind and position <= 20), '[]'::jsonb),
          'remainingClicks', coalesce((select sum(clicks)::integer from ranked where ranked.kind = kinds.kind and position > 20), 0)
        ) as dimension from (values ('pages'), ('entryPages'), ('sources'), ('products'), ('surfaces')) kinds(kind)
      ) dimensions),
      'daily', (select jsonb_agg(jsonb_build_object('day', to_char(day, 'YYYY-MM-DD'),
        'clicks', (select count(*)::integer from selected where (received_at at time zone 'Asia/Shanghai')::date = day::date),
        'sessions', (select count(distinct session_hash)::integer from selected where (received_at at time zone 'Asia/Shanghai')::date = day::date)
      ) order by day) from generate_series((slice.starts_at at time zone 'Asia/Shanghai')::date::timestamp,
        (generated_at at time zone 'Asia/Shanghai')::date::timestamp, interval '1 day') day)
    ) as result
    ) detail
  )
  select jsonb_build_object('periods', jsonb_agg(jsonb_build_object(
    'days', p.days, 'startsAt', p.starts_at, 'endsAt', generated_at,
    'eligibleSessions', (select count(*)::integer from sessions s where s.first_seen_at >= p.starts_at),
    'channels', (select jsonb_agg(result order by channel) from slice_reports r where r.days=p.days)
  ) order by p.days)) into report from periods p;
  return query select base || jsonb_build_object('contractVersion', 'homeground-admin-traffic.v3', 'contacts', report);
end;
$$;
revoke all on function public.get_homeground_admin_traffic_v4() from public, anon, authenticated;
grant execute on function public.get_homeground_admin_traffic_v4() to service_role;
comment on function public.get_homeground_admin_traffic_v4() is
  'Opt-in fixed read-only 7/30-day contact aggregates including KakaoTalk; owner MFA allowlist via admin-traffic. No identities or message-send claims.';

commit;
