begin;

-- Raw ad identifiers remain private and are never included in public receipts,
-- email notifications, aggregate analytics, or administrator lookup responses.
create table homeground_private.inquiry_ad_attribution (
  inquiry_id uuid primary key references homeground_private.inquiries(inquiry_id) on delete cascade,
  click_id_type text not null check(click_id_type in ('gclid','gbraid','wbraid')),
  click_id text not null check(length(click_id) between 1 and 512 and click_id ~ '^[A-Za-z0-9_-]+$'),
  captured_at timestamptz not null,
  landing_path text not null check(length(landing_path)<=300 and landing_path ~ '^/[A-Za-z0-9/_-]*$'),
  consent_version text not null check(consent_version='2026-10-13.1'),
  revocation_token_hash text not null check(revocation_token_hash ~ '^[a-f0-9]{64}$'),
  consent_updated_at timestamptz not null check(consent_updated_at<=captured_at),
  created_at timestamptz not null default clock_timestamp()
);
create index inquiry_ad_attribution_revocation on homeground_private.inquiry_ad_attribution(revocation_token_hash);
create table homeground_private.ad_attribution_withdrawals (
  token_hash text primary key check(token_hash ~ '^[a-f0-9]{64}$'),
  expires_at timestamptz not null default clock_timestamp()+interval '90 days'
);
alter table homeground_private.ad_attribution_withdrawals enable row level security;
alter table homeground_private.ad_attribution_withdrawals force row level security;
revoke all on homeground_private.ad_attribution_withdrawals from public,anon,authenticated,service_role;
create table homeground_private.inquiry_ad_conversion_events (
  event_id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references homeground_private.inquiries(inquiry_id) on delete cascade,
  event_kind text not null check(event_kind in ('inquiry_received','payment_received')),
  occurred_at timestamptz not null,
  amount numeric(14,2),
  currency text check(currency in ('USD','AUD','CAD','CNY','KRW','JPY','EUR','GBP','HKD','SGD')),
  recorded_by uuid,
  status text not null default 'pending' check(status in ('pending','processing','submitted','accepted','failed','blocked')),
  last_error_code text check(last_error_code ~ '^[a-z0-9_]{1,80}$'),
  provider_request_id text check(length(provider_request_id)<=255),
  destination_account_id text check(destination_account_id ~ '^[0-9]{10}$'),
  destination_action_id text check(destination_action_id ~ '^[0-9]{1,20}$'),
  next_attempt_at timestamptz not null default clock_timestamp(),
  attempt_count integer not null default 0 check(attempt_count>=0),
  lease_token uuid,
  lease_until timestamptz,
  submitted_at timestamptz,
  accepted_at timestamptz,
  created_at timestamptz not null default clock_timestamp(),
  updated_at timestamptz not null default clock_timestamp(),
  unique(inquiry_id,event_kind),
  check((event_kind='inquiry_received' and amount is null and currency is null and recorded_by is null)
    or (event_kind='payment_received' and amount>0 and currency is not null and recorded_by is not null)),
  check(currency not in ('JPY','KRW') or amount=trunc(amount)),
  check((status='processing' and lease_token is not null and lease_until is not null) or status<>'processing')
);
create index inquiry_ad_conversion_queue on homeground_private.inquiry_ad_conversion_events(status,created_at);
create table homeground_private.inquiry_conversion_admin_audit (
  audit_id uuid primary key default gen_random_uuid(), admin_user_id uuid not null,
  inquiry_id uuid references homeground_private.inquiries(inquiry_id) on delete cascade,
  action text not null check(action in ('lookup','record_payment')),
  occurred_at timestamptz not null default clock_timestamp()
);
alter table homeground_private.inquiry_ad_attribution enable row level security;
alter table homeground_private.inquiry_ad_attribution force row level security;
alter table homeground_private.inquiry_ad_conversion_events enable row level security;
alter table homeground_private.inquiry_ad_conversion_events force row level security;
alter table homeground_private.inquiry_conversion_admin_audit enable row level security;
alter table homeground_private.inquiry_conversion_admin_audit force row level security;
revoke all on homeground_private.inquiry_ad_attribution,homeground_private.inquiry_ad_conversion_events,homeground_private.inquiry_conversion_admin_audit from public,anon,authenticated,service_role;

