begin;

-- A receipt is auxiliary to the saved inquiry. Intent is prepared before intake;
-- the insert trigger enrolls the receipt in the SAME transaction as the inquiry.
-- Missing/off intent and legacy disclosures never become sendable on a later rollout.
create table homeground_private.traveller_ack_intents (
  idempotency_key_hash text primary key check (idempotency_key_hash ~ '^[a-f0-9]{64}$'),
  payload_hash text not null check (payload_hash ~ '^[a-f0-9]{64}$'),
  enabled boolean not null,
  privacy_notice_version text not null,
  recipient_hash text check (recipient_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now()
);
create table homeground_private.traveller_ack_outbox (
  job_id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null unique references homeground_private.inquiries(inquiry_id) on delete cascade,
  recipient_hash text check (recipient_hash ~ '^[a-f0-9]{64}$'),
  status text not null check (status in ('disabled', 'pending', 'processing', 'accepted', 'suppressed', 'failed')),
  suppression_reason text,
  attempt_count integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  first_attempt_at timestamptz,
  lease_until timestamptz,
  lease_token uuid,
  row_version bigint not null default 0,
  provider_message_id text unique,
  message_json jsonb,
  delivery_status text check (delivery_status in ('sent', 'delivered', 'delayed', 'bounced', 'complained', 'failed', 'suppressed')),
  last_error_code text,
  issue_resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index traveller_ack_recipient_recent on homeground_private.traveller_ack_outbox(recipient_hash, created_at desc);
create index traveller_ack_pending on homeground_private.traveller_ack_outbox(next_attempt_at) where status in ('pending', 'processing');
create table homeground_private.traveller_ack_suppressions (
  recipient_hash text primary key check (recipient_hash ~ '^[a-f0-9]{64}$'),
  reason text not null check (reason in ('bounced', 'complained', 'suppressed', 'not_me')),
  created_at timestamptz not null default now()
);
create table homeground_private.traveller_ack_events (
  event_id text primary key,
  job_id uuid not null references homeground_private.traveller_ack_outbox(job_id) on delete cascade,
  event_type text not null,
  created_at timestamptz not null default now()
);
alter table homeground_private.traveller_ack_intents enable row level security;
alter table homeground_private.traveller_ack_intents force row level security;
alter table homeground_private.traveller_ack_outbox enable row level security;
alter table homeground_private.traveller_ack_outbox force row level security;
alter table homeground_private.traveller_ack_suppressions enable row level security;
alter table homeground_private.traveller_ack_suppressions force row level security;
alter table homeground_private.traveller_ack_events enable row level security;
alter table homeground_private.traveller_ack_events force row level security;
revoke all on homeground_private.traveller_ack_intents, homeground_private.traveller_ack_outbox,
  homeground_private.traveller_ack_suppressions, homeground_private.traveller_ack_events from public, anon, authenticated, service_role;

create function public.prepare_homeground_traveller_ack_v1(p_idempotency_key_hash text, p_payload_hash text, p_enabled boolean, p_recipient_hash text, p_privacy_notice_version text)
returns boolean language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
begin
  if p_idempotency_key_hash !~ '^[a-f0-9]{64}$' or p_payload_hash !~ '^[a-f0-9]{64}$' or p_enabled is null
    or (p_recipient_hash is not null and p_recipient_hash !~ '^[a-f0-9]{64}$') then
    raise exception using errcode = '22023', message = 'invalid receipt intent';
  end if;
  -- Preparation precedes the intake rate limiter. A caller rejected by that
  -- limiter must not be able to allocate unbounded auxiliary records simply by
  -- rotating request keys. Serialize only preparation and cap this short-lived
  -- table; an unavailable receipt never prevents the inquiry from being saved.
  perform pg_advisory_xact_lock(20260928, 3);
  if exists(select 1 from homeground_private.traveller_ack_intents where idempotency_key_hash=p_idempotency_key_hash)
    or exists(select 1 from homeground_private.inquiries where idempotency_key_hash=p_idempotency_key_hash) then
    return true;
  end if;
  if (select count(*) from (select 1 from homeground_private.traveller_ack_intents limit 5000) bounded_intents)>=5000 then
    return false;
  end if;
  -- Do not change the intent on a replay, even when the feature switch changed.
  insert into homeground_private.traveller_ack_intents(idempotency_key_hash, payload_hash, enabled, recipient_hash, privacy_notice_version)
    values (p_idempotency_key_hash, p_payload_hash, p_enabled and p_recipient_hash is not null and p_privacy_notice_version='2026-09-28.1', p_recipient_hash, p_privacy_notice_version)
    on conflict do nothing;
  return true;
end;
$$;

create function homeground_private.enroll_traveller_ack_v1()
returns trigger language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare saved homeground_private.inquiries; intent homeground_private.traveller_ack_intents; receipt_status text := 'disabled'; reason text;
begin
  -- The destination v4 wrapper inserts via v3 and updates the privacy version
  -- later in the same transaction. A deferred trigger reads the final row.
  select * into saved from homeground_private.inquiries where inquiry_id = new.inquiry_id;
  if not found then return new; end if;
  select * into intent from homeground_private.traveller_ack_intents where idempotency_key_hash = saved.idempotency_key_hash;
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
create constraint trigger enroll_homeground_traveller_ack after insert on homeground_private.inquiries
  deferrable initially deferred for each row execute function homeground_private.enroll_traveller_ack_v1();

create function public.get_homeground_traveller_ack_receipt_v1(p_inquiry_id uuid)
returns jsonb language sql stable security definer set search_path = pg_catalog, homeground_private as $$
  select jsonb_build_object('ackQueued', o.status in ('pending', 'processing', 'accepted'),
    'ackStatus', case when o.status in ('pending', 'processing', 'accepted') then 'queued'
      when o.status = 'suppressed' then 'suppressed'
      when o.status = 'disabled' and o.suppression_reason <> 'intent_unavailable' then 'disabled' else 'unavailable' end,
    'firstResponseDueAt', i.first_response_due_at)
  from homeground_private.inquiries i left join homeground_private.traveller_ack_outbox o using(inquiry_id)
  where i.inquiry_id = p_inquiry_id;
$$;

create function public.claim_homeground_traveller_ack_v1(p_worker_id text, p_job_limit integer default 1, p_lease_seconds integer default 90)
returns table(job_id uuid, inquiry_id uuid, public_reference text, locale text, entry_path text, requested_travelers integer,
  contact_email text, answers jsonb, first_response_due_at timestamptz, inquiry_created_at timestamptz,
  lease_token uuid, row_version bigint, attempt_count integer, first_attempt_at timestamptz)
language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
begin
  if length(p_worker_id) not between 1 and 100 or p_job_limit not between 1 and 10 or p_lease_seconds not between 60 and 300 then
    raise exception using errcode='22023', message='invalid receipt worker';
  end if;
  -- Provider idempotency expires after 24h. Never automatically re-send uncertain
  -- attempts beyond 23h, and do not send a stale queued receipt after a long pause.
  update homeground_private.traveller_ack_outbox o set status='failed', last_error_code='receipt_expired', updated_at=now(), row_version=o.row_version+1
    where o.status in ('pending','processing') and o.created_at < now()-interval '23 hours'
      and (o.lease_until is null or o.lease_until < now());
  update homeground_private.traveller_ack_outbox o set status='suppressed', suppression_reason=s.reason, updated_at=now(), row_version=o.row_version+1
    from homeground_private.traveller_ack_suppressions s where o.recipient_hash=s.recipient_hash
      and o.status in ('pending','processing') and (o.lease_until is null or o.lease_until < now());
  return query
    with candidates as (
      select o.job_id from homeground_private.traveller_ack_outbox o
      where (o.status='pending' and o.next_attempt_at <= now()) or (o.status='processing' and o.lease_until < now())
      order by o.created_at for update skip locked limit p_job_limit
    ), claimed as (
      update homeground_private.traveller_ack_outbox o set status='processing', attempt_count=o.attempt_count+1,
        first_attempt_at=coalesce(o.first_attempt_at,now()), lease_until=now()+make_interval(secs=>p_lease_seconds),
        lease_token=gen_random_uuid(), row_version=o.row_version+1, updated_at=now()
      from candidates c where o.job_id=c.job_id returning o.*
    ) select o.job_id,i.inquiry_id,i.public_reference,i.locale,i.entry_path,
      case when i.entry_path='private_tour_quote' and i.answers_json->'productInterest'->>'slug' in
        ('shanghai-suzhou-5-day-private-tour','shanghai-suzhou-hangzhou-6-day-private-tour')
        then substring(i.note from '^\[Requested group size: ([1-9][0-9]?) travellers\](\r?\n|$)')::integer else null end,
      i.contact_email,i.answers_json,
      i.first_response_due_at,i.created_at,o.lease_token,o.row_version,o.attempt_count,o.first_attempt_at
      from claimed o join homeground_private.inquiries i using(inquiry_id);
end;
$$;

create function public.finish_homeground_traveller_ack_v1(p_job_id uuid, p_lease_token uuid, p_row_version bigint,
  p_accepted boolean, p_terminal boolean, p_provider_message_id text, p_error_code text, p_next_attempt_at timestamptz)
returns boolean language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare affected integer;
begin
  if length(coalesce(p_error_code,''))>100 or length(coalesce(p_provider_message_id,''))>100 then
    raise exception using errcode='22023',message='invalid receipt result';
  end if;
  update homeground_private.traveller_ack_outbox set status=case when p_accepted then 'accepted' when p_terminal then 'failed' else 'pending' end,
    provider_message_id=coalesce(provider_message_id,p_provider_message_id),last_error_code=p_error_code,
    next_attempt_at=coalesce(p_next_attempt_at,now()),lease_until=null,lease_token=null,row_version=row_version+1,updated_at=now()
    where job_id=p_job_id and lease_token=p_lease_token and row_version=p_row_version and status='processing' and lease_until>now();
  get diagnostics affected=row_count;
  return affected=1;
end;
$$;

create function public.freeze_homeground_traveller_ack_message_v1(p_job_id uuid, p_lease_token uuid, p_row_version bigint, p_message jsonb)
returns jsonb language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare frozen jsonb;
begin
  if jsonb_typeof(p_message)<>'object' or octet_length(p_message::text)>32768 then
    raise exception using errcode='22023',message='invalid receipt message';
  end if;
  update homeground_private.traveller_ack_outbox o set message_json=coalesce(message_json,p_message)
    where job_id=p_job_id and lease_token=p_lease_token and row_version=p_row_version and status='processing' and lease_until>now()
      and not exists(select 1 from homeground_private.traveller_ack_suppressions s where s.recipient_hash=o.recipient_hash)
    returning message_json into frozen;
  return frozen;
end;
$$;

create function public.record_homeground_traveller_ack_event_v1(p_event_id text, p_provider_message_id text, p_job_id uuid, p_event_type text, p_reason text)
returns boolean language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare receipt homeground_private.traveller_ack_outbox; inserted integer; terminal boolean;
begin
  if length(p_event_id) not between 1 and 200 or length(p_provider_message_id) not between 1 and 100
    or p_event_type not in ('sent','delivered','delayed','bounced','complained','failed','suppressed')
    or length(coalesce(p_reason,''))>100 then raise exception using errcode='22023',message='invalid receipt event'; end if;
  select * into receipt from homeground_private.traveller_ack_outbox o
    where o.provider_message_id=p_provider_message_id or
      (o.job_id=p_job_id and o.attempt_count>0 and (o.provider_message_id is null or o.provider_message_id=p_provider_message_id))
    for update;
  if receipt.job_id is null then return false; end if;
  insert into homeground_private.traveller_ack_events(event_id,job_id,event_type) values(p_event_id,receipt.job_id,p_event_type) on conflict do nothing;
  get diagnostics inserted=row_count;
  if inserted=0 then return true; end if;
  terminal := p_event_type in ('bounced','complained','failed','suppressed');
  update homeground_private.traveller_ack_outbox set
    provider_message_id=coalesce(provider_message_id,p_provider_message_id),
    delivery_status=case when delivery_status in ('bounced','complained','suppressed') then delivery_status
      when delivery_status='delivered' and p_event_type in ('sent','delayed') then delivery_status else p_event_type end,
    status=case when terminal then 'failed' else status end,
    last_error_code=case when terminal then coalesce(p_reason,p_event_type) else last_error_code end,
    issue_resolved_at=case when terminal then null else issue_resolved_at end,
    row_version=row_version+case when terminal then 1 else 0 end, updated_at=now()
    where job_id=receipt.job_id;
  if p_event_type in ('bounced','complained','suppressed') and receipt.recipient_hash is not null then
    insert into homeground_private.traveller_ack_suppressions(recipient_hash,reason) values(receipt.recipient_hash,p_event_type)
      on conflict(recipient_hash) do update set reason=excluded.reason;
  end if;
  return true;
end;
$$;

create function public.get_homeground_traveller_ack_health_v1()
returns table(pending_count bigint,failed_count bigint,bounced_count bigint,complained_count bigint,overdue_count bigint,intent_capacity_reached boolean)
language sql stable security definer set search_path = pg_catalog, homeground_private as $$
  select count(*) filter(where status in ('pending','processing')),
    count(*) filter(where status='failed' and issue_resolved_at is null),
    count(*) filter(where delivery_status='bounced' and issue_resolved_at is null),
    count(*) filter(where delivery_status='complained' and issue_resolved_at is null),
    count(*) filter(where (status='pending' and next_attempt_at<now()-interval '5 minutes') or (status='processing' and lease_until<now()-interval '5 minutes')),
    (select count(*)>=5000 from (select 1 from homeground_private.traveller_ack_intents limit 5000) bounded_intents)
  from homeground_private.traveller_ack_outbox;
$$;
create function public.list_homeground_traveller_ack_issues_v1()
returns table(job_id uuid,public_reference text,contact_email text,status text,delivery_status text,error_code text,updated_at timestamptz)
language sql stable security definer set search_path = pg_catalog, homeground_private as $$
  select o.job_id,i.public_reference,i.contact_email,o.status,o.delivery_status,o.last_error_code,o.updated_at
  from homeground_private.traveller_ack_outbox o join homeground_private.inquiries i using(inquiry_id)
  where o.status='failed' and o.issue_resolved_at is null order by o.updated_at desc limit 100;
$$;
create function public.resolve_homeground_traveller_ack_issue_v1(p_job_id uuid, p_stop_followup boolean default false)
returns boolean language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare recipient text; affected integer;
begin
  update homeground_private.traveller_ack_outbox set issue_resolved_at=now() where job_id=p_job_id returning recipient_hash into recipient;
  get diagnostics affected=row_count;
  if p_stop_followup and recipient is not null then
    insert into homeground_private.traveller_ack_suppressions(recipient_hash,reason) values(recipient,'not_me') on conflict(recipient_hash) do update set reason='not_me';
  end if;
  return affected=1;
end;
$$;

-- Unused preparation tokens contain only HMACs and expire after 48h. Delivery
-- history cascades with the existing inquiry retention/deletion policy. Suppression
-- HMACs survive inquiry deletion so a complaint cannot be bypassed by submitting again.
create function homeground_private.cleanup_traveller_ack_intents_v1()
returns void language sql security definer set search_path = pg_catalog, homeground_private as $$
  delete from homeground_private.traveller_ack_intents where created_at<now()-interval '48 hours';
$$;
select cron.schedule('homeground-traveller-ack-intent-cleanup','17 3 * * *','select homeground_private.cleanup_traveller_ack_intents_v1();');

revoke all on function homeground_private.enroll_traveller_ack_v1(), homeground_private.cleanup_traveller_ack_intents_v1() from public, anon, authenticated, service_role;
revoke all on function public.prepare_homeground_traveller_ack_v1(text,text,boolean,text,text), public.get_homeground_traveller_ack_receipt_v1(uuid),
  public.freeze_homeground_traveller_ack_message_v1(uuid,uuid,bigint,jsonb),
  public.claim_homeground_traveller_ack_v1(text,integer,integer), public.finish_homeground_traveller_ack_v1(uuid,uuid,bigint,boolean,boolean,text,text,timestamptz),
  public.record_homeground_traveller_ack_event_v1(text,text,uuid,text,text), public.get_homeground_traveller_ack_health_v1(),
  public.list_homeground_traveller_ack_issues_v1(), public.resolve_homeground_traveller_ack_issue_v1(uuid,boolean) from public, anon, authenticated;
grant execute on function public.prepare_homeground_traveller_ack_v1(text,text,boolean,text,text), public.get_homeground_traveller_ack_receipt_v1(uuid),
  public.freeze_homeground_traveller_ack_message_v1(uuid,uuid,bigint,jsonb),
  public.claim_homeground_traveller_ack_v1(text,integer,integer), public.finish_homeground_traveller_ack_v1(uuid,uuid,bigint,boolean,boolean,text,text,timestamptz),
  public.record_homeground_traveller_ack_event_v1(text,text,uuid,text,text), public.get_homeground_traveller_ack_health_v1(),
  public.list_homeground_traveller_ack_issues_v1(), public.resolve_homeground_traveller_ack_issue_v1(uuid,boolean) to service_role;
commit;
