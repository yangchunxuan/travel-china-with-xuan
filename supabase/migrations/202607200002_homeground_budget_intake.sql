begin;

-- The traveller may optionally state a rough per-person budget for the China
-- portion of the trip. It is plain context for a human reply, not a quote.
alter table homeground_private.inquiries
  add column if not exists rough_budget_per_person text;

alter table homeground_private.inquiries
  drop constraint if exists inquiries_rough_budget_per_person_check;

alter table homeground_private.inquiries
  add constraint inquiries_rough_budget_per_person_check check (
    rough_budget_per_person is null
    or (
      char_length(trim(rough_budget_per_person)) between 1 and 100
      and rough_budget_per_person !~ '[[:cntrl:]]'
      and position(chr(1564) in rough_budget_per_person) = 0
      and position(chr(8206) in rough_budget_per_person) = 0
      and position(chr(8207) in rough_budget_per_person) = 0
      and position(chr(8232) in rough_budget_per_person) = 0
      and position(chr(8233) in rough_budget_per_person) = 0
      and position(chr(8234) in rough_budget_per_person) = 0
      and position(chr(8235) in rough_budget_per_person) = 0
      and position(chr(8236) in rough_budget_per_person) = 0
      and position(chr(8237) in rough_budget_per_person) = 0
      and position(chr(8238) in rough_budget_per_person) = 0
      and position(chr(8294) in rough_budget_per_person) = 0
      and position(chr(8295) in rough_budget_per_person) = 0
      and position(chr(8296) in rough_budget_per_person) = 0
      and position(chr(8297) in rough_budget_per_person) = 0
    )
  );

-- Keep both older destination RPCs available for static pages that were
-- already open. V3 wraps the V2 transaction and adds the newly versioned
-- privacy and budget fields before the outbox row becomes visible.
create or replace function public.create_homeground_destination_inquiry_v3(
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
begin
  if p_schema_version <> 2
    or p_form_version <> '2026-07-20.2'
    or p_privacy_notice_version <> '2026-07-20.2'
    or (
      p_rough_budget_per_person is not null
      and (
        char_length(trim(p_rough_budget_per_person)) not between 1 and 100
        or p_rough_budget_per_person ~ '[[:cntrl:]]'
        or position(chr(1564) in p_rough_budget_per_person) > 0
        or position(chr(8206) in p_rough_budget_per_person) > 0
        or position(chr(8207) in p_rough_budget_per_person) > 0
        or position(chr(8232) in p_rough_budget_per_person) > 0
        or position(chr(8233) in p_rough_budget_per_person) > 0
        or position(chr(8234) in p_rough_budget_per_person) > 0
        or position(chr(8235) in p_rough_budget_per_person) > 0
        or position(chr(8236) in p_rough_budget_per_person) > 0
        or position(chr(8237) in p_rough_budget_per_person) > 0
        or position(chr(8238) in p_rough_budget_per_person) > 0
        or position(chr(8294) in p_rough_budget_per_person) > 0
        or position(chr(8295) in p_rough_budget_per_person) > 0
        or position(chr(8296) in p_rough_budget_per_person) > 0
        or position(chr(8297) in p_rough_budget_per_person) > 0
      )
    )
  then
    raise exception using
      errcode = '22023',
      message = 'invalid current destination budget inquiry input';
  end if;

  result := public.create_homeground_destination_inquiry_v2(
    p_schema_version,
    '2026-07-20.1',
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
    p_note,
    '2026-07-20.1',
    p_landing_path,
    p_attribution,
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
        rough_budget_per_person =
          nullif(trim(p_rough_budget_per_person), '')
      where inquiry_id = (result ->> 'inquiryId')::uuid;
  end if;

  return result;
end;
$$;

revoke all on function public.create_homeground_destination_inquiry_v3(
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
) from public, anon, authenticated;

grant execute on function public.create_homeground_destination_inquiry_v3(
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
) to service_role;

-- Version the claim shape so an older notification worker can continue using
-- V2 during deployment while the new worker receives the optional budget.
create or replace function public.claim_homeground_notification_jobs_v3(
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
  departure_country text,
  rough_budget_per_person text,
  note text,
  inquiry_created_at timestamptz,
  first_response_due_at timestamptz,
  lease_token uuid,
  row_version bigint,
  attempt_count integer
)
language sql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
  select
    claimed.job_id,
    claimed.inquiry_id,
    claimed.public_reference,
    claimed.locale,
    claimed.route_id,
    claimed.answers,
    claimed.route_snapshot,
    claimed.reply_channel,
    claimed.contact_email,
    claimed.contact_phone_e164,
    claimed.departure_country,
    inquiry.rough_budget_per_person,
    claimed.note,
    claimed.inquiry_created_at,
    claimed.first_response_due_at,
    claimed.lease_token,
    claimed.row_version,
    claimed.attempt_count
  from public.claim_homeground_notification_jobs_v2(
    p_worker_id,
    p_job_limit,
    p_lease_seconds
  ) claimed
  join homeground_private.inquiries inquiry
    on inquiry.inquiry_id = claimed.inquiry_id;
$$;

revoke all on function public.claim_homeground_notification_jobs_v3(
  text,
  integer,
  integer
) from public, anon, authenticated;

grant execute on function public.claim_homeground_notification_jobs_v3(
  text,
  integer,
  integer
) to service_role;

commit;
