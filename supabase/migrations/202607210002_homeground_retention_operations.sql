begin;

create extension if not exists pg_cron with schema pg_catalog;
create schema if not exists homeground_recovery;

revoke all on schema homeground_recovery
  from public, anon, authenticated, service_role;

-- A retry deadline is immutable operational truth. The trigger derives it
-- from the outbox creation time so retries cannot extend the 72-hour window.
alter table homeground_private.notification_outbox
  add column if not exists retry_deadline_at timestamptz;

update homeground_private.notification_outbox
  set retry_deadline_at = created_at + interval '72 hours'
  where retry_deadline_at is null
     or retry_deadline_at <> created_at + interval '72 hours';

alter table homeground_private.notification_outbox
  alter column retry_deadline_at
    set default (now() + interval '72 hours'),
  alter column retry_deadline_at set not null;

alter table homeground_private.notification_outbox
  drop constraint if exists notification_outbox_retry_deadline_check;

alter table homeground_private.notification_outbox
  add constraint notification_outbox_retry_deadline_check check (
    retry_deadline_at = created_at + interval '72 hours'
  );

create or replace function
  homeground_private.set_notification_retry_deadline()
returns trigger
language plpgsql
set search_path = pg_catalog
as $$
begin
  new.retry_deadline_at := new.created_at + interval '72 hours';
  return new;
end;
$$;

drop trigger if exists notification_retry_deadline_immutable
  on homeground_private.notification_outbox;

create trigger notification_retry_deadline_immutable
before insert or update of created_at, retry_deadline_at
on homeground_private.notification_outbox
for each row
execute function homeground_private.set_notification_retry_deadline();

create index if not exists notification_outbox_retry_deadline_idx
  on homeground_private.notification_outbox(
    retry_deadline_at,
    created_at
  )
  where status in ('pending', 'processing');

create table if not exists homeground_private.retention_cleanup_runs (
  run_id uuid primary key default extensions.gen_random_uuid(),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null
    check (status in ('running', 'succeeded', 'failed')),
  inquiries_deleted_count integer not null default 0
    check (inquiries_deleted_count >= 0),
  outbox_deleted_count integer not null default 0
    check (outbox_deleted_count >= 0),
  rate_limit_buckets_deleted_count integer not null default 0
    check (rate_limit_buckets_deleted_count >= 0),
  retries_expired_count integer not null default 0
    check (retries_expired_count >= 0),
  tombstones_upserted_count integer not null default 0
    check (tombstones_upserted_count >= 0),
  error_code text check (
    error_code is null
    or error_code in (
      'cleanup_failed',
      'integrity_violation',
      'lock_timeout',
      'statement_timeout'
    )
  ),
  constraint retention_cleanup_run_state_check check (
    (
      status = 'running'
      and finished_at is null
      and error_code is null
    )
    or (
      status = 'succeeded'
      and finished_at is not null
      and error_code is null
    )
    or (
      status = 'failed'
      and finished_at is not null
      and error_code is not null
    )
  )
);

create index if not exists retention_cleanup_runs_started_idx
  on homeground_private.retention_cleanup_runs(started_at desc);

create table if not exists homeground_private.operational_check_runs (
  check_run_id uuid primary key default extensions.gen_random_uuid(),
  check_type text not null
    check (check_type in ('isolated_e2e_canary', 'backup_restore')),
  environment text not null
    check (environment in ('isolated', 'staging', 'production')),
  artifact_version text not null check (
    char_length(artifact_version) between 1 and 64
    and artifact_version ~ '^[A-Za-z0-9._:-]+$'
  ),
  status text not null check (status in ('succeeded', 'failed')),
  checked_at timestamptz not null default now(),
  evidence_reference text not null check (
    char_length(evidence_reference) between 7 and 200
    and evidence_reference ~ '^ops://[A-Za-z0-9._:/-]+$'
  ),
  constraint operational_check_environment_check check (
    (
      check_type = 'backup_restore'
      and environment = 'isolated'
    )
    or (
      check_type = 'isolated_e2e_canary'
      and environment in ('isolated', 'staging')
    )
  )
);

create index if not exists operational_check_runs_latest_idx
  on homeground_private.operational_check_runs(
    check_type,
    checked_at desc
  );

