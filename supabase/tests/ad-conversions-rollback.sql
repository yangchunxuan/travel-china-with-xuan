-- Synthetic transaction-only acceptance check. Run as the database owner after
-- the migration. Never replace ROLLBACK with COMMIT. No HTTP or worker calls.
-- Uncommitted notification outbox rows cannot be seen by notification workers.
begin;
set local lock_timeout='5s';
set local statement_timeout='20s';
do $ads_rollback_fixture$
declare
  fixture_key text:=encode(extensions.digest(gen_random_uuid()::text,'sha256'),'hex');
  fixture_subject text:=encode(extensions.digest(gen_random_uuid()::text,'sha256'),'hex');
  fixture_token text:=gen_random_uuid()::text;
  fixture_admin uuid:=gen_random_uuid();
  fixture_args jsonb; fixture_ad jsonb; saved jsonb; checked jsonb; reference text; inquiry uuid; paid_at timestamptz;
begin
  fixture_args:=jsonb_build_object('p_schema_version',3,'p_form_version','2026-07-26.1','p_locale','en',
    'p_contact_email','transaction-check@example.invalid','p_privacy_notice_version','2026-07-26.1','p_landing_path','/',
    'p_attribution','{}'::jsonb,'p_idempotency_key_hash',fixture_key,
    'p_payload_hash',encode(extensions.digest('transaction-only-ad-fixture','sha256'),'hex'),
    'p_rate_limit_subject_hash',fixture_subject,'p_short_rate_limit',5,'p_daily_rate_limit',20,
    'p_first_response_due_at',clock_timestamp()+interval '1 day');
  fixture_ad:=jsonb_build_object('version','homeground-ad-attribution.v1','clickIdType','gclid',
    'clickId','ISOLATED_ROLLBACK_FIXTURE_NEVER_UPLOAD','capturedAt',clock_timestamp()-interval '1 minute',
    'landingPath','/tours/','consent','granted','consentVersion','2026-10-13.1',
    'consentUpdatedAt',clock_timestamp()-interval '2 minutes','revocationToken',fixture_token);
  saved:=public.create_homeground_inquiry_with_ads_v1('create_homeground_homepage_email_v1',fixture_args,false,null,fixture_ad);
  if saved->>'outcome' is distinct from 'created' or saved->>'adAttributionOutcome' is distinct from 'saved' then
    raise exception 'ads rollback fixture: intake/attribution failed'; end if;
  reference:=saved->>'publicReference'; inquiry:=(saved->>'inquiryId')::uuid;
  checked:=public.create_homeground_inquiry_with_ads_v1('create_homeground_homepage_email_v1',fixture_args,false,null,fixture_ad||'{"clickId":"REPLAY_CANNOT_REPLACE"}'::jsonb);
  if checked->>'outcome' is distinct from 'replay' or (select click_id from homeground_private.inquiry_ad_attribution where inquiry_id=inquiry)<>'ISOLATED_ROLLBACK_FIXTURE_NEVER_UPLOAD' then
    raise exception 'ads rollback fixture: idempotency failed'; end if;
  paid_at:=clock_timestamp();
  checked:=public.manage_homeground_inquiry_conversion_v1(fixture_admin,'record_payment',reference,1.23,'USD',paid_at);
  if checked->>'contractVersion' is distinct from 'homeground-admin-conversions.v1' or jsonb_array_length(checked#>'{inquiry,events}')<>2 then
    raise exception 'ads rollback fixture: first payment failed'; end if;
  checked:=public.manage_homeground_inquiry_conversion_v1(fixture_admin,'record_payment',reference,1.23,'USD',paid_at);
  if checked->>'contractVersion' is distinct from 'homeground-admin-conversions.v1' or (select count(*) from homeground_private.inquiry_ad_conversion_events where inquiry_id=inquiry)<>2 then
    raise exception 'ads rollback fixture: payment deduplication failed'; end if;
  checked:=public.manage_homeground_inquiry_conversion_v1(fixture_admin,'record_payment',reference,4.56,'USD',paid_at);
  if checked->>'error' is distinct from 'payment_already_recorded' then raise exception 'ads rollback fixture: immutable payment failed'; end if;
  if not public.withdraw_homeground_ad_attribution_v1(encode(extensions.digest(fixture_token,'sha256'),'hex'),fixture_subject) then
    raise exception 'ads rollback fixture: withdrawal failed'; end if;
  if exists(select 1 from homeground_private.inquiry_ad_attribution where inquiry_id=inquiry) or
    exists(select 1 from homeground_private.inquiry_ad_conversion_events where inquiry_id=inquiry and status<>'blocked') then
    raise exception 'ads rollback fixture: withdrawal did not remove/cancel'; end if;
  fixture_args:=fixture_args||jsonb_build_object('p_idempotency_key_hash',encode(extensions.digest(gen_random_uuid()::text,'sha256'),'hex'));
  checked:=public.create_homeground_inquiry_with_ads_v1('create_homeground_homepage_email_v1',fixture_args,false,null,fixture_ad);
  if checked->>'outcome' is distinct from 'created' or checked->>'adAttributionOutcome' is distinct from 'withdrawn' then
    raise exception 'ads rollback fixture: delayed intake resurrected withdrawal'; end if;
end;
$ads_rollback_fixture$;
select 'passed: intake, immutable attribution, first payment, deduplication, withdrawal, delayed-intake protection; transaction rolled back' as verification;
rollback;
