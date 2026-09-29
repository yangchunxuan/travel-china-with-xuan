begin;
-- Every correction retains the enquiry identity and deadline. Sender envelopes
-- and provider idempotency keys belong to immutable revision-specific jobs.
alter table homeground_private.inquiries add column contact_revision integer not null default 0 check (contact_revision between 0 and 3);
create table homeground_private.inquiry_email_corrections (
  correction_id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references homeground_private.inquiries(inquiry_id) on delete cascade,
  request_key_hash text not null unique check (request_key_hash ~ '^[a-f0-9]{64}$'),
  payload_hash text not null check (payload_hash ~ '^[a-f0-9]{64}$'),
  previous_email text not null,
  contact_email text not null,
  contact_revision integer not null,
  changed boolean not null,
  created_at timestamptz not null default now()
);
alter table homeground_private.inquiry_email_corrections enable row level security;
alter table homeground_private.inquiry_email_corrections force row level security;
revoke all on homeground_private.inquiry_email_corrections from public, anon, authenticated, service_role;

alter table homeground_private.traveller_ack_outbox drop constraint traveller_ack_outbox_inquiry_id_key;
alter table homeground_private.traveller_ack_outbox add column contact_revision integer not null default 0;
alter table homeground_private.traveller_ack_outbox add column contact_email_snapshot text;
alter table homeground_private.traveller_ack_outbox add unique(inquiry_id,contact_revision);
alter table homeground_private.notification_outbox drop constraint notification_outbox_inquiry_id_key;
alter table homeground_private.notification_outbox drop constraint notification_outbox_status_check;
alter table homeground_private.notification_outbox add constraint notification_outbox_status_check
  check(status in ('pending','processing','accepted','failed','superseded'));
alter table homeground_private.notification_outbox add column contact_revision integer not null default 0;
alter table homeground_private.notification_outbox add column contact_email_snapshot text;
alter table homeground_private.notification_outbox add column previous_contact_email text;
alter table homeground_private.notification_outbox add unique(inquiry_id,contact_revision);
update homeground_private.traveller_ack_outbox o set contact_email_snapshot=i.contact_email from homeground_private.inquiries i where i.inquiry_id=o.inquiry_id;
update homeground_private.notification_outbox o set contact_email_snapshot=i.contact_email from homeground_private.inquiries i where i.inquiry_id=o.inquiry_id;

create function homeground_private.snapshot_inquiry_job_contact_v1()
returns trigger language plpgsql security definer set search_path=pg_catalog,homeground_private as $$
begin
  if new.contact_email_snapshot is null then
    select contact_email into new.contact_email_snapshot from homeground_private.inquiries where inquiry_id=new.inquiry_id;
  end if;
  return new;
end;
$$;
create trigger snapshot_traveller_ack_contact before insert on homeground_private.traveller_ack_outbox for each row execute function homeground_private.snapshot_inquiry_job_contact_v1();
create trigger snapshot_notification_contact before insert on homeground_private.notification_outbox for each row execute function homeground_private.snapshot_inquiry_job_contact_v1();

create or replace function public.get_homeground_traveller_ack_receipt_v1(p_inquiry_id uuid)
returns jsonb language sql stable security definer set search_path=pg_catalog,homeground_private as $$
  select jsonb_build_object('ackQueued',coalesce(o.status in ('pending','processing','accepted'),false),
    'ackStatus',case when o.status in ('pending','processing','accepted') then 'queued'
      when o.status='suppressed' then 'suppressed'
      when o.status='disabled' and o.suppression_reason<>'intent_unavailable' then 'disabled' else 'unavailable' end,
    'firstResponseDueAt',i.first_response_due_at,'contactEmail',i.contact_email,'contactRevision',i.contact_revision)
  from homeground_private.inquiries i left join homeground_private.traveller_ack_outbox o
    on o.inquiry_id=i.inquiry_id and o.contact_revision=i.contact_revision
  where i.inquiry_id=p_inquiry_id;