create table if not exists homeground_private.data_quality_incidents (
  incident_id uuid primary key default extensions.gen_random_uuid(),
  incident_type text not null check (
    incident_type in (
      'abuse_spike',
      'rate_limit_alert',
      'idempotency_anomaly',
      'production_test_pollution',
      'schema_contract_mismatch',
      'confirmed_data_corruption'
    )
  ),
  window_started_at timestamptz not null,
  window_ended_at timestamptz,
  status text not null check (status in ('open', 'resolved')),
  actor_id uuid not null,
  evidence_reference text not null check (
    char_length(evidence_reference) between 7 and 200
    and evidence_reference ~ '^ops://[A-Za-z0-9._:/-]+$'
  ),
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid,
  constraint data_quality_incident_window_check check (
    window_ended_at is null
    or window_ended_at >= window_started_at
  ),
  constraint data_quality_incident_state_check check (
    (
      status = 'open'
      and resolved_at is null
      and resolved_by is null
    )
    or (
      status = 'resolved'
      and resolved_at is not null
      and resolved_by is not null
    )
  )
);

create index if not exists data_quality_incidents_open_idx
  on homeground_private.data_quality_incidents(
    created_at desc
  )
  where status = 'open';

-- This restricted ledger is the database-side half of deletion replay. It
-- must be replicated to an independently retained operational store before a
-- restore exercise can claim success; the table alone is not an out-of-band
-- backup control.
create table if not exists homeground_recovery.deletion_tombstones (
  inquiry_id uuid primary key,
  deleted_at timestamptz not null default now(),
  reason_code text not null check (
    reason_code in (
      'retention_expired',
      'verified_rights_request',
      'confirmed_data_corruption',
      'documented_security_incident'
    )
  ),
  purge_after timestamptz not null,
  replicated_at timestamptz,
  constraint deletion_tombstone_purge_check check (
    purge_after >= deleted_at + interval '35 days'
  )
);

create index if not exists deletion_tombstones_replication_idx
  on homeground_recovery.deletion_tombstones(deleted_at)
  where replicated_at is null;

alter table homeground_private.retention_cleanup_runs
  enable row level security;
alter table homeground_private.retention_cleanup_runs
  force row level security;
alter table homeground_private.operational_check_runs
  enable row level security;
alter table homeground_private.operational_check_runs
  force row level security;
alter table homeground_private.data_quality_incidents
  enable row level security;
alter table homeground_private.data_quality_incidents
  force row level security;
alter table homeground_recovery.deletion_tombstones
  enable row level security;
alter table homeground_recovery.deletion_tombstones
  force row level security;

revoke all on homeground_private.retention_cleanup_runs
  from public, anon, authenticated, service_role;
revoke all on homeground_private.operational_check_runs
  from public, anon, authenticated, service_role;
revoke all on homeground_private.data_quality_incidents
  from public, anon, authenticated, service_role;
revoke all on homeground_recovery.deletion_tombstones
  from public, anon, authenticated, service_role;

create or replace function
  homeground_private.run_homeground_retention_cleanup()
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, homeground_private, homeground_recovery
as $$
declare
  observed_at timestamptz := clock_timestamp();
  cleanup_run_id uuid;
  expired_inquiry_ids uuid[] := '{}'::uuid[];
  inquiries_deleted integer := 0;
  outbox_deleted integer := 0;
  rate_limit_buckets_deleted integer := 0;
  retries_expired integer := 0;
  tombstones_upserted integer := 0;
  controlled_error_code text;