create function public.create_homeground_inquiry_with_ads_v1(
  p_rpc_name text,p_arguments jsonb,p_ack_enabled boolean,p_ack_recipient_hash text,p_ad_attribution jsonb
) returns jsonb language plpgsql security definer
set search_path=pg_catalog,public,homeground_private as $$
declare result jsonb; created_id uuid; received_at timestamptz; captured_at timestamptz; consent_at timestamptz; requested_token_hash text;
begin
  result:=public.create_homeground_inquiry_with_receipt_v1(p_rpc_name,p_arguments,p_ack_enabled,p_ack_recipient_hash);
  -- Attribution is fixed at creation. A retry cannot introduce or replace it.
  if result->>'outcome'<>'created' then return result; end if;
  begin
    if p_ad_attribution is null or jsonb_typeof(p_ad_attribution)<>'object' or
      p_ad_attribution-array['version','clickIdType','clickId','capturedAt','landingPath','consent','consentVersion','consentUpdatedAt','revocationToken']<>'{}'::jsonb or
      p_ad_attribution->>'version' is distinct from 'homeground-ad-attribution.v1' or
      p_ad_attribution->>'consent' is distinct from 'granted' or
      p_ad_attribution->>'consentVersion' is distinct from '2026-10-13.1' or
      not coalesce(p_ad_attribution->>'revocationToken' ~ '^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$',false) or
      not coalesce(p_ad_attribution->>'clickIdType' in ('gclid','gbraid','wbraid'),false) or
      not coalesce(length(p_ad_attribution->>'clickId') between 1 and 512 and p_ad_attribution->>'clickId' ~ '^[A-Za-z0-9_-]+$',false) or
      not coalesce(length(p_ad_attribution->>'landingPath')<=300 and p_ad_attribution->>'landingPath' ~ '^/[A-Za-z0-9/_-]*$',false) then
      return result||jsonb_build_object('adAttributionOutcome','invalid');
    end if;
    captured_at:=(p_ad_attribution->>'capturedAt')::timestamptz;
    consent_at:=(p_ad_attribution->>'consentUpdatedAt')::timestamptz;
    if captured_at is null or consent_at is null or captured_at<clock_timestamp()-interval '90 days' or
      captured_at>clock_timestamp()+interval '5 minutes' or consent_at>captured_at then
      return result||jsonb_build_object('adAttributionOutcome','invalid');
    end if;
    created_id:=(result->>'inquiryId')::uuid;
    received_at:=(result->>'receivedAt')::timestamptz;
    requested_token_hash:=encode(extensions.digest(p_ad_attribution->>'revocationToken','sha256'),'hex');
    perform pg_advisory_xact_lock(hashtextextended(requested_token_hash,731013));
    if exists(select 1 from homeground_private.ad_attribution_withdrawals w where w.token_hash=requested_token_hash and w.expires_at>clock_timestamp()) then
      return result||jsonb_build_object('adAttributionOutcome','withdrawn');
    end if;
    insert into homeground_private.inquiry_ad_attribution(inquiry_id,click_id_type,click_id,captured_at,landing_path,consent_version,consent_updated_at,revocation_token_hash)
      values(created_id,p_ad_attribution->>'clickIdType',p_ad_attribution->>'clickId',captured_at,p_ad_attribution->>'landingPath',p_ad_attribution->>'consentVersion',consent_at,
        requested_token_hash);
    insert into homeground_private.inquiry_ad_conversion_events(inquiry_id,event_kind,occurred_at)
      values(created_id,'inquiry_received',received_at);
    return result||jsonb_build_object('adAttributionOutcome','saved');
  exception when others then
    -- An auxiliary attribution failure never discards the traveller's inquiry.
    -- This subtransaction rolls back both attribution and its conversion event.
    return result||jsonb_build_object('adAttributionOutcome','unavailable');
  end;
