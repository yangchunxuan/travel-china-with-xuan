-- Disposable PostgreSQL fixture only; never run against a project database.
create schema homeground_private;
create schema extensions;
create role anon;
create role authenticated;
create role service_role;
create table homeground_private.traffic_sessions (
  session_hash text primary key, first_seen_at timestamptz, contract_version text,
  notice_version text, entry_path text, utm_source text
);
create table homeground_private.traffic_test_markers (session_hash text primary key);
create table homeground_private.traffic_events (
  event_id text primary key, session_hash text, received_at timestamptz,
  contract_version text, event_type text, action_code text, page_path text,
  product_slug text, surface text
);
create function public.get_homeground_admin_traffic_v2() returns table(payload jsonb)
language sql as $$select jsonb_build_object('generatedAt', '2026-09-13T02:00:00Z')$$;
insert into homeground_private.traffic_sessions values
 ('repeat', '2026-09-12T10:00:00Z','homeground-traffic-events.v2','2026-09-05.1','/guides/example/','google'),
 ('old', '2026-08-17T10:00:00Z','homeground-traffic-events.v1','2026-07-31.1','/',null),
 ('test', '2026-09-12T10:00:00Z','homeground-traffic-events.v2','2026-09-05.1','/',null),
 ('incompatible', '2026-09-12T10:00:00Z','homeground-traffic-events.v2','wrong','/',null),
 ('too-old', '2026-07-12T10:00:00Z','homeground-traffic-events.v2','2026-09-05.1','/',null),
 ('boundary', '2026-09-06T02:00:00Z','homeground-traffic-events.v2','2026-09-05.1','/',null);
insert into homeground_private.traffic_test_markers values ('test');
insert into homeground_private.traffic_events values
 ('1','repeat','2026-09-12T10:00:00Z','homeground-traffic-events.v2','contact_channel_clicked','whatsapp','/tours/example/','example-private-tour','product'),
 ('2','repeat','2026-09-12T16:01:00Z','homeground-traffic-events.v2','contact_channel_clicked','whatsapp','/',null,'contact_options'),
 ('3','repeat','2026-09-12T16:02:00Z','homeground-traffic-events.v2','contact_channel_clicked','email','/',null,'contact_options'),
 ('4','old','2026-08-17T10:00:00Z','homeground-traffic-events.v1','contact_channel_clicked','whatsapp','/',null,null),
 ('5','test','2026-09-12T10:00:00Z','homeground-traffic-events.v2','contact_channel_clicked','whatsapp','/',null,null),
 ('6','incompatible','2026-09-12T10:00:00Z','homeground-traffic-events.v2','contact_channel_clicked','whatsapp','/',null,null),
 ('7','too-old','2026-09-12T10:00:00Z','homeground-traffic-events.v2','contact_channel_clicked','whatsapp','/',null,null),
 ('8','repeat','2026-09-14T10:00:00Z','homeground-traffic-events.v2','contact_channel_clicked','whatsapp','/',null,null),
 ('9','repeat','2026-09-12T10:00:00Z','homeground-traffic-events.v2','contact_channel_selected','whatsapp','/',null,null),
 ('10','boundary','2026-09-06T02:00:00Z','homeground-traffic-events.v2','contact_channel_clicked','whatsapp','/',null,null);
