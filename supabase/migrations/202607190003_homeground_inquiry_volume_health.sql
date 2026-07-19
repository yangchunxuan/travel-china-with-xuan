begin;

-- Extend the authenticated non-PII health snapshot with rolling intake
-- volumes. These counts let the independent monitor detect a successful spam
-- flood even when every notification is accepted by the email provider.
drop function public.get_homeground_outbox_health();

create function public.get_homeground_outbox_health()
returns table (
  pending_count bigint,
  processing_count bigint,
  failed_count bigint,
  overdue_pending_count bigint,
  expired_processing_count bigint,
  created_last_10_minutes bigint,
  created_last_1_hour bigint,
  created_last_24_hours bigint
)
language sql
stable
security definer
set search_path = pg_catalog, homeground_private
as $$
  select
    outbox_counts.pending_count,
    outbox_counts.processing_count,
    outbox_counts.failed_count,
    outbox_counts.overdue_pending_count,
    outbox_counts.expired_processing_count,
    inquiry_counts.created_last_10_minutes,
    inquiry_counts.created_last_1_hour,
    inquiry_counts.created_last_24_hours
  from (
    select
      count(*) filter (where outbox.status = 'pending')::bigint
        as pending_count,
      count(*) filter (where outbox.status = 'processing')::bigint
        as processing_count,
      count(*) filter (where outbox.status = 'failed')::bigint
        as failed_count,
      count(*) filter (
        where outbox.status = 'pending'
          and outbox.next_attempt_at <= now() - interval '5 minutes'
      )::bigint as overdue_pending_count,
      count(*) filter (
        where outbox.status = 'processing'
          and outbox.lease_until <= now() - interval '5 minutes'
      )::bigint as expired_processing_count
    from homeground_private.notification_outbox outbox
  ) outbox_counts
  cross join (
    select
      count(*) filter (
        where inquiry.created_at >= now() - interval '10 minutes'
      )::bigint as created_last_10_minutes,
      count(*) filter (
        where inquiry.created_at >= now() - interval '1 hour'
      )::bigint as created_last_1_hour,
      count(*) filter (
        where inquiry.created_at >= now() - interval '24 hours'
      )::bigint as created_last_24_hours
    from homeground_private.inquiries inquiry
    where inquiry.created_at >= now() - interval '24 hours'
  ) inquiry_counts;
$$;

comment on function public.get_homeground_outbox_health() is
  'Returns aggregate outbox and rolling intake counts without Inquiry IDs, contact details, notes, or other PII.';

revoke all on function public.get_homeground_outbox_health()
  from public, anon, authenticated;
grant execute on function public.get_homeground_outbox_health()
  to service_role;

commit;
