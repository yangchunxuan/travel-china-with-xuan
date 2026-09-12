-- Private owner reporting only. Exact aggregate counts, never individual events,
-- session labels, timestamps finer than a day, customer fields or raw URL queries.
-- Existing v2 remains available for rollback. No collection or retention changes.
begin;
create or replace function public.get_homeground_admin_traffic_v3()
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
      and e.action_code in ('whatsapp', 'email', 'messenger')
  ), periods as (
    select days, generated_at - make_interval(days => days) as starts_at
    from (values (7), (30)) d(days)
  ), slices as (
    select p.*, c.channel,
      (select count(*)::integer from sessions s where s.first_seen_at >= p.starts_at) as eligible_sessions
    from periods p cross join (values ('all'), ('whatsapp'), ('email'), ('messenger')) c(channel)
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
revoke all on function public.get_homeground_admin_traffic_v3() from public, anon, authenticated;
grant execute on function public.get_homeground_admin_traffic_v3() to service_role;
comment on function public.get_homeground_admin_traffic_v3() is
  'Fixed read-only 7/30-day contact aggregates; owner MFA allowlist via admin-traffic. No identities or message-send claims.';
commit;
