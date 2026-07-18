begin;

-- The public Privacy Notice uses secret-keyed identifiers for 24-hour
-- rate-limit windows and schedules deletion after expiry. Purge independently
-- of new form traffic so an idle project cannot leave expired buckets behind
-- indefinitely.
create extension if not exists pg_cron with schema pg_catalog;

-- PostgreSQL treats CURRENT_TIME as a SQL value expression. Do not reuse that
-- spelling as a PL/pgSQL variable: production then resolves UPDATE assignments
-- as time-with-time-zone instead of timestamptz and raises 42804.
create or replace function homeground_private.consume_inquiry_rate_limit(
  p_subject_hash text,
  p_short_limit integer,
  p_daily_limit integer
)
returns jsonb
language plpgsql
set search_path = pg_catalog, homeground_private
as $$
declare
  observed_at timestamptz := clock_timestamp();
  short_window_seconds constant integer := 600;
  daily_window_seconds constant integer := 86400;
  short_bucket timestamptz;
  daily_bucket timestamptz;
  short_count integer;
  daily_count integer;
  retry_after integer := 0;
begin
  if p_subject_hash !~ '^[0-9a-f]{64}$'
    or p_short_limit < 1
    or p_daily_limit < 1
  then
    raise exception using
      errcode = '22023',
      message = 'invalid rate-limit input';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_subject_hash, 1));

  short_bucket := to_timestamp(
    floor(extract(epoch from observed_at) / short_window_seconds)
      * short_window_seconds
  );
  daily_bucket := to_timestamp(
    floor(extract(epoch from observed_at) / daily_window_seconds)
      * daily_window_seconds
  );

  insert into homeground_private.inquiry_rate_limit_buckets (
    subject_hash,
    window_seconds,
    bucket_started_at,
    request_count
  )
  values (p_subject_hash, short_window_seconds, short_bucket, 1)
  on conflict (subject_hash, window_seconds, bucket_started_at)
  do update set
    request_count =
      homeground_private.inquiry_rate_limit_buckets.request_count + 1,
    updated_at = observed_at
  returning request_count into short_count;

  insert into homeground_private.inquiry_rate_limit_buckets (
    subject_hash,
    window_seconds,
    bucket_started_at,
    request_count
  )
  values (p_subject_hash, daily_window_seconds, daily_bucket, 1)
  on conflict (subject_hash, window_seconds, bucket_started_at)
  do update set
    request_count =
      homeground_private.inquiry_rate_limit_buckets.request_count + 1,
    updated_at = observed_at
  returning request_count into daily_count;

  if short_count > p_short_limit then
    retry_after := greatest(
      retry_after,
      ceil(
        extract(
          epoch from short_bucket
            + make_interval(secs => short_window_seconds)
            - observed_at
        )
      )::integer
    );
  end if;

  if daily_count > p_daily_limit then
    retry_after := greatest(
      retry_after,
      ceil(
        extract(
          epoch from daily_bucket
            + make_interval(secs => daily_window_seconds)
            - observed_at
        )
      )::integer
    );
  end if;

  delete from homeground_private.inquiry_rate_limit_buckets
    where updated_at <= observed_at - interval '24 hours';

  return jsonb_build_object(
    'allowed', retry_after = 0,
    'retryAfter', greatest(retry_after, 0)
  );
end;
$$;

revoke all on function homeground_private.consume_inquiry_rate_limit(
  text,
  integer,
  integer
) from public, anon, authenticated;

-- Exercise both INSERT and ON CONFLICT UPDATE paths during migration. The
-- second call reproduces the production 42804 failure if a SQL CURRENT_TIME
-- expression is accidentally used in the timestamptz assignment again.
do $rate_limit_regression$
declare
  test_subject_hash constant text := repeat('0', 63) || '1';
  first_result jsonb;
  second_result jsonb;
begin
  first_result := homeground_private.consume_inquiry_rate_limit(
    test_subject_hash,
    100,
    1000
  );
  second_result := homeground_private.consume_inquiry_rate_limit(
    test_subject_hash,
    100,
    1000
  );

  if not coalesce((first_result ->> 'allowed')::boolean, false)
    or not coalesce((second_result ->> 'allowed')::boolean, false)
    or (
      select count(*)
      from homeground_private.inquiry_rate_limit_buckets
      where subject_hash = test_subject_hash
    ) <> 2
    or exists (
      select 1
      from homeground_private.inquiry_rate_limit_buckets
      where subject_hash = test_subject_hash
        and request_count <> 2
    )
  then
    raise exception using
      errcode = 'P0001',
      message = 'rate-limit regression check failed';
  end if;

  delete from homeground_private.inquiry_rate_limit_buckets
    where subject_hash = test_subject_hash;
end;
$rate_limit_regression$;

create or replace function
  homeground_private.purge_expired_inquiry_rate_limit_buckets()
returns integer
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  deleted_count integer;
begin
  delete from homeground_private.inquiry_rate_limit_buckets
    where updated_at <= now() - interval '24 hours';

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

revoke all on function
  homeground_private.purge_expired_inquiry_rate_limit_buckets()
  from public, anon, authenticated, service_role;

do $$
begin
  if exists (
    select 1
      from cron.job
      where jobname = 'homeground-purge-rate-limit-buckets'
  ) then
    perform cron.unschedule('homeground-purge-rate-limit-buckets');
  end if;

  perform cron.schedule(
    'homeground-purge-rate-limit-buckets',
    '* * * * *',
    'select homeground_private.purge_expired_inquiry_rate_limit_buckets();'
  );
end;
$$;

commit;