end;
$$;

create function public.withdraw_homeground_ad_attribution_v1(p_token_hash text,p_rate_limit_subject_hash text)
returns boolean language plpgsql security definer set search_path=pg_catalog,homeground_private as $$
declare limits jsonb;
begin
  if p_token_hash is null or p_token_hash !~ '^[a-f0-9]{64}$' or p_rate_limit_subject_hash is null or p_rate_limit_subject_hash !~ '^[a-f0-9]{64}$' then return false; end if;
  limits:=homeground_private.consume_inquiry_rate_limit(p_rate_limit_subject_hash,30,100);
  if not coalesce((limits->>'allowed')::boolean,false) then return false; end if;
  perform pg_advisory_xact_lock(hashtextextended(p_token_hash,731013));
  insert into homeground_private.ad_attribution_withdrawals(token_hash) values(p_token_hash)
    on conflict(token_hash) do update set expires_at=clock_timestamp()+interval '90 days';
  update homeground_private.inquiry_ad_conversion_events e set status='blocked',last_error_code='consent_withdrawn',lease_token=null,lease_until=null,updated_at=clock_timestamp()
    from homeground_private.inquiry_ad_attribution a where e.inquiry_id=a.inquiry_id and a.revocation_token_hash=p_token_hash and e.status in ('pending','processing','failed','blocked');
  delete from homeground_private.inquiry_ad_attribution where revocation_token_hash=p_token_hash;
  return true;
end;
$$;

create function public.prune_homeground_ad_attribution_v1()
returns integer language plpgsql security definer set search_path=pg_catalog,homeground_private as $$
declare deleted_count integer;
begin
  update homeground_private.inquiry_ad_conversion_events e set status='blocked',last_error_code='click_expired',lease_token=null,lease_until=null,updated_at=clock_timestamp()
    from homeground_private.inquiry_ad_attribution a where e.inquiry_id=a.inquiry_id and a.captured_at<clock_timestamp()-interval '90 days' and e.status in ('pending','processing','failed');
  delete from homeground_private.inquiry_ad_attribution where captured_at<clock_timestamp()-interval '90 days';
  get diagnostics deleted_count=row_count;
  delete from homeground_private.ad_attribution_withdrawals where expires_at<=clock_timestamp();
  delete from homeground_private.inquiry_conversion_admin_audit where occurred_at<clock_timestamp()-interval '90 days';
  return deleted_count;
end;
$$;

create function public.can_send_homeground_ad_conversion_v1(p_event_id uuid,p_lease_token uuid)
returns boolean language sql security definer set search_path=pg_catalog,homeground_private as $$
  select exists(select 1 from homeground_private.inquiry_ad_conversion_events e join homeground_private.inquiry_ad_attribution a using(inquiry_id)
    where e.event_id=p_event_id and e.lease_token=p_lease_token and e.status='processing' and e.lease_until>clock_timestamp()
      and a.captured_at>=clock_timestamp()-interval '90 days'
      and not exists(select 1 from homeground_private.inquiry_test_markers t where t.inquiry_id=e.inquiry_id));
$$;

