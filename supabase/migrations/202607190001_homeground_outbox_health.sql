begin;

-- Non-PII operational health for the independent monitor. A five-minute
-- grace period keeps the one-minute notification schedule from producing a
-- transient alert while still surfacing a stopped worker promptly.
create or replace function public.get_homeground_outbox_health()
returns table (
  pending_count bigint,
  processing_count bigint,
  failed_count bigint,
  overdue_pending_count bigint,
  expired_processing_count bigint
)
language sql
stable
security definer
set search_path = pg_catalog, homeground_private
as $$
  select
    count(*) filter (where outbox.status = 'pending')::bigint,
    count(*) filter (where outbox.status = 'processing')::bigint,
    count(*) filter (where outbox.status = 'failed')::bigint,
    count(*) filter (
      where outbox.status = 'pending'
        and outbox.next_attempt_at <= now() - interval '5 minutes'
    )::bigint,
    count(*) filter (
      where outbox.status = 'processing'
        and outbox.lease_until <= now() - interval '5 minutes'
    )::bigint
  from homeground_private.notification_outbox outbox;
$$;

comment on function public.get_homeground_outbox_health() is
  'Returns aggregate notification outbox health counts without Inquiry IDs, contact details, notes, or other PII.';

revoke all on function public.get_homeground_outbox_health()
  from public, anon, authenticated;
grant execute on function public.get_homeground_outbox_health()
  to service_role;

commit;