$$;
create or replace function public.get_homeground_traveller_ack_staff_status_v1(p_inquiry_id uuid)
returns jsonb language sql stable security definer set search_path=pg_catalog,homeground_private as $$
  select jsonb_build_object('stopReason',s.reason,'deliveryStatus',o.delivery_status)
  from homeground_private.inquiries i join homeground_private.traveller_ack_outbox o
    on o.inquiry_id=i.inquiry_id and o.contact_revision=i.contact_revision
  left join homeground_private.traveller_ack_suppressions s using(recipient_hash)
  where i.inquiry_id=p_inquiry_id;
$$;
-- Retain all unresolved historical issues, but never label an old-address bounce
-- with the corrected address. Its recipient restriction remains independent.
create or replace function public.list_homeground_traveller_ack_issues_v1()
returns table(job_id uuid,public_reference text,contact_email text,status text,delivery_status text,error_code text,updated_at timestamptz)
language sql stable security definer set search_path=pg_catalog,homeground_private as $$
  select o.job_id,i.public_reference,o.contact_email_snapshot,o.status,o.delivery_status,o.last_error_code,o.updated_at
  from homeground_private.traveller_ack_outbox o join homeground_private.inquiries i using(inquiry_id)
  where o.status='failed' and o.issue_resolved_at is null order by o.updated_at desc limit 100;
$$;

create function public.correct_homeground_inquiry_email_v1(
  p_inquiry_key_hash text,p_request_key_hash text,p_payload_hash text,
  p_contact_email text,p_expected_revision integer,p_recipient_hash text,p_ack_enabled boolean
) returns jsonb language plpgsql security definer set search_path=pg_catalog,public,homeground_private as $$
declare saved homeground_private.inquiries; previous homeground_private.inquiry_email_corrections;
  receipt_status text := 'disabled'; reason text; next_revision integer; old_email text;