begin
  insert into homeground_private.retention_cleanup_runs (
    status
  )
  values (
    'running'
  )
  returning run_id into cleanup_run_id;

  begin
    update homeground_private.notification_outbox
      set
        status = 'failed',
        lease_until = null,
        leased_by = null,
        lease_token = null,
        last_error_code = 'retry_deadline_exceeded',
        row_version = row_version + 1,
        updated_at = observed_at
      where status in ('pending', 'processing')
        and retry_deadline_at <= observed_at;

    get diagnostics retries_expired = row_count;

    delete from homeground_private.notification_outbox
      where created_at <= observed_at - interval '60 days';

    get diagnostics outbox_deleted = row_count;

    select coalesce(array_agg(candidate.inquiry_id), '{}'::uuid[])
      into expired_inquiry_ids
      from (
        select inquiry.inquiry_id
          from homeground_private.inquiries inquiry
          where inquiry.created_at
            <= observed_at - interval '12 months'
          order by inquiry.created_at, inquiry.inquiry_id
          for update
      ) candidate;

    insert into homeground_recovery.deletion_tombstones (
      inquiry_id,
      deleted_at,
      reason_code,
      purge_after,
      replicated_at
    )
    select
      expired.inquiry_id,
      observed_at,
      'retention_expired',
      observed_at + interval '35 days',
      null
    from unnest(expired_inquiry_ids) as expired(inquiry_id)
    on conflict (inquiry_id) do update
      set
        deleted_at = least(
          homeground_recovery.deletion_tombstones.deleted_at,
          excluded.deleted_at
        ),
        purge_after = greatest(
          homeground_recovery.deletion_tombstones.purge_after,
          excluded.purge_after
        ),
        replicated_at = null;

    get diagnostics tombstones_upserted = row_count;

    delete from homeground_private.inquiries inquiry
      where inquiry.inquiry_id = any(expired_inquiry_ids);

    get diagnostics inquiries_deleted = row_count;

    delete from homeground_private.inquiry_rate_limit_buckets
      where updated_at <= observed_at - interval '24 hours';

    get diagnostics rate_limit_buckets_deleted = row_count;

    -- Tombstones are purged only after an independent replication process has
    -- acknowledged them and the backup retention period plus safety margin
    -- has elapsed.
    delete from homeground_recovery.deletion_tombstones
      where replicated_at is not null
        and purge_after <= observed_at;

    update homeground_private.retention_cleanup_runs
      set
        status = 'succeeded',
        finished_at = clock_timestamp(),
        inquiries_deleted_count = inquiries_deleted,
        outbox_deleted_count = outbox_deleted,
        rate_limit_buckets_deleted_count =
          rate_limit_buckets_deleted,
        retries_expired_count = retries_expired,
        tombstones_upserted_count = tombstones_upserted
      where run_id = cleanup_run_id;

    return jsonb_build_object(
      'outcome', 'succeeded',
      'inquiriesDeleted', inquiries_deleted,
      'outboxDeleted', outbox_deleted,
      'rateLimitBucketsDeleted', rate_limit_buckets_deleted,
      'retriesExpired', retries_expired,
      'tombstonesUpserted', tombstones_upserted
    );
  exception
    -- OTHERS intentionally excludes QUERY_CANCELED (SQLSTATE 57014).
    -- Catch it explicitly so a statement timeout rolls back the inner cleanup
    -- subtransaction, then records a controlled failure in the run row that
    -- was inserted outside that subtransaction.
    when query_canceled then
      update homeground_private.retention_cleanup_runs
        set
          status = 'failed',
          finished_at = clock_timestamp(),
          error_code = 'statement_timeout'
        where run_id = cleanup_run_id;

      return jsonb_build_object(
        'outcome', 'failed',
        'errorCode', 'statement_timeout'
      );
    when others then
      controlled_error_code := case sqlstate
        when '23503' then 'integrity_violation'
        when '23505' then 'integrity_violation'
        when '55P03' then 'lock_timeout'
        else 'cleanup_failed'
      end;

      update homeground_private.retention_cleanup_runs
        set
          status = 'failed',
          finished_at = clock_timestamp(),
          error_code = controlled_error_code
        where run_id = cleanup_run_id;

      return jsonb_build_object(
        'outcome', 'failed',
        'errorCode', controlled_error_code
      );
  end;
end;
$$;

-- Rights-request and incident deletions use the same tombstone path. This is
-- intentionally not exposed through an Edge Function or granted to browser,
-- authenticated, or service roles.
create or replace function
  homeground_recovery.delete_homeground_inquiry(
    p_inquiry_id uuid,
    p_reason_code text
  )
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, homeground_private, homeground_recovery
as $$
declare
  deleted_inquiry_id uuid;
  observed_at timestamptz := clock_timestamp();
begin
  if p_reason_code not in (
    'verified_rights_request',
    'confirmed_data_corruption',
    'documented_security_incident'
  ) then
    raise exception using
      errcode = '22023',
      message = 'invalid deletion reason';
  end if;

  perform 1
    from homeground_private.inquiries
    where inquiry_id = p_inquiry_id
    for update;

  if not found then
    return false;
  end if;

  insert into homeground_recovery.deletion_tombstones (
    inquiry_id,
    deleted_at,
    reason_code,
    purge_after
  )
  values (
    p_inquiry_id,
    observed_at,
    p_reason_code,
    observed_at + interval '35 days'
  )
  on conflict (inquiry_id) do update
    set
      deleted_at = least(
        homeground_recovery.deletion_tombstones.deleted_at,
        excluded.deleted_at
      ),
      reason_code = excluded.reason_code,
      purge_after = greatest(
        homeground_recovery.deletion_tombstones.purge_after,
        excluded.purge_after
      ),
      replicated_at = null;

  delete from homeground_private.inquiries
    where inquiry_id = p_inquiry_id
    returning inquiry_id into deleted_inquiry_id;

  return deleted_inquiry_id is not null;
