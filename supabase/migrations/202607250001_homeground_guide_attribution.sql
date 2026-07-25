begin;

-- Keep the deployed V4 intake untouched for already-open clients. The public
-- Edge Function selects this capability RPC only when the request explicitly
-- carries the new entryPath field. V5 delegates all persistence, rate-limit,
-- idempotency, and outbox work to V4, then saves only the Edge-allowlisted
-- attribution object in the same database transaction.
create or replace function
  public.create_homeground_destination_inquiry_v5_attribution(
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
    p_first_response_due_at timestamptz
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  result jsonb;
  normalized_attribution jsonb :=
    coalesce(p_attribution, '{}'::jsonb);
  allowed_entry_paths constant text[] := array[
    '/',
    '/business-information/',
    '/china-itinerary-review/',
    '/guides/',
    '/guides/beijing-zhangjiajie-shanghai-10-days/',
    '/guides/beijing-zhangjiajie-shanghai-transport/',
    '/guides/best-zhangjiajie-night-show/',
    '/guides/china-240-hour-visa-free-transit-route-check/',
    '/guides/china-entry-requirements/',
    '/guides/china-visa-free-canadian-citizens-2026/',
    '/guides/china-visa-free-new-zealand-citizens-2026/',
    '/guides/china-visa-free-uk-citizens-2026/',
    '/guides/do-singaporeans-need-visa-china/',
    '/guides/do-us-citizens-need-visa-china-2026/',
    '/guides/is-your-china-itinerary-too-rushed/',
    '/guides/kevin-before-the-hotel-pickup/',
    '/guides/zhangjiajie-glass-bridge-vs-skywalk/',
    '/guides/zhangjiajie-itinerary/',
    '/guides/zhangjiajie-older-travellers/',
    '/privacy/',
    '/refund-delivery/',
    '/studio/',
    '/terms/',
    '/zh/',
    '/zh/business-information/',
    '/zh/china-itinerary-review/',
    '/zh/guides/',
    '/zh/guides/beijing-zhangjiajie-shanghai-10-days/',
    '/zh/guides/beijing-zhangjiajie-shanghai-transport/',
    '/zh/guides/best-zhangjiajie-night-show/',
    '/zh/guides/china-240-hour-visa-free-transit-route-check/',
    '/zh/guides/do-singaporeans-need-visa-china/',
    '/zh/guides/do-us-citizens-need-visa-china-2026/',
    '/zh/guides/is-your-china-itinerary-too-rushed/',
    '/zh/guides/kevin-before-the-hotel-pickup/',
    '/zh/guides/zhangjiajie-glass-bridge-vs-skywalk/',
    '/zh/guides/zhangjiajie-itinerary/',
    '/zh/guides/zhangjiajie-older-travellers/',
    '/zh/privacy/',
    '/zh/refund-delivery/',
    '/zh/studio/',
    '/zh/terms/',
    '/ko/',
    '/ko/business-information/',
    '/ko/china-itinerary-review/',
    '/ko/guides/',
    '/ko/guides/beijing-zhangjiajie-shanghai-10-days/',
    '/ko/guides/beijing-zhangjiajie-shanghai-transport/',
    '/ko/guides/best-zhangjiajie-night-show/',
    '/ko/guides/china-240-hour-visa-free-transit-route-check/',
    '/ko/guides/do-singaporeans-need-visa-china/',
    '/ko/guides/do-us-citizens-need-visa-china-2026/',
    '/ko/guides/is-your-china-itinerary-too-rushed/',
    '/ko/guides/kevin-before-the-hotel-pickup/',
    '/ko/guides/zhangjiajie-glass-bridge-vs-skywalk/',
    '/ko/guides/zhangjiajie-itinerary/',
    '/ko/guides/zhangjiajie-older-travellers/',
    '/ko/privacy/',
    '/ko/refund-delivery/',
    '/ko/studio/',
    '/ko/terms/',
    '/other/'
  ];
  allowed_source_guides constant text[] := array[
    'beijing-zhangjiajie-shanghai-10-days',
    'beijing-zhangjiajie-shanghai-transport',
    'best-zhangjiajie-night-show',
    'china-240-hour-visa-free-transit-route-check',
    'china-entry-guides',
    'china-entry-requirements',
    'china-visa-free-canadian-citizens-2026',
    'china-visa-free-new-zealand-citizens-2026',
    'china-visa-free-uk-citizens-2026',
    'do-singaporeans-need-visa-china',
    'do-us-citizens-need-visa-china-2026',
    'guides-hub',
    'is-your-china-itinerary-too-rushed',
    'kevin-before-the-hotel-pickup',
    'visa-free-entry',
    'zhangjiajie-glass-bridge-vs-skywalk',
    'zhangjiajie-itinerary',
    'zhangjiajie-older-travellers'
  ];
begin
  -- This is not a general metadata bag. It accepts only bounded scalar text
  -- fields that the public Edge Function rebuilds from its own allowlist.
  -- V5 is selected only for the new capability-bearing form, so entryPath is
  -- required here as defense in depth. Older 2026-07-21 clients remain on V4.
  if jsonb_typeof(normalized_attribution) <> 'object' then
    raise exception using
      errcode = '22023',
      message = 'invalid guide attribution input';
  end if;

  if p_schema_version <> 2
    or p_form_version <> '2026-07-25.1'
    or p_privacy_notice_version <> '2026-07-25.1'
    or not (normalized_attribution ? 'entryPath')
    or (
      normalized_attribution
        - 'entryPath'
        - 'sourceGuide'
        - 'utmSource'
        - 'utmMedium'
        - 'utmCampaign'
        - 'utmContent'
    ) <> '{}'::jsonb
    or exists (
      select 1
        from jsonb_each(normalized_attribution) attribute
        where jsonb_typeof(attribute.value) <> 'string'
          or char_length(attribute.value #>> '{}') not between 1 and
            case
              when attribute.key = 'entryPath' then 200
              else 100
            end
          or attribute.value #>> '{}' <> btrim(attribute.value #>> '{}')
          or attribute.value #>> '{}' ~ '[[:cntrl:]]'
          or position(chr(1564) in attribute.value #>> '{}') > 0
          or position(chr(8206) in attribute.value #>> '{}') > 0
          or position(chr(8207) in attribute.value #>> '{}') > 0
          or position(chr(8232) in attribute.value #>> '{}') > 0
          or position(chr(8233) in attribute.value #>> '{}') > 0
          or position(chr(8234) in attribute.value #>> '{}') > 0
          or position(chr(8235) in attribute.value #>> '{}') > 0
          or position(chr(8236) in attribute.value #>> '{}') > 0
          or position(chr(8237) in attribute.value #>> '{}') > 0
          or position(chr(8238) in attribute.value #>> '{}') > 0
          or position(chr(8294) in attribute.value #>> '{}') > 0
          or position(chr(8295) in attribute.value #>> '{}') > 0
          or position(chr(8296) in attribute.value #>> '{}') > 0
          or position(chr(8297) in attribute.value #>> '{}') > 0
    )
    or (
      normalized_attribution ? 'entryPath'
      and (
        not (
          normalized_attribution ->> 'entryPath'
            = any(allowed_entry_paths)
        )
        or normalized_attribution ->> 'entryPath' !~ '^/'
        or normalized_attribution ->> 'entryPath' ~ '^//'
        or position(
          '://' in normalized_attribution ->> 'entryPath'
        ) > 0
        or position(
          '?' in normalized_attribution ->> 'entryPath'
        ) > 0
        or position(
          '#' in normalized_attribution ->> 'entryPath'
        ) > 0
      )
    )
    or (
      normalized_attribution ? 'sourceGuide'
      and (
        normalized_attribution ->> 'sourceGuide'
          !~ '^[a-z0-9]+(-[a-z0-9]+)*$'
        or not (
          normalized_attribution ->> 'sourceGuide'
            = any(allowed_source_guides)
        )
      )
    )
  then
    raise exception using
      errcode = '22023',
      message = 'invalid guide attribution input';
  end if;

  result := public.create_homeground_destination_inquiry_v4(
    p_schema_version,
    '2026-07-21.1',
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
    p_departure_country,
    p_rough_budget_per_person,
    p_note,
    '2026-07-21.1',
    p_landing_path,
    '{}'::jsonb,
    p_idempotency_key_hash,
    p_payload_hash,
    p_rate_limit_subject_hash,
    p_short_rate_limit,
    p_daily_rate_limit,
    p_first_response_due_at
  );

  if (result ->> 'outcome') in ('created', 'replay') then
    update homeground_private.inquiries
      set
        form_version = p_form_version,
        privacy_notice_version = p_privacy_notice_version,
        attribution_json = normalized_attribution
      where inquiry_id = (result ->> 'inquiryId')::uuid;
  end if;

  return result;
end;
$$;

comment on function
  public.create_homeground_destination_inquiry_v5_attribution(
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
    text,
    text,
    jsonb,
    text,
    text,
    text,
    integer,
    integer,
    timestamptz
  ) is
  'Creates or replays a current destination inquiry and stores only bounded, allowlisted attribution text. V4 remains available for clients without the capability field.';

revoke all on function
  public.create_homeground_destination_inquiry_v5_attribution(
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
    text,
    text,
    jsonb,
    text,
    text,
    text,
    integer,
    integer,
    timestamptz
  )
  from public, anon, authenticated;

grant execute on function
  public.create_homeground_destination_inquiry_v5_attribution(
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
    text,
    text,
    jsonb,
    text,
    text,
    text,
    integer,
    integer,
    timestamptz
  )
  to service_role;

-- The new form changes only attribution and privacy disclosure. Its route
-- answers and snapshots remain compatible with the existing Schema 2 metrics.
insert into homeground_private.admin_metric_compatibility (
  metric_id,
  schema_version,
  entry_path,
  form_version,
  rule_version
)
select
  metric.metric_id,
  2,
  'destination_timing',
  '2026-07-25.1',
  '2026-07-19.1'
from unnest(array[
  'destination_selections',
  'trip_duration',
  'party',
  'pace',
  'stay_time_reference_match',
  'must_see_selections',
  'reply_channel_choice',
  'form_locale'
]) as metric(metric_id)
on conflict do nothing;

-- Preserve the 07-21 health implementation as a private base and expose the
-- same operational payload with the current coordinated form/privacy pair.
-- Keeping the version projection here prevents the Admin Edge parser and the
-- database producer from silently drifting during this release.
alter function public.get_homeground_admin_health()
  set schema homeground_private;
alter function homeground_private.get_homeground_admin_health()
  rename to get_homeground_admin_health_20260721;

revoke all on function
  homeground_private.get_homeground_admin_health_20260721()
  from public, anon, authenticated, service_role;

create or replace function public.get_homeground_admin_health()
returns table (payload jsonb)
language sql
stable
security definer
set search_path = pg_catalog, public, homeground_private,
  homeground_recovery
as $$
  select jsonb_set(
    jsonb_set(
      base.payload,
      '{versions,currentForm}',
      to_jsonb('2026-07-25.1'::text),
      false
    ),
    '{versions,currentPrivacy}',
    to_jsonb('2026-07-25.1'::text),
    false
  ) as payload
  from homeground_private.get_homeground_admin_health_20260721() base;
$$;

comment on function public.get_homeground_admin_health() is
  'Returns operational truth sources and aggregate counts for the current coordinated form/privacy release. Provider Accepted is not delivery, reading, or reply confirmation.';

revoke all on function public.get_homeground_admin_health()
  from public, anon, authenticated;
grant execute on function public.get_homeground_admin_health()
  to service_role;

-- A future authenticated Admin Edge handler may call this RPC after applying
-- the same MFA, UUID allowlist, exact-Origin, and audit controls as the current
-- admin-insights endpoint. Until then it is callable only by service_role.
--
-- Sparse source-guide buckets are omitted entirely. The response deliberately
-- contains no total, denominator, suppressed-bucket count, row identifier,
-- contact value, country, budget, note, or other free text, so a visible bucket
-- cannot be subtracted from an overall total to reconstruct a value below k=5.
create or replace function
  public.get_homeground_admin_guide_inquiry_counts()
returns table (payload jsonb)
language plpgsql
stable
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  generated_at timestamptz := now();
  window_started_at timestamptz :=
    generated_at - interval '90 days';
  data_quality_hold_active boolean;
  visible_guides jsonb;
  allowed_source_guides constant text[] := array[
    'beijing-zhangjiajie-shanghai-10-days',
    'beijing-zhangjiajie-shanghai-transport',
    'best-zhangjiajie-night-show',
    'china-240-hour-visa-free-transit-route-check',
    'china-entry-guides',
    'china-entry-requirements',
    'china-visa-free-canadian-citizens-2026',
    'china-visa-free-new-zealand-citizens-2026',
    'china-visa-free-uk-citizens-2026',
    'do-singaporeans-need-visa-china',
    'do-us-citizens-need-visa-china-2026',
    'guides-hub',
    'is-your-china-itinerary-too-rushed',
    'kevin-before-the-hotel-pickup',
    'visa-free-entry',
    'zhangjiajie-glass-bridge-vs-skywalk',
    'zhangjiajie-itinerary',
    'zhangjiajie-older-travellers'
  ];
begin
  select
    exists (
      select 1
        from homeground_private.data_quality_incidents incident
        where incident.status = 'open'
    )
    or exists (
      select 1
        from homeground_private.inquiries future_inquiry
        where future_inquiry.created_at > generated_at
    )
  into data_quality_hold_active;

  with grouped as (
    select
      inquiry.attribution_json ->> 'sourceGuide' as source_guide,
      count(*)::bigint as inquiry_count
    from homeground_private.inquiries inquiry
    where inquiry.created_at >= window_started_at
      and inquiry.created_at <= generated_at
      and inquiry.schema_version = 2
      and inquiry.entry_path = 'destination_timing'
      and inquiry.form_version = '2026-07-25.1'
      and inquiry.rule_version = '2026-07-19.1'
      and jsonb_typeof(
        inquiry.attribution_json -> 'sourceGuide'
      ) = 'string'
      and inquiry.attribution_json ->> 'sourceGuide'
        = any(allowed_source_guides)
    group by inquiry.attribution_json ->> 'sourceGuide'
    having count(*) >= 5
  )
  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'sourceGuide', grouped.source_guide,
        'inquiryCount', grouped.inquiry_count
      )
      order by grouped.inquiry_count desc, grouped.source_guide
    ),
    '[]'::jsonb
  )
  into visible_guides
  from grouped;

  if data_quality_hold_active then
    visible_guides := '[]'::jsonb;
  end if;

  return query
  select jsonb_build_object(
    'contractVersion', 'homeground-admin-guide-inquiries.v1',
    'generatedAt', generated_at,
    'timezone', 'Asia/Shanghai',
    'window', jsonb_build_object(
      'days', 90,
      'startsAt', window_started_at,
      'endsAt', generated_at
    ),
    'minimumVisibleCount', 5,
    'dataQualityHold', jsonb_build_object(
      'active', data_quality_hold_active,
      'message', case
        when data_quality_hold_active
          then
            'Do not use this window for content or product decisions.'
        else null
      end
    ),
    'guides', visible_guides,
    'notice',
      'Saved submissions, not unique people, customers, or market share.'
  );
end;
$$;

comment on function
  public.get_homeground_admin_guide_inquiry_counts() is
  'Returns fixed-window source-guide inquiry counts only when each bucket reaches k=5. It returns no total, suppressed bucket, row identifier, contact value, or free text.';

revoke all on function
  public.get_homeground_admin_guide_inquiry_counts()
  from public, anon, authenticated;

grant execute on function
  public.get_homeground_admin_guide_inquiry_counts()
  to service_role;

commit;