begin
  if p_inquiry_key_hash is null or p_inquiry_key_hash !~ '^[a-f0-9]{64}$'
    or p_request_key_hash is null or p_request_key_hash !~ '^[a-f0-9]{64}$'
    or p_payload_hash is null or p_payload_hash !~ '^[a-f0-9]{64}$'
    or p_recipient_hash is null or p_recipient_hash !~ '^[a-f0-9]{64}$'
    or p_ack_enabled is null or p_expected_revision is null or p_expected_revision not between 0 and 3
    or p_contact_email is null or char_length(p_contact_email) not between 3 and 254
    or p_contact_email !~ '^[^[:space:]@,<>]+@[^[:space:]@,<>]+\.[^[:space:]@,<>]+$' then
    raise exception using errcode='22023',message='invalid email correction';
  end if;
  -- The original random browser key is the sole authority. Public references
  -- are deliberately not accepted. No key or email is written to public logs.
  select * into saved from homeground_private.inquiries where idempotency_key_hash=p_inquiry_key_hash for update;
  if saved.inquiry_id is null or saved.contact_channel<>'email' then
    return jsonb_build_object('outcome','correction_unavailable');
  end if;
  -- Successful replays remain readable after expiry, but cannot change anything.
  select * into previous from homeground_private.inquiry_email_corrections where request_key_hash=p_request_key_hash;
  if previous.correction_id is not null then
    if previous.inquiry_id<>saved.inquiry_id or previous.payload_hash<>p_payload_hash then
      return jsonb_build_object('outcome','idempotency_conflict');
    end if;
    return public.get_homeground_traveller_ack_receipt_v1(saved.inquiry_id)
      ||jsonb_build_object('outcome','corrected','publicReference',saved.public_reference,'duplicate',true,'changed',previous.changed);
  end if;
  if saved.created_at<now()-interval '30 minutes' then
    return jsonb_build_object('outcome','correction_unavailable');
  end if;
  if saved.contact_revision<>p_expected_revision then
    return jsonb_build_object('outcome','correction_conflict');
  end if;
  if (select count(*) from homeground_private.inquiry_email_corrections where inquiry_id=saved.inquiry_id)>=10 then
    return jsonb_build_object('outcome','correction_limit');
  end if;
  if lower(saved.contact_email)=lower(p_contact_email) then
    insert into homeground_private.inquiry_email_corrections(inquiry_id,request_key_hash,payload_hash,previous_email,contact_email,contact_revision,changed)
      values(saved.inquiry_id,p_request_key_hash,p_payload_hash,saved.contact_email,saved.contact_email,saved.contact_revision,false);
    return public.get_homeground_traveller_ack_receipt_v1(saved.inquiry_id)
      ||jsonb_build_object('outcome','corrected','publicReference',saved.public_reference,'duplicate',false,'changed',false);
  end if;
  if saved.contact_revision>=3 then return jsonb_build_object('outcome','correction_limit'); end if;
  -- Lock the jobs before checking leases. SKIP LOCKED workers cannot start an
  -- old-address send between this check and the transaction's contact update.
  perform 1 from homeground_private.traveller_ack_outbox where inquiry_id=saved.inquiry_id for update;
  perform 1 from homeground_private.notification_outbox where inquiry_id=saved.inquiry_id for update;
  if exists(select 1 from homeground_private.traveller_ack_outbox where inquiry_id=saved.inquiry_id and status='processing' and lease_until>now())
    or exists(select 1 from homeground_private.notification_outbox where inquiry_id=saved.inquiry_id and status='processing' and lease_until>now()) then
    return jsonb_build_object('outcome','correction_busy');
  end if;
  old_email:=saved.contact_email; next_revision:=saved.contact_revision+1;
  -- Supersede only unsent/uncertain work. Accepted mail cannot be recalled.
  -- Keep frozen envelopes, IDs and historical delivery outcomes intact.
  update homeground_private.traveller_ack_outbox set status='suppressed',suppression_reason='contact_corrected',
    lease_until=null,lease_token=null,row_version=row_version+1,updated_at=now()
    where inquiry_id=saved.inquiry_id and status in ('pending','processing');
  -- A frozen internal retry may contain the obsolete mailto link. Stop its
  -- unconfirmed delivery without deleting the envelope or claiming acceptance.
  -- The new correction notice contains the complete original enquiry context.
  update homeground_private.notification_outbox set status='superseded',last_error_code='contact_corrected',
    lease_until=null,leased_by=null,lease_token=null,row_version=row_version+1,updated_at=now()
    where inquiry_id=saved.inquiry_id and status in ('pending','processing');
  update homeground_private.inquiries set contact_email=p_contact_email,contact_revision=next_revision
    where inquiry_id=saved.inquiry_id;
  insert into homeground_private.inquiry_email_corrections(inquiry_id,request_key_hash,payload_hash,previous_email,contact_email,contact_revision,changed)
    values(saved.inquiry_id,p_request_key_hash,p_payload_hash,old_email,p_contact_email,next_revision,true);
  -- The original privacy disclosure still governs confirmations. Restrictions
  -- on the NEW address are never cleared by correcting a different address.
  if p_ack_enabled and saved.privacy_notice_version='2026-09-28.1' then
    perform pg_advisory_xact_lock(hashtextextended(p_recipient_hash,28092026));
    select s.reason into reason from homeground_private.traveller_ack_suppressions s where s.recipient_hash=p_recipient_hash;
    if reason is not null then receipt_status:='suppressed';
    elsif exists(select 1 from homeground_private.traveller_ack_outbox o where o.recipient_hash=p_recipient_hash
      and o.created_at>now()-interval '24 hours' and o.status in ('pending','processing','accepted','failed')) then
      receipt_status:='suppressed'; reason:='address_24h_limit';
    else receipt_status:='pending'; end if;
  else reason:=case when saved.privacy_notice_version<>'2026-09-28.1' then 'legacy_disclosure' else 'feature_disabled' end;
  end if;
  insert into homeground_private.traveller_ack_outbox(inquiry_id,contact_revision,contact_email_snapshot,recipient_hash,status,suppression_reason)
    values(saved.inquiry_id,next_revision,p_contact_email,p_recipient_hash,receipt_status,reason);
  insert into homeground_private.notification_outbox(inquiry_id,contact_revision,contact_email_snapshot,previous_contact_email)
    values(saved.inquiry_id,next_revision,p_contact_email,old_email);
  return public.get_homeground_traveller_ack_receipt_v1(saved.inquiry_id)
    ||jsonb_build_object('outcome','corrected','publicReference',saved.public_reference,'duplicate',false,'changed',true);
end;
$$;