create function homeground_private.inquiry_conversion_snapshot_v1(p_inquiry_id uuid)
returns jsonb language sql stable security definer set search_path=pg_catalog,homeground_private as $$
  select jsonb_build_object('contractVersion','homeground-admin-conversions.v1','inquiry',
    jsonb_build_object('publicReference',i.public_reference,'receivedAt',i.created_at,
      'attribution',case when a.inquiry_id is null then null else jsonb_build_object('clickIdType',a.click_id_type,'capturedAt',a.captured_at) end,
      'events',coalesce((select jsonb_agg(jsonb_build_object('id',e.event_id,'kind',e.event_kind,'occurredAt',e.occurred_at,
        'amount',e.amount,'currency',e.currency,'status',e.status,'errorCode',e.last_error_code,
        'submittedAt',e.submitted_at,'acceptedAt',e.accepted_at) order by e.created_at)
        from homeground_private.inquiry_ad_conversion_events e where e.inquiry_id=i.inquiry_id),'[]'::jsonb)))
  from homeground_private.non_test_inquiries i left join homeground_private.inquiry_ad_attribution a using(inquiry_id)
  where i.inquiry_id=p_inquiry_id;
$$;

create function public.manage_homeground_inquiry_conversion_v1(
  p_admin_user_id uuid,p_action text,p_public_reference text,
  p_amount numeric default null,p_currency text default null,p_occurred_at timestamptz default null
) returns jsonb language plpgsql security definer set search_path=pg_catalog,homeground_private as $$
declare candidate homeground_private.inquiries%rowtype; prior homeground_private.inquiry_ad_conversion_events%rowtype; initial_status text; error_code text;
begin
  if p_admin_user_id is null or p_action not in ('lookup','record_payment') or
    p_public_reference is null or p_public_reference !~ '^HG-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$' then
    return jsonb_build_object('error','invalid_request');
  end if;
  select * into candidate from homeground_private.inquiries where public_reference=p_public_reference for update;
  if not found or exists(select 1 from homeground_private.inquiry_test_markers where inquiry_id=candidate.inquiry_id) then
    return jsonb_build_object('error','not_found');
  end if;
  if p_action='record_payment' then
    if p_amount is null or p_amount<=0 or p_amount>=1000000000000 or p_amount<>round(p_amount,2) or
      p_currency is null or p_currency not in ('USD','AUD','CAD','CNY','KRW','JPY','EUR','GBP','HKD','SGD') or
      (p_currency in ('JPY','KRW') and p_amount<>trunc(p_amount)) or p_occurred_at is null or
      p_occurred_at<candidate.created_at or p_occurred_at>clock_timestamp()+interval '5 minutes' then
      return jsonb_build_object('error','invalid_payment');
    end if;
    select * into prior from homeground_private.inquiry_ad_conversion_events where inquiry_id=candidate.inquiry_id and event_kind='payment_received';
    if found then
      if prior.amount<>p_amount or prior.currency<>p_currency or prior.occurred_at<>p_occurred_at then
        return jsonb_build_object('error','payment_already_recorded');
      end if;
    else
      initial_status:='pending'; error_code:=null;
      if not exists(select 1 from homeground_private.inquiry_ad_attribution where inquiry_id=candidate.inquiry_id) then
        initial_status:='blocked'; error_code:='missing_ad_attribution';
      end if;
      insert into homeground_private.inquiry_ad_conversion_events(inquiry_id,event_kind,occurred_at,amount,currency,recorded_by,status,last_error_code)
        values(candidate.inquiry_id,'payment_received',p_occurred_at,p_amount,p_currency,p_admin_user_id,initial_status,error_code);
    end if;
  end if;
  insert into homeground_private.inquiry_conversion_admin_audit(admin_user_id,inquiry_id,action) values(p_admin_user_id,candidate.inquiry_id,p_action);
  delete from homeground_private.inquiry_conversion_admin_audit where occurred_at<clock_timestamp()-interval '90 days';
  return homeground_private.inquiry_conversion_snapshot_v1(candidate.inquiry_id);
end;
$$;

