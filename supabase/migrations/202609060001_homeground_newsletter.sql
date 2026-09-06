begin;

create schema if not exists homeground_private;

create table homeground_private.newsletter_subscribers (
  subscriber_id uuid primary key default gen_random_uuid(),
  email text check (email is null or (length(email) between 3 and 254 and email = lower(btrim(email)) and email !~ '[[:cntrl:]]')),
  email_hash text not null unique check (email_hash ~ '^[0-9a-f]{64}$'),
  first_name text not null default '' check (length(first_name) <= 80 and first_name !~ '[[:cntrl:]]'),
  locale text not null check (locale in ('en','zh','ko')),
  source_path text not null check (length(source_path) <= 240 and source_path ~ '^/[A-Za-z0-9/_-]*$' and source_path not like '%//%'),
  consent_version text not null check (consent_version = '2026-09-06.1'),
  status text not null check (status in ('pending','active','unsubscribed','suppressed')),
  generation uuid not null,
  confirmation_token_hash text not null unique check (confirmation_token_hash ~ '^[0-9a-f]{64}$'),
  unsubscribe_token_hash text not null unique check (unsubscribe_token_hash ~ '^[0-9a-f]{64}$'),
  confirmation_expires_at timestamptz not null,
  requested_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  updated_at timestamptz not null default now(),
  check (status not in ('pending','active') or email is not null),
  check (status <> 'active' or confirmed_at is not null)
);
create unique index newsletter_email_unique on homeground_private.newsletter_subscribers(email) where email is not null;

create table homeground_private.newsletter_consent_events (
  event_id uuid primary key default gen_random_uuid(),
  subscriber_id uuid not null references homeground_private.newsletter_subscribers on delete cascade,
  generation uuid not null,
  event_type text not null check (event_type in ('requested','confirmed','unsubscribed')),
  consent_version text not null check (consent_version = '2026-09-06.1'),
  locale text not null check (locale in ('en','zh','ko')),
  source_path text not null,
  created_at timestamptz not null default now()
);