create or replace function public.claim_homeground_notification_jobs(
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
  note text,
  inquiry_created_at timestamptz,
  first_response_due_at timestamptz,
  lease_token uuid,
  row_version bigint,
  attempt_count integer
)
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
begin
  if length(trim(p_worker_id)) = 0
    or p_job_limit < 1
    or p_job_limit > 50
    or p_lease_seconds < 15
    or p_lease_seconds > 300
  then
    raise exception using
      errcode = '22023',
      message = 'invalid notification claim input';
  end if;

  update homeground_private.notification_outbox expired
    set
      status = 'failed',
      lease_until = null,
      leased_by = null,
      lease_token = null,
      last_error_code = 'retry_deadline_exceeded',
      row_version = expired.row_version + 1,
      updated_at = now()
    where expired.status in ('pending', 'processing')
      and expired.retry_deadline_at <= now();

  return query
  with due_jobs as (
    select candidate.job_id
      from homeground_private.notification_outbox candidate
      where candidate.contact_revision=0 and candidate.retry_deadline_at > now()
        and (
          (
            candidate.status = 'pending'
            and candidate.next_attempt_at <= now()
          )
          or (
            candidate.status = 'processing'
            and candidate.lease_until <= now()
          )
        )
      order by candidate.next_attempt_at, candidate.created_at
      for update skip locked
      limit p_job_limit
  ),
  claimed_jobs as (
    update homeground_private.notification_outbox claimed
      set
        status = 'processing',
        attempt_count = claimed.attempt_count + 1,
        lease_until = now() + make_interval(secs => p_lease_seconds),
        leased_by = p_worker_id,
        lease_token = extensions.gen_random_uuid(),
        row_version = claimed.row_version + 1,
        updated_at = now()
      from due_jobs
      where claimed.job_id = due_jobs.job_id
      returning claimed.*
  )
  select
    claimed.job_id,
    inquiry.inquiry_id,
    inquiry.public_reference,
    inquiry.locale,
    inquiry.route_id,
    inquiry.answers_json,
    inquiry.route_snapshot_json,
    inquiry.contact_channel,
    claimed.contact_email_snapshot,
    inquiry.contact_phone_e164,
    inquiry.note,
    inquiry.created_at,
    inquiry.first_response_due_at,
    claimed.lease_token,
    claimed.row_version,
    claimed.attempt_count
  from claimed_jobs claimed
  join homeground_private.inquiries inquiry
    on inquiry.inquiry_id = claimed.inquiry_id;
end;
$$;


create or replace function public.claim_homeground_traveller_ack_v1(p_worker_id text, p_job_limit integer default 1, p_lease_seconds integer default 90)
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
      o.contact_email_snapshot,i.answers_json,
      i.first_response_due_at,i.created_at,o.lease_token,o.row_version,o.attempt_count,o.first_attempt_at
      from claimed o join homeground_private.inquiries i using(inquiry_id);
end;
$$;


create function public.claim_homeground_notification_jobs_v4(p_worker_id text,p_job_limit integer default 1,p_lease_seconds integer default 90)
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
  -- New correction envelopes never retry outside Resend's 24h idempotency
  -- window. Preserve the historical revision-zero worker policy unchanged.
  update homeground_private.notification_outbox o set status='failed',lease_until=null,leased_by=null,lease_token=null,last_error_code='correction_notice_expired',
    row_version=o.row_version+1,updated_at=now()
    where o.contact_revision>0 and o.status in ('pending','processing') and o.created_at<now()-interval '23 hours'
      and (o.lease_until is null or o.lease_until<now());
  return query with candidates as (
    select o.job_id from homeground_private.notification_outbox o
    where o.retry_deadline_at>now() and ((o.status='pending' and o.next_attempt_at<=now()) or (o.status='processing' and o.lease_until<=now()))
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
revoke all on function homeground_private.snapshot_inquiry_job_contact_v1() from public,anon,authenticated,service_role;
revoke all on function public.correct_homeground_inquiry_email_v1(text,text,text,text,integer,text,boolean),
  public.claim_homeground_notification_jobs_v4(text,integer,integer) from public,anon,authenticated;
grant execute on function public.correct_homeground_inquiry_email_v1(text,text,text,text,integer,text,boolean),
  public.claim_homeground_notification_jobs_v4(text,integer,integer) to service_role;
commit;
