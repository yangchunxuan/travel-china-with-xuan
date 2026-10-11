begin;

-- Receipt admission is now part of the same transaction as the actual enquiry.
-- No rejected/rate-limited request allocates an auxiliary intent row.
create function public.create_homeground_inquiry_with_receipt_v1(
  p_rpc_name text, p_arguments jsonb, p_ack_enabled boolean, p_ack_recipient_hash text
) returns jsonb language plpgsql security definer
set search_path=pg_catalog,public,homeground_private as $$
declare result jsonb; key_hash text; receipt_intents jsonb;
begin
  if p_arguments is null or jsonb_typeof(p_arguments)<>'object' or octet_length(p_arguments::text)>32768
    or p_ack_enabled is null or (p_ack_recipient_hash is not null and p_ack_recipient_hash !~ '^[a-f0-9]{64}$') then
    raise exception using errcode='22023',message='invalid receipt intake';
  end if;
  key_hash := p_arguments->>'p_idempotency_key_hash';
  if key_hash is null or key_hash !~ '^[a-f0-9]{64}$' then
    raise exception using errcode='22023',message='invalid receipt intake key';
  end if;
  receipt_intents := coalesce(nullif(current_setting('homeground.traveller_ack_intents',true),''),'{}')::jsonb;
  perform set_config('homeground.traveller_ack_intents', (receipt_intents || jsonb_build_object(key_hash,
    jsonb_build_object('idempotency_key_hash',key_hash,'payload_hash',p_arguments->>'p_payload_hash',
      'enabled',p_ack_enabled and p_ack_recipient_hash is not null,'recipient_hash',p_ack_recipient_hash,
      'privacy_notice_version',p_arguments->>'p_privacy_notice_version')))::text,true);
  -- Explicit static dispatch keeps all existing validation, pricing, rate limits,
  -- idempotency and optional attribution. No caller-supplied SQL is executed.
  case p_rpc_name
    when 'create_homeground_private_tour_quote_with_traffic_v1' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_contact_email','p_product_interest','p_travel_date','p_note','p_privacy_notice_version','p_landing_path','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at','p_traffic_session_hash'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_private_tour_quote_with_traffic_v1(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_product_interest => (p_arguments->'p_product_interest')::jsonb,
        p_travel_date => (p_arguments->>'p_travel_date')::text,
        p_note => (p_arguments->>'p_note')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz,
        p_traffic_session_hash => (p_arguments->>'p_traffic_session_hash')::text
      );
    when 'create_homeground_private_tour_quote_v1' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_contact_email','p_product_interest','p_travel_date','p_note','p_privacy_notice_version','p_landing_path','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_private_tour_quote_v1(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_product_interest => (p_arguments->'p_product_interest')::jsonb,
        p_travel_date => (p_arguments->>'p_travel_date')::text,
        p_note => (p_arguments->>'p_note')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz
      );
    when 'create_homeground_homepage_email_with_traffic_v1' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_contact_email','p_privacy_notice_version','p_landing_path','p_attribution','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at','p_traffic_session_hash'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_homepage_email_with_traffic_v1(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_attribution => (p_arguments->'p_attribution')::jsonb,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz,
        p_traffic_session_hash => (p_arguments->>'p_traffic_session_hash')::text
      );
    when 'create_homeground_homepage_email_v1' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_contact_email','p_privacy_notice_version','p_landing_path','p_attribution','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_homepage_email_v1(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_attribution => (p_arguments->'p_attribution')::jsonb,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz
      );
    when 'create_homeground_destination_inquiry_v4' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_journey_id','p_journey_revision','p_route_id','p_rule_version','p_answers','p_route_snapshot','p_contact_channel','p_contact_email','p_contact_phone_e164','p_departure_country','p_rough_budget_per_person','p_note','p_privacy_notice_version','p_landing_path','p_attribution','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_destination_inquiry_v4(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_journey_id => (p_arguments->>'p_journey_id')::uuid,
        p_journey_revision => (p_arguments->>'p_journey_revision')::integer,
        p_route_id => (p_arguments->>'p_route_id')::text,
        p_rule_version => (p_arguments->>'p_rule_version')::text,
        p_answers => (p_arguments->'p_answers')::jsonb,
        p_route_snapshot => (p_arguments->'p_route_snapshot')::jsonb,
        p_contact_channel => (p_arguments->>'p_contact_channel')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_contact_phone_e164 => (p_arguments->>'p_contact_phone_e164')::text,
        p_departure_country => (p_arguments->>'p_departure_country')::text,
        p_rough_budget_per_person => (p_arguments->>'p_rough_budget_per_person')::text,
        p_note => (p_arguments->>'p_note')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_attribution => (p_arguments->'p_attribution')::jsonb,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz
      );
    when 'create_homeground_destination_inquiry_v3' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_journey_id','p_journey_revision','p_route_id','p_rule_version','p_answers','p_route_snapshot','p_contact_channel','p_contact_email','p_contact_phone_e164','p_departure_country','p_rough_budget_per_person','p_note','p_privacy_notice_version','p_landing_path','p_attribution','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_destination_inquiry_v3(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_journey_id => (p_arguments->>'p_journey_id')::uuid,
        p_journey_revision => (p_arguments->>'p_journey_revision')::integer,
        p_route_id => (p_arguments->>'p_route_id')::text,
        p_rule_version => (p_arguments->>'p_rule_version')::text,
        p_answers => (p_arguments->'p_answers')::jsonb,
        p_route_snapshot => (p_arguments->'p_route_snapshot')::jsonb,
        p_contact_channel => (p_arguments->>'p_contact_channel')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_contact_phone_e164 => (p_arguments->>'p_contact_phone_e164')::text,
        p_departure_country => (p_arguments->>'p_departure_country')::text,
        p_rough_budget_per_person => (p_arguments->>'p_rough_budget_per_person')::text,
        p_note => (p_arguments->>'p_note')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_attribution => (p_arguments->'p_attribution')::jsonb,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz
      );
    when 'create_homeground_destination_inquiry_v2' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_journey_id','p_journey_revision','p_route_id','p_rule_version','p_answers','p_route_snapshot','p_contact_channel','p_contact_email','p_contact_phone_e164','p_departure_country','p_note','p_privacy_notice_version','p_landing_path','p_attribution','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_destination_inquiry_v2(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_journey_id => (p_arguments->>'p_journey_id')::uuid,
        p_journey_revision => (p_arguments->>'p_journey_revision')::integer,
        p_route_id => (p_arguments->>'p_route_id')::text,
        p_rule_version => (p_arguments->>'p_rule_version')::text,
        p_answers => (p_arguments->'p_answers')::jsonb,
        p_route_snapshot => (p_arguments->'p_route_snapshot')::jsonb,
        p_contact_channel => (p_arguments->>'p_contact_channel')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_contact_phone_e164 => (p_arguments->>'p_contact_phone_e164')::text,
        p_departure_country => (p_arguments->>'p_departure_country')::text,
        p_note => (p_arguments->>'p_note')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_attribution => (p_arguments->'p_attribution')::jsonb,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz
      );
    when 'create_homeground_destination_inquiry' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_journey_id','p_journey_revision','p_route_id','p_rule_version','p_answers','p_route_snapshot','p_contact_channel','p_contact_email','p_contact_phone_e164','p_note','p_privacy_notice_version','p_landing_path','p_attribution','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_destination_inquiry(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_journey_id => (p_arguments->>'p_journey_id')::uuid,
        p_journey_revision => (p_arguments->>'p_journey_revision')::integer,
        p_route_id => (p_arguments->>'p_route_id')::text,
        p_rule_version => (p_arguments->>'p_rule_version')::text,
        p_answers => (p_arguments->'p_answers')::jsonb,
        p_route_snapshot => (p_arguments->'p_route_snapshot')::jsonb,
        p_contact_channel => (p_arguments->>'p_contact_channel')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_contact_phone_e164 => (p_arguments->>'p_contact_phone_e164')::text,
        p_note => (p_arguments->>'p_note')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_attribution => (p_arguments->'p_attribution')::jsonb,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz
      );
    when 'create_homeground_inquiry' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_journey_id','p_journey_revision','p_route_id','p_rule_version','p_answers','p_route_snapshot','p_contact_channel','p_contact_email','p_contact_phone_e164','p_note','p_privacy_notice_version','p_landing_path','p_attribution','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_inquiry(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_journey_id => (p_arguments->>'p_journey_id')::uuid,
        p_journey_revision => (p_arguments->>'p_journey_revision')::integer,
        p_route_id => (p_arguments->>'p_route_id')::text,
        p_rule_version => (p_arguments->>'p_rule_version')::text,
        p_answers => (p_arguments->'p_answers')::jsonb,
        p_route_snapshot => (p_arguments->'p_route_snapshot')::jsonb,
        p_contact_channel => (p_arguments->>'p_contact_channel')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_contact_phone_e164 => (p_arguments->>'p_contact_phone_e164')::text,
        p_note => (p_arguments->>'p_note')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_attribution => (p_arguments->'p_attribution')::jsonb,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz
      );
    when 'create_homeground_destination_inquiry_with_traffic_v1' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_journey_id','p_journey_revision','p_route_id','p_rule_version','p_answers','p_route_snapshot','p_contact_channel','p_contact_email','p_contact_phone_e164','p_departure_country','p_rough_budget_per_person','p_note','p_privacy_notice_version','p_landing_path','p_attribution','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at','p_traffic_session_hash'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_destination_inquiry_with_traffic_v1(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_journey_id => (p_arguments->>'p_journey_id')::uuid,
        p_journey_revision => (p_arguments->>'p_journey_revision')::integer,
        p_route_id => (p_arguments->>'p_route_id')::text,
        p_rule_version => (p_arguments->>'p_rule_version')::text,
        p_answers => (p_arguments->'p_answers')::jsonb,
        p_route_snapshot => (p_arguments->'p_route_snapshot')::jsonb,
        p_contact_channel => (p_arguments->>'p_contact_channel')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_contact_phone_e164 => (p_arguments->>'p_contact_phone_e164')::text,
        p_departure_country => (p_arguments->>'p_departure_country')::text,
        p_rough_budget_per_person => (p_arguments->>'p_rough_budget_per_person')::text,
        p_note => (p_arguments->>'p_note')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_attribution => (p_arguments->'p_attribution')::jsonb,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz,
        p_traffic_session_hash => (p_arguments->>'p_traffic_session_hash')::text
      );
    when 'create_homeground_inquiry_with_traffic_v1' then
      if p_arguments - array['p_schema_version','p_form_version','p_locale','p_journey_id','p_journey_revision','p_route_id','p_rule_version','p_answers','p_route_snapshot','p_contact_channel','p_contact_email','p_contact_phone_e164','p_note','p_privacy_notice_version','p_landing_path','p_attribution','p_idempotency_key_hash','p_payload_hash','p_rate_limit_subject_hash','p_short_rate_limit','p_daily_rate_limit','p_first_response_due_at','p_traffic_session_hash'] <> '{}'::jsonb then
        raise exception using errcode='22023',message='invalid intake arguments';
      end if;
      result := public.create_homeground_inquiry_with_traffic_v1(
        p_schema_version => (p_arguments->>'p_schema_version')::smallint,
        p_form_version => (p_arguments->>'p_form_version')::text,
        p_locale => (p_arguments->>'p_locale')::text,
        p_journey_id => (p_arguments->>'p_journey_id')::uuid,
        p_journey_revision => (p_arguments->>'p_journey_revision')::integer,
        p_route_id => (p_arguments->>'p_route_id')::text,
        p_rule_version => (p_arguments->>'p_rule_version')::text,
        p_answers => (p_arguments->'p_answers')::jsonb,
        p_route_snapshot => (p_arguments->'p_route_snapshot')::jsonb,
        p_contact_channel => (p_arguments->>'p_contact_channel')::text,
        p_contact_email => (p_arguments->>'p_contact_email')::text,
        p_contact_phone_e164 => (p_arguments->>'p_contact_phone_e164')::text,
        p_note => (p_arguments->>'p_note')::text,
        p_privacy_notice_version => (p_arguments->>'p_privacy_notice_version')::text,
        p_landing_path => (p_arguments->>'p_landing_path')::text,
        p_attribution => (p_arguments->'p_attribution')::jsonb,
        p_idempotency_key_hash => (p_arguments->>'p_idempotency_key_hash')::text,
        p_payload_hash => (p_arguments->>'p_payload_hash')::text,
        p_rate_limit_subject_hash => (p_arguments->>'p_rate_limit_subject_hash')::text,
        p_short_rate_limit => (p_arguments->>'p_short_rate_limit')::integer,
        p_daily_rate_limit => (p_arguments->>'p_daily_rate_limit')::integer,
        p_first_response_due_at => (p_arguments->>'p_first_response_due_at')::timestamptz,
        p_traffic_session_hash => (p_arguments->>'p_traffic_session_hash')::text
      );
    else raise exception using errcode='22023',message='unsupported intake RPC';
  end case;
  return result;
