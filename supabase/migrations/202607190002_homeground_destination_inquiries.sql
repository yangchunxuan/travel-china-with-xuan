begin;

-- V3 destination-timing inquiries share the proven persistence, rate-limit,
-- and notification outbox tables with V1. The legacy RPC and its schema-1
-- validation stay unchanged so the production form can be deployed before or
-- after the new frontend without a compatibility window.
alter table homeground_private.inquiries
  drop constraint if exists inquiries_entry_path_check;

alter table homeground_private.inquiries
  add constraint inquiries_entry_path_check check (
    entry_path in ('generated_route', 'destination_timing')
  );

create or replace function public.create_homeground_destination_inquiry(
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
  if p_schema_version <> 2
    or p_form_version <> '2026-07-19.1'
    or p_locale not in ('en', 'zh', 'ko')
    or p_journey_revision < 1
    or p_route_id <> 'destination-timing'
    or p_rule_version <> '2026-07-19.1'
    or jsonb_typeof(p_answers) <> 'object'
    or coalesce(p_answers ->> 'destinationMode', '')
      not in ('wishlist', 'classic-start')
    or coalesce(jsonb_typeof(p_answers -> 'destinationIds'), '')
      <> 'array'
    or coalesce(jsonb_typeof(p_answers -> 'mustSeeIds'), '')
      <> 'array'
    or jsonb_typeof(p_route_snapshot) <> 'object'
    or coalesce(p_route_snapshot ->> 'ruleVersion', '') <> p_rule_version
    or coalesce(p_route_snapshot ->> 'routeFeasibility', '')
      <> 'unverified'
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
      message = 'invalid destination inquiry RPC input';
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

  -- Resolve replays before consuming a rate-limit slot, matching V1.
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
    'destination_timing',
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

revoke all on function public.create_homeground_destination_inquiry(
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

grant execute on function public.create_homeground_destination_inquiry(
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

commit;