end;
$$;

-- After an older backup is restored, operations must first import the
-- independently retained tombstones, call this function, and only then
-- re-enable Admin reads.
create or replace function
  homeground_recovery.replay_homeground_deletion_tombstones()
returns integer
language plpgsql
security definer
set search_path = pg_catalog, homeground_private, homeground_recovery
as $$
declare
  deleted_count integer;
begin
  delete from homeground_private.inquiries inquiry
    using homeground_recovery.deletion_tombstones tombstone
    where inquiry.inquiry_id = tombstone.inquiry_id;

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

-- Claims first terminalize jobs beyond the absolute retry deadline and never
-- lease them again.
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
      where candidate.retry_deadline_at > now()
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
    inquiry.contact_email,
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

create or replace function public.finish_homeground_notification_job(
  p_job_id uuid,
  p_lease_token uuid,
  p_expected_row_version bigint,
  p_accepted boolean,
  p_terminal boolean,
  p_provider_message_id text,
  p_error_code text,
  p_next_attempt_at timestamptz
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  current_job homeground_private.notification_outbox%rowtype;
  retry_deadline_exceeded boolean;
begin
  select *
    into current_job
    from homeground_private.notification_outbox
    where job_id = p_job_id
      and status = 'processing'
      and lease_token = p_lease_token
      and row_version = p_expected_row_version
    for update;

  if not found then
    return false;
  end if;

  retry_deadline_exceeded :=
    not p_accepted
    and (
      current_job.retry_deadline_at <= now()
      or (
        not p_terminal
        and coalesce(
          p_next_attempt_at,
          now() + interval '5 minutes'
        ) >= current_job.retry_deadline_at
      )
    );

  update homeground_private.notification_outbox
    set
      status = case
        when p_accepted then 'accepted'
        when p_terminal or retry_deadline_exceeded then 'failed'
        else 'pending'
      end,
      next_attempt_at = case
        when p_accepted or p_terminal or retry_deadline_exceeded
          then next_attempt_at
        else coalesce(p_next_attempt_at, now() + interval '5 minutes')
      end,
      lease_until = null,
      leased_by = null,
      lease_token = null,
      provider_message_id = case
        when p_accepted then left(p_provider_message_id, 255)
        else provider_message_id
      end,
      last_error_code = case
        when p_accepted then null
        when retry_deadline_exceeded then 'retry_deadline_exceeded'
        else left(p_error_code, 80)
      end,
      row_version = row_version + 1,
      updated_at = now()
    where job_id = current_job.job_id;

  return true;
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
      and retry_deadline_at > now();

  get diagnostics retried_count = row_count;
  return retried_count;
end;
$$;

revoke all on function
  homeground_private.set_notification_retry_deadline()
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.run_homeground_retention_cleanup()
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_recovery.delete_homeground_inquiry(uuid, text)
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_recovery.replay_homeground_deletion_tombstones()
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.retry_failed_notification_jobs()
  from public, anon, authenticated, service_role;

revoke all on function public.claim_homeground_notification_jobs(
  text,
  integer,
  integer
) from public, anon, authenticated;
revoke all on function public.finish_homeground_notification_job(
  uuid,
  uuid,
  bigint,
  boolean,
  boolean,
  text,
  text,
  timestamptz
) from public, anon, authenticated;

grant execute on function public.claim_homeground_notification_jobs(
  text,
  integer,
  integer
) to service_role;
grant execute on function public.finish_homeground_notification_job(
  uuid,
  uuid,
  bigint,
  boolean,
  boolean,
  text,
  text,
  timestamptz
) to service_role;

do $schedule$
begin
  if exists (
    select 1
      from cron.job
      where jobname = 'homeground-retention-cleanup-daily'
  ) then
    perform cron.unschedule('homeground-retention-cleanup-daily');
  end if;

  -- 19:00 UTC is 03:00 the next day in Asia/Shanghai.
  perform cron.schedule(
    'homeground-retention-cleanup-daily',
    '0 19 * * *',
    'select homeground_private.run_homeground_retention_cleanup();'
  );
end;
$schedule$;

commit;
