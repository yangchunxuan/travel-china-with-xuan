begin;

-- Supabase-hosted scheduling: pg_cron keeps the cadence and pg_net invokes
-- the Edge Function without exposing the worker secret to the website.
create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

create or replace function homeground_private.assert_notification_worker_configuration()
returns void
language plpgsql
security definer
set search_path = pg_catalog, homeground_private, vault
as $$
declare
  worker_url text;
  worker_secret text;
  worker_url_count integer;
  worker_secret_count integer;
begin
  select count(*), min(decrypted_secret)
    into worker_url_count, worker_url
    from vault.decrypted_secrets
    where name = 'homeground_notification_worker_url';

  select count(*), min(decrypted_secret)
    into worker_secret_count, worker_secret
    from vault.decrypted_secrets
    where name = 'homeground_notification_worker_secret';

  if worker_url_count <> 1
    or worker_url is null
    or worker_url !~ '^https://[^/?#]+/functions/v1/notify-inquiries$'
    or worker_url ~ E'[\\r\\n]'
  then
    raise exception using
      errcode = '22023',
      message = 'Homeground notification worker URL is not configured';
  end if;

  if worker_secret_count <> 1
    or worker_secret is null
    or length(worker_secret) < 32
    or length(worker_secret) > 512
    or worker_secret ~ E'[\\r\\n]'
  then
    raise exception using
      errcode = '22023',
      message = 'Homeground notification worker secret is not configured';
  end if;
end;
$$;

create or replace function homeground_private.dispatch_notification_worker()
returns bigint
language plpgsql
security definer
set search_path = pg_catalog, extensions, homeground_private, vault
as $$
declare
  worker_url text;
  worker_secret text;
  request_id bigint;
begin
  perform homeground_private.assert_notification_worker_configuration();

  select decrypted_secret
    into worker_url
    from vault.decrypted_secrets
    where name = 'homeground_notification_worker_url'
    limit 1;

  select decrypted_secret
    into worker_secret
    from vault.decrypted_secrets
    where name = 'homeground_notification_worker_secret'
    limit 1;

  select net.http_post(
    url := worker_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-worker-secret', worker_secret
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 10000
  )
  into request_id;

  return request_id;
end;
$$;

create or replace function homeground_private.configure_notification_schedule()
returns bigint
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  scheduled_job_id bigint;
begin
  -- Refuse to create a cron job until both Vault values are present and safe.
  perform homeground_private.assert_notification_worker_configuration();

  if exists (
    select 1
      from cron.job
      where jobname = 'homeground-notify-inquiries-every-minute'
  ) then
    perform cron.unschedule('homeground-notify-inquiries-every-minute');
  end if;

  select cron.schedule(
    'homeground-notify-inquiries-every-minute',
    '* * * * *',
    'select homeground_private.dispatch_notification_worker();'
  )
  into scheduled_job_id;

  return scheduled_job_id;
end;
$$;

revoke all on function
  homeground_private.assert_notification_worker_configuration()
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.dispatch_notification_worker()
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.configure_notification_schedule()
  from public, anon, authenticated, service_role;

commit;