create table homeground_private.newsletter_requests (
  request_hash text primary key check (request_hash ~ '^[0-9a-f]{64}$'),
  fingerprint text not null check (fingerprint ~ '^[0-9a-f]{64}$'),
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table homeground_private.newsletter_rate_buckets (
  kind text not null check (kind in ('ip','email','global')),
  subject_hash text not null check (subject_hash ~ '^[0-9a-f]{64}$'),
  window_seconds integer not null check (window_seconds > 0),
  bucket_started_at timestamptz not null,
  request_count integer not null check (request_count >= 0),
  updated_at timestamptz not null default now(),
  primary key(kind, subject_hash, window_seconds, bucket_started_at)
);

create table homeground_private.newsletter_outbox (
  job_id uuid primary key,
  subscriber_id uuid not null references homeground_private.newsletter_subscribers on delete cascade,
  status text not null default 'pending' check (status in ('pending','processing','sent','failed','cancelled')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  lease_until timestamptz,
  lease_token uuid,
  created_at timestamptz not null default now(),
  provider_message_id text,
  sent_at timestamptz,
  error_code text check (error_code is null or error_code in ('provider_retry','provider_rejected','token_configuration','expired'))
);
create index newsletter_outbox_due on homeground_private.newsletter_outbox(next_attempt_at) where status in ('pending','processing');

alter table homeground_private.newsletter_subscribers enable row level security;
alter table homeground_private.newsletter_subscribers force row level security;
alter table homeground_private.newsletter_consent_events enable row level security;
alter table homeground_private.newsletter_consent_events force row level security;
alter table homeground_private.newsletter_requests enable row level security;
alter table homeground_private.newsletter_requests force row level security;
alter table homeground_private.newsletter_rate_buckets enable row level security;
alter table homeground_private.newsletter_rate_buckets force row level security;
alter table homeground_private.newsletter_outbox enable row level security;
alter table homeground_private.newsletter_outbox force row level security;
revoke all on homeground_private.newsletter_subscribers, homeground_private.newsletter_consent_events,
  homeground_private.newsletter_requests, homeground_private.newsletter_rate_buckets,
  homeground_private.newsletter_outbox from public, anon, authenticated;

create function homeground_private.consume_newsletter_rate(p_kind text, p_subject text, p_limit integer, p_window integer)
returns boolean language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare starts timestamptz; amount integer;
begin
  starts := to_timestamp(floor(extract(epoch from now()) / p_window) * p_window);
  insert into homeground_private.newsletter_rate_buckets as buckets(kind,subject_hash,window_seconds,bucket_started_at,request_count)
    values (p_kind,p_subject,p_window,starts,1)
    on conflict(kind,subject_hash,window_seconds,bucket_started_at)
    do update set request_count = buckets.request_count + 1, updated_at = now()
    returning request_count into amount;
  return amount <= p_limit;
end;
$$;

create function public.subscribe_homeground_newsletter_v1(
  p_request_hash text, p_fingerprint text, p_email text, p_email_hash text, p_ip_hash text,
  p_first_name text, p_locale text, p_source_path text, p_consent boolean, p_consent_version text,
  p_job_id uuid, p_confirmation_hash text, p_unsubscribe_hash text
) returns jsonb language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare previous homeground_private.newsletter_requests%rowtype;
  subscriber homeground_private.newsletter_subscribers%rowtype;
  result jsonb := jsonb_build_object('status','pending');
begin
  if p_consent is distinct from true or p_consent_version is distinct from '2026-09-06.1'
    or p_request_hash is null or p_request_hash !~ '^[0-9a-f]{64}$'
    or p_fingerprint is null or p_fingerprint !~ '^[0-9a-f]{64}$'
    or p_email_hash is null or p_email_hash !~ '^[0-9a-f]{64}$'
    or p_ip_hash is null or p_ip_hash !~ '^[0-9a-f]{64}$'
    or p_confirmation_hash is null or p_confirmation_hash !~ '^[0-9a-f]{64}$'
    or p_unsubscribe_hash is null or p_unsubscribe_hash !~ '^[0-9a-f]{64}$'
    or p_confirmation_hash = p_unsubscribe_hash or p_job_id is null
    or p_email is null or length(p_email) not between 3 and 254
    or p_email <> lower(btrim(p_email)) or p_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or p_email ~ '[[:cntrl:]]' or p_first_name is null or length(p_first_name) > 80 or p_first_name ~ '[[:cntrl:]]'
    or p_locale is null or p_locale not in ('en','zh','ko')
    or p_source_path is null or length(p_source_path) > 240 or p_source_path !~ '^/[A-Za-z0-9/_-]*$' or p_source_path like '%//%'
  then return jsonb_build_object('error','invalid'); end if;
  perform pg_advisory_xact_lock(hashtextextended('newsletter-request:' || p_request_hash,0));
  select * into previous from homeground_private.newsletter_requests where request_hash = p_request_hash;
  if found then
    if previous.fingerprint <> p_fingerprint then return jsonb_build_object('error','invalid'); end if;
    return previous.result;
  end if;
  -- Fixed-order shared buckets bound distributed attempts as well as each IP.
  if not homeground_private.consume_newsletter_rate('global',repeat('0',64),500,86400)
    or not homeground_private.consume_newsletter_rate('ip',p_ip_hash,30,86400)
    or not homeground_private.consume_newsletter_rate('ip',p_ip_hash,5,600)
  then return jsonb_build_object('error','rate_limited'); end if;
  if not homeground_private.consume_newsletter_rate('email',p_email_hash,3,86400) then
    insert into homeground_private.newsletter_requests values(p_request_hash,p_fingerprint,result,now());
    return result;
  end if;
  perform pg_advisory_xact_lock(hashtextextended('newsletter-email:' || p_email_hash,0));
  select * into subscriber from homeground_private.newsletter_subscribers
    where email_hash = p_email_hash or email = p_email for update;
  if found and subscriber.email_hash <> p_email_hash then
    -- Rotating the shared rate-hash secret must not duplicate or downgrade an
    -- existing address. The normalized email has its own private unique index.
    update homeground_private.newsletter_subscribers set email_hash = p_email_hash
      where subscriber_id = subscriber.subscriber_id;
  end if;
  if found and (subscriber.status in ('active','suppressed') or
    (subscriber.status = 'pending' and subscriber.requested_at > now() - interval '10 minutes')) then
    -- Existing/blocked addresses have the same public response as new ones.
    insert into homeground_private.newsletter_requests values(p_request_hash,p_fingerprint,result,now());
    return result;
  end if;
  insert into homeground_private.newsletter_subscribers as existing
    (email,email_hash,first_name,locale,source_path,consent_version,status,generation,
     confirmation_token_hash,unsubscribe_token_hash,confirmation_expires_at)
    values(p_email,p_email_hash,p_first_name,p_locale,p_source_path,p_consent_version,'pending',p_job_id,
      p_confirmation_hash,p_unsubscribe_hash,now() + interval '24 hours')
    on conflict(email_hash) do update set email = excluded.email,first_name = excluded.first_name,
      locale = excluded.locale,source_path = excluded.source_path,consent_version = excluded.consent_version,
      status = 'pending',generation = excluded.generation,confirmation_token_hash = excluded.confirmation_token_hash,
      unsubscribe_token_hash = excluded.unsubscribe_token_hash,confirmation_expires_at = excluded.confirmation_expires_at,
      requested_at = now(),confirmed_at = null,unsubscribed_at = null,updated_at = now()
    returning * into subscriber;
  update homeground_private.newsletter_outbox set status = 'cancelled',lease_until = null,lease_token = null
    where subscriber_id = subscriber.subscriber_id and status in ('pending','processing');
  insert into homeground_private.newsletter_consent_events(subscriber_id,generation,event_type,consent_version,locale,source_path)
    values(subscriber.subscriber_id,p_job_id,'requested',p_consent_version,p_locale,p_source_path);
  insert into homeground_private.newsletter_outbox(job_id,subscriber_id) values(p_job_id,subscriber.subscriber_id);
  result := result || jsonb_build_object('jobId',p_job_id);
  insert into homeground_private.newsletter_requests values(p_request_hash,p_fingerprint,result,now());
  return result;
end;
$$;

create function public.change_homeground_newsletter_v1(
  p_action text, p_request_hash text, p_fingerprint text, p_token_hash text, p_ip_hash text
) returns jsonb language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare previous homeground_private.newsletter_requests%rowtype;
  subscriber homeground_private.newsletter_subscribers%rowtype; result jsonb;
begin
  if p_action is null or p_action not in ('confirm','unsubscribe')
    or p_request_hash is null or p_request_hash !~ '^[0-9a-f]{64}$'
    or p_fingerprint is null or p_fingerprint !~ '^[0-9a-f]{64}$'
    or p_token_hash is null or p_token_hash !~ '^[0-9a-f]{64}$'
    or p_ip_hash is null or p_ip_hash !~ '^[0-9a-f]{64}$'
  then return jsonb_build_object('error','invalid'); end if;
  perform pg_advisory_xact_lock(hashtextextended('newsletter-request:' || p_request_hash,0));
  select * into previous from homeground_private.newsletter_requests where request_hash = p_request_hash;
  if found and previous.fingerprint <> p_fingerprint then return jsonb_build_object('error','invalid'); end if;
  -- Re-evaluate token state on a replay: a cached successful confirmation must
  -- not report active after unsubscribe or after a new subscription generation.
  if not found then
    if not homeground_private.consume_newsletter_rate('ip',p_ip_hash,30,600) then
      return jsonb_build_object('error','rate_limited');
    end if;
  end if;
  select * into subscriber from homeground_private.newsletter_subscribers
    where (p_action = 'confirm' and confirmation_token_hash = p_token_hash)
      or (p_action = 'unsubscribe' and unsubscribe_token_hash = p_token_hash) for update;
  if not found or (subscriber.status = 'suppressed' and p_action = 'confirm') then return jsonb_build_object('error','invalid'); end if;
  if p_action = 'confirm' then
    if subscriber.status = 'active' then result := jsonb_build_object('status','active');
    elsif subscriber.status <> 'pending' or subscriber.confirmation_expires_at <= now() then
      return jsonb_build_object('error','invalid');
    else
      update homeground_private.newsletter_subscribers set status = 'active',confirmed_at = now(),updated_at = now()
        where subscriber_id = subscriber.subscriber_id;
      insert into homeground_private.newsletter_consent_events(subscriber_id,generation,event_type,consent_version,locale,source_path)
        values(subscriber.subscriber_id,subscriber.generation,'confirmed',subscriber.consent_version,subscriber.locale,subscriber.source_path);
      result := jsonb_build_object('status','active');
    end if;
  else
    if subscriber.status <> 'unsubscribed' then
      update homeground_private.newsletter_subscribers set status = case when status = 'suppressed' then 'suppressed' else 'unsubscribed' end,
        unsubscribed_at = now(),updated_at = now()
        where subscriber_id = subscriber.subscriber_id;
      insert into homeground_private.newsletter_consent_events(subscriber_id,generation,event_type,consent_version,locale,source_path)
        values(subscriber.subscriber_id,subscriber.generation,'unsubscribed',subscriber.consent_version,subscriber.locale,subscriber.source_path);
    end if;
    result := jsonb_build_object('status','unsubscribed');
  end if;
  update homeground_private.newsletter_outbox set status = 'cancelled',lease_until = null,lease_token = null
    where subscriber_id = subscriber.subscriber_id and status in ('pending','processing');
  insert into homeground_private.newsletter_requests values(p_request_hash,p_fingerprint,result,now())
    on conflict(request_hash) do update set result = excluded.result;
  return result;
end;
$$;

create function public.claim_homeground_newsletter_email_v1(p_job_id uuid default null)
returns jsonb language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare job homeground_private.newsletter_outbox%rowtype; subscriber homeground_private.newsletter_subscribers%rowtype;
begin
  update homeground_private.newsletter_outbox set status = 'failed',error_code = 'expired',lease_token = null,lease_until = null
    where status in ('pending','processing') and (created_at < now() - interval '20 hours' or attempts >= 5)
      and (lease_until is null or lease_until <= now());
  select jobs.* into job from homeground_private.newsletter_outbox jobs
    join homeground_private.newsletter_subscribers subscribers on subscribers.subscriber_id = jobs.subscriber_id
    where (p_job_id is null or jobs.job_id = p_job_id) and jobs.job_id = subscribers.generation
      and subscribers.status = 'pending' and subscribers.confirmation_expires_at > now()
      and jobs.created_at >= now() - interval '20 hours' and jobs.attempts < 5
      and ((jobs.status = 'pending' and jobs.next_attempt_at <= now()) or
        (jobs.status = 'processing' and jobs.lease_until <= now()))
    order by jobs.created_at for update of jobs skip locked limit 1;
  if not found then return null; end if;
  update homeground_private.newsletter_outbox set status = 'processing',attempts = attempts + 1,
    lease_until = now() + interval '60 seconds',lease_token = gen_random_uuid()
    where job_id = job.job_id returning * into job;
  select * into subscriber from homeground_private.newsletter_subscribers where subscriber_id = job.subscriber_id;
  return jsonb_build_object('jobId',job.job_id,'leaseToken',job.lease_token,'email',subscriber.email,
    'locale',subscriber.locale,'confirmationHash',subscriber.confirmation_token_hash,'unsubscribeHash',subscriber.unsubscribe_token_hash);
end;
$$;

create function public.finish_homeground_newsletter_email_v1(
  p_job_id uuid,p_lease_token uuid,p_accepted boolean,p_retryable boolean,p_provider_message_id text,p_error_code text
) returns boolean language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare job homeground_private.newsletter_outbox%rowtype;
begin
  if p_accepted is null or p_retryable is null or length(p_provider_message_id) > 200 or
    (p_error_code is not null and p_error_code not in ('provider_retry','provider_rejected','token_configuration')) then return false; end if;
  select * into job from homeground_private.newsletter_outbox where job_id = p_job_id for update;
  if not found or job.status <> 'processing' or job.lease_token is distinct from p_lease_token or job.lease_until <= now() then return false; end if;
  update homeground_private.newsletter_outbox set
    status = case when p_accepted then 'sent' when p_retryable and attempts < 5 then 'pending' else 'failed' end,
    provider_message_id = case when p_accepted then p_provider_message_id else null end,
    sent_at = case when p_accepted then now() else null end,
    next_attempt_at = now() + make_interval(secs => least(3600,60 * (2 ^ least(attempts,5))::integer)),
    lease_token = null,lease_until = null,error_code = case when p_accepted then null else p_error_code end
    where job_id = p_job_id;
  return true;
end;
$$;

create function public.maintain_homeground_newsletter_v1()
returns jsonb language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare counts jsonb;
begin
  delete from homeground_private.newsletter_requests where created_at < now() - interval '24 hours';
  delete from homeground_private.newsletter_rate_buckets where updated_at < now() - interval '25 hours';
  delete from homeground_private.newsletter_subscribers where status = 'pending' and requested_at < now() - interval '7 days';
  update homeground_private.newsletter_subscribers set email = null,first_name = '',source_path = '/',updated_at = now()
    where status = 'unsubscribed' and unsubscribed_at < now() - interval '30 days' and email is not null;
  delete from homeground_private.newsletter_outbox where status in ('sent','cancelled','failed') and created_at < now() - interval '30 days';
  select jsonb_build_object('pending',count(*) filter(where status = 'pending'),
    'processing',count(*) filter(where status = 'processing'),'failed',count(*) filter(where status = 'failed'))
    into counts from homeground_private.newsletter_outbox;
  return counts;
end;
$$;

revoke all on function homeground_private.consume_newsletter_rate(text,text,integer,integer) from public,anon,authenticated;
revoke all on function public.subscribe_homeground_newsletter_v1(text,text,text,text,text,text,text,text,boolean,text,uuid,text,text) from public,anon,authenticated;
revoke all on function public.change_homeground_newsletter_v1(text,text,text,text,text) from public,anon,authenticated;
revoke all on function public.claim_homeground_newsletter_email_v1(uuid) from public,anon,authenticated;
revoke all on function public.finish_homeground_newsletter_email_v1(uuid,uuid,boolean,boolean,text,text) from public,anon,authenticated;
revoke all on function public.maintain_homeground_newsletter_v1() from public,anon,authenticated;
grant execute on function public.subscribe_homeground_newsletter_v1(text,text,text,text,text,text,text,text,boolean,text,uuid,text,text) to service_role;
grant execute on function public.change_homeground_newsletter_v1(text,text,text,text,text) to service_role;
grant execute on function public.claim_homeground_newsletter_email_v1(uuid) to service_role;
grant execute on function public.finish_homeground_newsletter_email_v1(uuid,uuid,boolean,boolean,text,text) to service_role;
grant execute on function public.maintain_homeground_newsletter_v1() to service_role;

comment on table homeground_private.newsletter_subscribers is 'Independent explicit email subscription; enquiry and cookie consent never activate it. Tokens are hashes only.';
comment on function public.claim_homeground_newsletter_email_v1(uuid) is 'One leased confirmation email; recover ambiguous delivery with the same provider idempotency key, only inside a 20-hour retry horizon.';

create table homeground_private.newsletter_admin_access (
  access_id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null,
  created_at timestamptz not null default now()
);
alter table homeground_private.newsletter_admin_access enable row level security;
alter table homeground_private.newsletter_admin_access force row level security;
revoke all on homeground_private.newsletter_admin_access from public,anon,authenticated;

create function public.get_homeground_newsletter_admin_v1(p_admin_user_id uuid,p_status text default null,p_cursor uuid default null)
returns jsonb language plpgsql security definer set search_path = pg_catalog, homeground_private as $$
declare totals jsonb; records jsonb; cursor_time timestamptz; next_cursor uuid;
begin
  if p_admin_user_id is null or (p_status is not null and p_status not in ('pending','active','unsubscribed','suppressed')) then return null; end if;
  if p_cursor is not null then
    select requested_at into cursor_time from homeground_private.newsletter_subscribers where subscriber_id = p_cursor;
    if not found then return null; end if;
  end if;
  select jsonb_build_object('pending',count(*) filter(where status = 'pending'),'active',count(*) filter(where status = 'active'),
    'unsubscribed',count(*) filter(where status = 'unsubscribed'),'suppressed',count(*) filter(where status = 'suppressed'))
    into totals from homeground_private.newsletter_subscribers;
  with selected as (
    select * from homeground_private.newsletter_subscribers
      where (p_status is null or status = p_status) and
        (p_cursor is null or (requested_at,subscriber_id) < (cursor_time,p_cursor))
      order by requested_at desc,subscriber_id desc limit 25
  ) select coalesce(jsonb_agg(jsonb_build_object('id',subscriber_id,'email',email,'firstName',first_name,
    'locale',locale,'sourcePath',source_path,'status',status,'consentVersion',consent_version,
    'requestedAt',requested_at,'confirmedAt',confirmed_at,'unsubscribedAt',unsubscribed_at)
    order by requested_at desc,subscriber_id desc),'[]'::jsonb) into records from selected;
  if jsonb_array_length(records) = 25 then next_cursor := (records -> 24 ->> 'id')::uuid; end if;
  -- The subscriber response is withheld if its separate access audit fails.
  insert into homeground_private.newsletter_admin_access(admin_user_id) values(p_admin_user_id);
  delete from homeground_private.newsletter_admin_access where created_at < now() - interval '90 days';
  return jsonb_build_object('contractVersion','homeground-newsletter-admin.v1','counts',totals,'subscribers',records,'nextCursor',next_cursor);
end;
$$;
revoke all on function public.get_homeground_newsletter_admin_v1(uuid,text,uuid) from public,anon,authenticated;
grant execute on function public.get_homeground_newsletter_admin_v1(uuid,text,uuid) to service_role;
commit;
