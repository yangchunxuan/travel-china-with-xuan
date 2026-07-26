begin;

-- Test classification is stored separately from the traveller submission.
-- This preserves the original inquiry and notification audit trail while
-- preventing known QA records from being mistaken for business activity.
create table if not exists homeground_private.inquiry_test_markers (
  inquiry_id uuid primary key
    references homeground_private.inquiries(inquiry_id)
    on delete cascade,
  reason_code text not null
    check (reason_code = 'verified_test_submission'),
  marker_batch text not null
    check (marker_batch ~ '^[a-z0-9][a-z0-9-]{2,63}$'),
  marked_at timestamptz not null default clock_timestamp()
);

create index if not exists inquiry_test_markers_marked_at_idx
  on homeground_private.inquiry_test_markers(marked_at);

alter table homeground_private.inquiry_test_markers
  enable row level security;
alter table homeground_private.inquiry_test_markers
  force row level security;

revoke all on table homeground_private.inquiry_test_markers
  from public, anon, authenticated, service_role;

comment on table homeground_private.inquiry_test_markers is
  'Private, owner-maintained audit markers for inquiries independently verified as tests. Original inquiry and outbox rows remain unchanged.';

create or replace view homeground_private.non_test_inquiries
with (security_barrier = true)
as
select inquiry.*
from homeground_private.inquiries inquiry
where not exists (
  select 1
  from homeground_private.inquiry_test_markers marker
  where marker.inquiry_id = inquiry.inquiry_id
);

revoke all on table homeground_private.non_test_inquiries
  from public, anon, authenticated, service_role;

comment on view homeground_private.non_test_inquiries is
  'Canonical private source for business reporting. It excludes only inquiries carrying a verified test marker and does not claim the remaining rows are unique people or customers. Operational intake, outbox, failure, and retention health must continue to read the physical tables.';

-- This small aggregate is the production verification surface. It deliberately
-- says "saved submissions", not people, leads, customers, or sales.
create or replace function public.get_homeground_inquiry_classification_summary()
returns table (
  total_saved_submissions bigint,
  verified_test_submissions bigint,
  non_test_saved_submissions bigint
)
language sql
stable
security definer
set search_path = pg_catalog, homeground_private
as $$
  select
    (
      select count(*)::bigint
      from homeground_private.inquiries
    ) as total_saved_submissions,
    (
      select count(*)::bigint
      from homeground_private.inquiry_test_markers
    ) as verified_test_submissions,
    (
      select count(*)::bigint
      from homeground_private.non_test_inquiries
    ) as non_test_saved_submissions;
$$;

comment on function public.get_homeground_inquiry_classification_summary() is
  'Returns aggregate saved-submission classification counts only. Non-test does not mean unique person, qualified lead, customer, or sale.';

revoke all on function public.get_homeground_inquiry_classification_summary()
  from public, anon, authenticated;
grant execute on function public.get_homeground_inquiry_classification_summary()
  to service_role;

commit;