create function public.claim_homeground_ad_conversions_v1(p_account_id text,p_inquiry_action_id text,p_payment_action_id text,p_limit integer default 10)
returns jsonb language plpgsql security definer set search_path=pg_catalog,homeground_private as $$
declare records jsonb;
begin
  if p_limit is null or p_limit<1 or p_limit>25 or not coalesce(p_account_id ~ '^[0-9]{10}$',false) or
    not coalesce(p_inquiry_action_id ~ '^[0-9]{1,20}$',false) or not coalesce(p_payment_action_id ~ '^[0-9]{1,20}$',false) or
    p_inquiry_action_id=p_payment_action_id then raise exception 'invalid conversion batch'; end if;
  perform public.prune_homeground_ad_attribution_v1();
  update homeground_private.inquiry_ad_conversion_events set status='failed',last_error_code='attempts_exhausted',lease_token=null,lease_until=null,updated_at=clock_timestamp()
    where attempt_count>=5 and (status='pending' or (status='processing' and lease_until<clock_timestamp()));
  update homeground_private.inquiry_ad_conversion_events e set status='blocked',last_error_code='click_expired',lease_token=null,lease_until=null,updated_at=clock_timestamp()
    from homeground_private.inquiry_ad_attribution a where e.inquiry_id=a.inquiry_id and e.status in ('pending','processing') and a.captured_at<clock_timestamp()-interval '90 days';
  update homeground_private.inquiry_ad_conversion_events e set status='blocked',last_error_code='verified_test',lease_token=null,lease_until=null,updated_at=clock_timestamp()
    where e.status in ('pending','processing') and exists(select 1 from homeground_private.inquiry_test_markers t where t.inquiry_id=e.inquiry_id);
  with candidates as (
    select e.event_id from homeground_private.inquiry_ad_conversion_events e
    join homeground_private.inquiry_ad_attribution a using(inquiry_id)
    where ((e.status='pending' and e.next_attempt_at<=clock_timestamp()) or (e.status='processing' and e.lease_until<clock_timestamp())) and e.attempt_count<5
      and not exists(select 1 from homeground_private.inquiry_test_markers t where t.inquiry_id=e.inquiry_id)
    order by e.created_at limit p_limit for update of e skip locked
  ), claimed as (
    update homeground_private.inquiry_ad_conversion_events e set status='processing',lease_token=gen_random_uuid(),lease_until=clock_timestamp()+interval '5 minutes',
      attempt_count=attempt_count+1,updated_at=clock_timestamp(),destination_account_id=coalesce(e.destination_account_id,p_account_id),
      destination_action_id=coalesce(e.destination_action_id,case when e.event_kind='inquiry_received' then p_inquiry_action_id else p_payment_action_id end)
      from candidates c where e.event_id=c.event_id returning e.*
  ) select coalesce(jsonb_agg(jsonb_build_object('eventId',e.event_id,'kind',e.event_kind,'occurredAt',e.occurred_at,'amount',e.amount,'currency',e.currency,
    'leaseToken',e.lease_token,'clickIdType',a.click_id_type,'clickId',a.click_id,'consent','granted',
    'accountId',e.destination_account_id,'actionId',e.destination_action_id)),'[]'::jsonb)
    into records from claimed e join homeground_private.inquiry_ad_attribution a using(inquiry_id);
  return records;
end;
$$;

create function public.finish_homeground_ad_conversion_v1(p_event_id uuid,p_lease_token uuid,p_status text,p_request_id text default null,p_error_code text default null)
returns boolean language plpgsql security definer set search_path=pg_catalog,homeground_private as $$
declare updated_id uuid;
begin
  if p_status is null or p_status not in ('pending','submitted','failed','blocked') or
    (p_status='submitted' and (p_request_id is null or length(p_request_id)<1 or length(p_request_id)>255)) or
    (p_error_code is not null and p_error_code !~ '^[a-z0-9_]{1,80}$') then return false; end if;
  update homeground_private.inquiry_ad_conversion_events set status=p_status,provider_request_id=p_request_id,last_error_code=p_error_code,
    next_attempt_at=case when p_status='pending' then clock_timestamp()+interval '15 minutes' else next_attempt_at end,
    attempt_count=case when p_error_code='validation_only' then greatest(attempt_count-1,0) else attempt_count end,
    submitted_at=case when p_status='submitted' then clock_timestamp() else submitted_at end,
    lease_token=null,lease_until=null,updated_at=clock_timestamp()
    where event_id=p_event_id and status='processing' and lease_token=p_lease_token returning event_id into updated_id;
  return updated_id is not null;
