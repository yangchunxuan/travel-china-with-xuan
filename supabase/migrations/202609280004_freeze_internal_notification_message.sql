begin;
-- The staff suppression warning can change between attempts. Persist the first
-- envelope so uncertain Resend retries keep the same key AND identical body.
-- It follows the existing notification-outbox retention/deletion policy.
alter table homeground_private.notification_outbox add column message_json jsonb;
create function public.freeze_homeground_notification_message_v1(
  p_job_id uuid, p_lease_token uuid, p_row_version bigint, p_message jsonb
) returns jsonb language plpgsql security definer
set search_path = pg_catalog, homeground_private as $$
declare frozen jsonb;
begin
  if jsonb_typeof(p_message)<>'object' or octet_length(p_message::text)>131072 then
    raise exception using errcode='22023',message='invalid notification message';
  end if;
  update homeground_private.notification_outbox set message_json=coalesce(message_json,p_message)
    where job_id=p_job_id and lease_token=p_lease_token and row_version=p_row_version
      and status='processing' and lease_until>now()
    returning message_json into frozen;
  return frozen;
end;
$$;
revoke all on function public.freeze_homeground_notification_message_v1(uuid,uuid,bigint,jsonb) from public, anon, authenticated;
grant execute on function public.freeze_homeground_notification_message_v1(uuid,uuid,bigint,jsonb) to service_role;
commit;