end;
$$;

-- Legacy Edge bundles may still call preparation while the new bundle rolls out.
-- Keep their inquiry write available, but never let the retired preflight allocate
-- new rows. Existing in-flight intents remain readable by the insert trigger.
create or replace function public.prepare_homeground_traveller_ack_v1(
  p_idempotency_key_hash text,p_payload_hash text,p_enabled boolean,p_recipient_hash text,p_privacy_notice_version text
) returns boolean language sql stable security definer set search_path=pg_catalog,homeground_private as $$
  select exists(select 1 from homeground_private.traveller_ack_intents where idempotency_key_hash=p_idempotency_key_hash)
    or exists(select 1 from homeground_private.inquiries where idempotency_key_hash=p_idempotency_key_hash);
$$;

create or replace function homeground_private.enroll_traveller_ack_v1()
returns trigger language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare saved homeground_private.inquiries; intent homeground_private.traveller_ack_intents; atomic_intent jsonb; receipt_status text := 'disabled'; reason text;
begin
  -- The destination v4 wrapper inserts via v3 and updates the privacy version
  -- later in the same transaction. A deferred trigger reads the final row.
  select * into saved from homeground_private.inquiries where inquiry_id = new.inquiry_id;
  if not found then return new; end if;
  atomic_intent := coalesce(nullif(current_setting('homeground.traveller_ack_intents',true),''),'{}')::jsonb -> saved.idempotency_key_hash;
  if atomic_intent is not null then
    intent := jsonb_populate_record(null::homeground_private.traveller_ack_intents, atomic_intent);
  else
    -- Only already-prepared legacy intents survive a migration-first rollout.
    select * into intent from homeground_private.traveller_ack_intents where idempotency_key_hash = saved.idempotency_key_hash;
  end if;
  if saved.contact_channel = 'email' and saved.contact_email is not null and intent.enabled is true
    and intent.recipient_hash is not null and intent.privacy_notice_version = '2026-09-28.1'
    and saved.privacy_notice_version = '2026-09-28.1' and intent.payload_hash = saved.payload_hash then
    -- Serializes concurrent submissions to the same address across different keys.
    perform pg_advisory_xact_lock(hashtextextended(intent.recipient_hash, 28092026));
    select s.reason into reason from homeground_private.traveller_ack_suppressions s where s.recipient_hash = intent.recipient_hash;
    if reason is not null then
      receipt_status := 'suppressed';
    elsif exists (select 1 from homeground_private.traveller_ack_outbox o
      where o.recipient_hash = intent.recipient_hash and o.created_at > now() - interval '24 hours'
        and o.status in ('pending', 'processing', 'accepted', 'failed')) then
      receipt_status := 'suppressed'; reason := 'address_24h_limit';
    else
      receipt_status := 'pending';
    end if;
  else
    reason := case when intent.idempotency_key_hash is null then 'intent_unavailable'
      when saved.contact_channel <> 'email' then 'no_email'
      when saved.privacy_notice_version <> '2026-09-28.1' or intent.privacy_notice_version <> '2026-09-28.1' then 'legacy_disclosure'
      when intent.payload_hash is distinct from saved.payload_hash then 'intent_mismatch' else 'feature_disabled' end;
  end if;
  insert into homeground_private.traveller_ack_outbox(inquiry_id, recipient_hash, status, suppression_reason)
    values(saved.inquiry_id, intent.recipient_hash, receipt_status, reason);
  return new;