end;
$$;

create function public.get_homeground_submitted_ad_conversions_v1()
returns jsonb language sql security definer set search_path=pg_catalog,homeground_private as $$
  select coalesce(jsonb_agg(jsonb_build_object('eventId',event_id,'requestId',provider_request_id,'accountId',destination_account_id,'actionId',destination_action_id)),'[]'::jsonb)
    from (select event_id,provider_request_id,destination_account_id,destination_action_id from homeground_private.inquiry_ad_conversion_events where status='submitted' order by submitted_at limit 25) e;
$$;
create function public.resolve_homeground_ad_conversion_v1(p_event_id uuid,p_request_id text,p_accepted boolean,p_error_code text default null)
returns boolean language plpgsql security definer set search_path=pg_catalog,homeground_private as $$
declare updated_id uuid;
begin
  if p_accepted is null or (not p_accepted and (p_error_code is null or p_error_code !~ '^[a-z0-9_]{1,80}$')) then return false; end if;
  update homeground_private.inquiry_ad_conversion_events set status=case when p_accepted then 'accepted' else 'failed' end,
    accepted_at=case when p_accepted then clock_timestamp() else null end,last_error_code=case when p_accepted then null else p_error_code end,updated_at=clock_timestamp()
    where event_id=p_event_id and status='submitted' and provider_request_id=p_request_id returning event_id into updated_id;
  return updated_id is not null;
end;
$$;

revoke all on function homeground_private.inquiry_conversion_snapshot_v1(uuid) from public,anon,authenticated,service_role;
revoke all on function public.create_homeground_inquiry_with_ads_v1(text,jsonb,boolean,text,jsonb),public.manage_homeground_inquiry_conversion_v1(uuid,text,text,numeric,text,timestamptz),public.claim_homeground_ad_conversions_v1(text,text,text,integer),public.finish_homeground_ad_conversion_v1(uuid,uuid,text,text,text),public.get_homeground_submitted_ad_conversions_v1(),public.resolve_homeground_ad_conversion_v1(uuid,text,boolean,text) from public,anon,authenticated;
grant execute on function public.create_homeground_inquiry_with_ads_v1(text,jsonb,boolean,text,jsonb),public.manage_homeground_inquiry_conversion_v1(uuid,text,text,numeric,text,timestamptz),public.claim_homeground_ad_conversions_v1(text,text,text,integer),public.finish_homeground_ad_conversion_v1(uuid,uuid,text,text,text),public.get_homeground_submitted_ad_conversions_v1(),public.resolve_homeground_ad_conversion_v1(uuid,text,boolean,text) to service_role;
revoke all on function public.withdraw_homeground_ad_attribution_v1(text,text),public.prune_homeground_ad_attribution_v1(),public.can_send_homeground_ad_conversion_v1(uuid,uuid) from public,anon,authenticated;
grant execute on function public.withdraw_homeground_ad_attribution_v1(text,text),public.prune_homeground_ad_attribution_v1(),public.can_send_homeground_ad_conversion_v1(uuid,uuid) to service_role;

do $ad_retention_schedule$
begin
  if exists(select 1 from pg_extension where extname='pg_cron') then
    perform cron.schedule('homeground-ad-attribution-retention','25 3 * * *','select public.prune_homeground_ad_attribution_v1();');
  end if;
end;
$ad_retention_schedule$;

comment on table homeground_private.inquiry_ad_conversion_events is 'One enquiry and one first actual payment event per enquiry. Submitted and API-accepted are separate from Google attribution/reporting; amount is first received funds, never total quoted trip value. Existing inquiry retention cascades apply.';
commit;
