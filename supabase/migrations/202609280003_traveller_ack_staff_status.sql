begin;
-- Internal follow-up guard only. Never returned by the public intake endpoint.
create function public.get_homeground_traveller_ack_staff_status_v1(p_inquiry_id uuid)
returns jsonb language sql stable security definer
set search_path = pg_catalog, homeground_private as $$
  select jsonb_build_object('stopReason', s.reason, 'deliveryStatus', o.delivery_status)
  from homeground_private.traveller_ack_outbox o
  left join homeground_private.traveller_ack_suppressions s using(recipient_hash)
  where o.inquiry_id = p_inquiry_id;
$$;
revoke all on function public.get_homeground_traveller_ack_staff_status_v1(uuid) from public, anon, authenticated;
grant execute on function public.get_homeground_traveller_ack_staff_status_v1(uuid) to service_role;
commit;