end;
$$;

revoke all on function public.create_homeground_inquiry_with_receipt_v1(text,jsonb,boolean,text) from public,anon,authenticated;
grant execute on function public.create_homeground_inquiry_with_receipt_v1(text,jsonb,boolean,text) to service_role;

-- A durable timestamp bounds EVERY uncertain provider retry, including original
-- (revision-zero) messages. Never-attempted backlog retains its 72-hour SLA.
alter table homeground_private.notification_outbox add column first_provider_attempt_at timestamptz;
-- Old jobs have no precise first-attempt time. The creation time is a conservative
-- lower bound; do not extend a possibly expired provider idempotency window.
update homeground_private.notification_outbox set first_provider_attempt_at=created_at
  where attempt_count>0 or message_json is not null;

create or replace function public.freeze_homeground_notification_message_v1(
  p_job_id uuid,p_lease_token uuid,p_row_version bigint,p_message jsonb
) returns jsonb language plpgsql security definer set search_path=pg_catalog,homeground_private as $$
declare frozen jsonb;
begin
  if p_message is null or jsonb_typeof(p_message)<>'object' or octet_length(p_message::text)>131072 then
    raise exception using errcode='22023',message='invalid notification message';
  end if;
  update homeground_private.notification_outbox set message_json=coalesce(message_json,p_message),
    first_provider_attempt_at=coalesce(first_provider_attempt_at,now())
    where job_id=p_job_id and lease_token=p_lease_token and row_version=p_row_version
      and status='processing' and lease_until>now()
      and (first_provider_attempt_at is null or first_provider_attempt_at>now()-interval '23 hours')
    returning message_json into frozen;
  return frozen;
