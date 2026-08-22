begin;

-- A valid start_session request reaches this RPC before any credential is
-- signed. The Edge function supplies only secret-keyed subject hashes; neither
-- a raw client IP nor the browser token crosses this database boundary.
create or replace function
  public.consume_homeground_traffic_session_start_rate_limit_v1(
    p_ip_rate_limit_subject_hash text,
    p_global_rate_limit_subject_hash text,
    p_ip_short_rate_limit integer,
    p_ip_daily_rate_limit integer,
    p_global_short_rate_limit integer,
    p_global_daily_rate_limit integer
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  ip_rate_limit_result jsonb;
  global_rate_limit_result jsonb;
  retry_after integer := 0;
begin
  if p_ip_rate_limit_subject_hash is null
    or p_ip_rate_limit_subject_hash !~ '^[0-9a-f]{64}$'
    or p_global_rate_limit_subject_hash is null
    or p_global_rate_limit_subject_hash !~ '^[0-9a-f]{64}$'
    or p_ip_short_rate_limit is null
    or p_ip_short_rate_limit not between 1 and 20000
    or p_ip_daily_rate_limit is null
    or p_ip_daily_rate_limit not between 1 and 100000
    or p_ip_short_rate_limit > p_ip_daily_rate_limit
    or p_global_short_rate_limit is null
    or p_global_short_rate_limit not between 1 and 20000
    or p_global_daily_rate_limit is null
    or p_global_daily_rate_limit not between 1 and 100000
    or p_global_short_rate_limit > p_global_daily_rate_limit
  then
    raise exception using
      errcode = '22023',
      message = 'invalid traffic session-start rate-limit input';
  end if;

  -- consume_traffic_rate_limit takes an advisory lock per subject, increments
  -- both windows even when the request crosses a limit, and refreshes
  -- updated_at on conflict. Every valid bootstrap therefore costs one request
  -- in both the IP and whole-site dimensions; rotating browser tokens cannot
  -- bypass either dimension.
  ip_rate_limit_result :=
    homeground_private.consume_traffic_rate_limit(
      p_ip_rate_limit_subject_hash,
      p_ip_short_rate_limit,
      p_ip_daily_rate_limit,
      1
    );
  global_rate_limit_result :=
    homeground_private.consume_traffic_rate_limit(
      p_global_rate_limit_subject_hash,
      p_global_short_rate_limit,
      p_global_daily_rate_limit,
      1
    );

  retry_after := greatest(
    coalesce(
      (ip_rate_limit_result ->> 'retryAfter')::integer,
      0
    ),
    coalesce(
      (global_rate_limit_result ->> 'retryAfter')::integer,
      0
    )
  );

  if retry_after > 0 then
    return jsonb_build_object(
      'outcome', 'rate_limited',
      'retryAfter', greatest(retry_after, 1)
    );
  end if;

  return jsonb_build_object('outcome', 'allowed');
end;
$$;

revoke all on function
  public.consume_homeground_traffic_session_start_rate_limit_v1(
    text,
    text,
    integer,
    integer,
    integer,
    integer
  ) from public, anon, authenticated;
grant execute on function
  public.consume_homeground_traffic_session_start_rate_limit_v1(
    text,
    text,
    integer,
    integer,
    integer,
    integer
  ) to service_role;

comment on function
  public.consume_homeground_traffic_session_start_rate_limit_v1(
    text,
    text,
    integer,
    integer,
    integer,
    integer
  ) is
  'Consumes one validated credential-bootstrap request against secret-keyed IP and whole-site limits before a traffic session credential is issued.';

-- Exercise INSERT, ON CONFLICT UPDATE and denied-request accounting during the
-- migration. A rejected bootstrap remains charged so sustained abuse cannot
-- hover at the threshold without refreshing updated_at.
do $session_start_rate_limit_regression$
declare
  test_ip_hash constant text := repeat('e', 63) || '1';
  test_global_hash constant text := repeat('e', 63) || '2';
  test_started_at timestamptz := clock_timestamp();
  first_result jsonb;
  second_result jsonb;
begin
  delete from homeground_private.traffic_rate_limit_buckets
    where subject_hash in (test_ip_hash, test_global_hash);

  first_result :=
    public.consume_homeground_traffic_session_start_rate_limit_v1(
      test_ip_hash,
      test_global_hash,
      1,
      1,
      1,
      1
    );
  second_result :=
    public.consume_homeground_traffic_session_start_rate_limit_v1(
      test_ip_hash,
      test_global_hash,
      1,
      1,
      1,
      1
    );

  if first_result ->> 'outcome' <> 'allowed'
    or second_result ->> 'outcome' <> 'rate_limited'
    or coalesce((second_result ->> 'retryAfter')::integer, 0) < 1
    or (
      select count(*)
        from homeground_private.traffic_rate_limit_buckets
        where subject_hash in (test_ip_hash, test_global_hash)
    ) <> 4
    or exists (
      select 1
        from homeground_private.traffic_rate_limit_buckets
        where subject_hash in (test_ip_hash, test_global_hash)
          and (
            request_count <> 2
            or updated_at < test_started_at
          )
    )
  then
    raise exception using
      errcode = 'P0001',
      message = 'traffic session-start rate-limit regression failed';
  end if;

  delete from homeground_private.traffic_rate_limit_buckets
    where subject_hash in (test_ip_hash, test_global_hash);
end;
$session_start_rate_limit_regression$;

-- Keep the two privacy boundaries explicit: rate-limit buckets are removed
-- from updated_at after 24 hours, while raw sessions/events and reversible
-- session associations retain their existing 30-day expiry.
do $traffic_retention_contract$
begin
  if position(
      '24 hours' in pg_get_functiondef(
        'homeground_private.purge_expired_traffic_rate_limit_buckets_v1()'::regprocedure
      )
    ) = 0
    or position(
      '30 days' in pg_get_functiondef(
        'homeground_private.purge_expired_homeground_traffic_v1()'::regprocedure
      )
    ) = 0
  then
    raise exception using
      errcode = 'P0001',
      message = 'traffic retention contract regression failed';
  end if;
end;
$traffic_retention_contract$;

commit;