end;
$$;

create or replace function public.claim_homeground_notification_jobs_v4(p_worker_id text,p_job_limit integer default 1,p_lease_seconds integer default 90)
returns table(job_id uuid,inquiry_id uuid,public_reference text,locale text,route_id text,answers jsonb,route_snapshot jsonb,
  reply_channel text,contact_email text,contact_phone_e164 text,departure_country text,rough_budget_per_person text,note text,
  inquiry_created_at timestamptz,first_response_due_at timestamptz,lease_token uuid,row_version bigint,attempt_count integer,
  contact_revision integer,current_contact_revision integer,previous_contact_email text)
language plpgsql security definer set search_path=pg_catalog,homeground_private as $$
begin
  if p_worker_id is null or length(p_worker_id) not between 1 and 100 or p_job_limit not between 1 and 50 or p_lease_seconds not between 15 and 300 then
    raise exception using errcode='22023',message='invalid notification worker';
  end if;
  -- Preserve the deployed absolute 72-hour deadline for every original job.
  update homeground_private.notification_outbox o set status='failed',lease_until=null,leased_by=null,lease_token=null,
    last_error_code='retry_deadline_exceeded',row_version=o.row_version+1,updated_at=now()
    where o.status in ('pending','processing') and o.retry_deadline_at<=now();
  -- Correction envelopes retain their stricter creation-time deadline in
  -- addition to the provider first-attempt guard applied to every message.
  update homeground_private.notification_outbox o set status='failed',lease_until=null,leased_by=null,lease_token=null,last_error_code='correction_notice_expired',
    row_version=o.row_version+1,updated_at=now()
    where o.contact_revision>0 and o.status in ('pending','processing') and o.created_at<now()-interval '23 hours'
      and (o.lease_until is null or o.lease_until<now());
  -- Failed/ambiguous send attempts are not safe to resend after provider dedupe expires.
  update homeground_private.notification_outbox o set status='failed',lease_until=null,leased_by=null,lease_token=null,
    last_error_code='provider_retry_window_expired',row_version=o.row_version+1,updated_at=now()
    where o.status in ('pending','processing') and o.first_provider_attempt_at<=now()-interval '23 hours'
      and (o.lease_until is null or o.lease_until<=now());
  return query with candidates as (
    select o.job_id from homeground_private.notification_outbox o
    where o.retry_deadline_at>now() and (o.first_provider_attempt_at is null or o.first_provider_attempt_at>now()-interval '23 hours') and ((o.status='pending' and o.next_attempt_at<=now()) or (o.status='processing' and o.lease_until<=now()))
    order by o.created_at for update skip locked limit p_job_limit
  ), claimed as (
    update homeground_private.notification_outbox o set status='processing',attempt_count=o.attempt_count+1,
      lease_until=now()+make_interval(secs=>p_lease_seconds),leased_by=p_worker_id,lease_token=gen_random_uuid(),
      row_version=o.row_version+1,updated_at=now()
    from candidates c where o.job_id=c.job_id returning o.*
  ) select o.job_id,i.inquiry_id,i.public_reference,i.locale,i.route_id,i.answers_json,i.route_snapshot_json,
    i.contact_channel,o.contact_email_snapshot,i.contact_phone_e164,i.departure_country,i.rough_budget_per_person,i.note,
    i.created_at,i.first_response_due_at,o.lease_token,o.row_version,o.attempt_count,o.contact_revision,i.contact_revision,o.previous_contact_email
    from claimed o join homeground_private.inquiries i using(inquiry_id);
end;
$$;

create or replace function
  homeground_private.retry_failed_notification_jobs()
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
    where status = 'failed'
      and retry_deadline_at > now()
      and (first_provider_attempt_at is null or first_provider_attempt_at>now()-interval '23 hours');

  get diagnostics retried_count = row_count;
  return retried_count;
end;
$$;

create or replace function public.get_homeground_traveller_ack_health_v1()
returns table(pending_count bigint,failed_count bigint,bounced_count bigint,complained_count bigint,overdue_count bigint,intent_capacity_reached boolean)
language sql stable security definer set search_path = pg_catalog, homeground_private as $$
  select count(*) filter(where status in ('pending','processing')),
    count(*) filter(where status='failed' and issue_resolved_at is null),
    count(*) filter(where delivery_status='bounced' and issue_resolved_at is null),
    count(*) filter(where delivery_status='complained' and issue_resolved_at is null),
    count(*) filter(where (status='pending' and next_attempt_at<now()-interval '5 minutes') or (status='processing' and lease_until<now()-interval '5 minutes')),
    false -- Legacy intent capacity no longer gates atomic enrollment.
  from homeground_private.traveller_ack_outbox;
$$;

commit;
