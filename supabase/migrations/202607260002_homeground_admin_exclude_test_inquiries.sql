begin;

-- The full admin read model is currently optional and may not exist in every
-- environment. This migration must be applied only after that read model.
-- Failing instead of silently skipping prevents migration history from saying
-- the exclusion is installed when a later admin deployment could bypass it.
--
-- Rewrite only the business-insight function so all content/product metrics
-- use the canonical non-test source.
--
-- Admin health is intentionally not rewritten: raw intake, outbox, failure,
-- retention and corruption checks must continue to see every physical row,
-- including QA. CREATE OR REPLACE preserves existing ownership and grants.
do $admin_test_exclusion$
declare
  insights_definition text;
begin
  if to_regprocedure('public.get_homeground_admin_insights()') is null
    or to_regprocedure('public.get_homeground_admin_health()') is null
  then
    raise exception using
      errcode = 'P0001',
      message = 'admin read model must be installed before test exclusion';
  end if;

  select pg_get_functiondef(
    'public.get_homeground_admin_insights()'::regprocedure
  )
  into insights_definition;

  if position(
    'homeground_private.non_test_inquiries'
    in insights_definition
  ) > 0 then
    -- Repeat-safe for environments where this SQL was applied manually before
    -- the migration ledger catches up.
    null;
  elsif position(
    'homeground_private.inquiries'
    in insights_definition
  ) > 0 then
    insights_definition := replace(
      insights_definition,
      'homeground_private.inquiries',
      'homeground_private.non_test_inquiries'
    );
    insights_definition := replace(
      insights_definition,
      'Saved submissions, not unique people, customers, or market share.',
      'Saved submissions excluding verified tests; not unique people, customers, or market share.'
    );

    execute insights_definition;
  else
    raise exception using
      errcode = 'P0001',
      message = 'admin insights source contract not found';
  end if;

  select pg_get_functiondef(
    'public.get_homeground_admin_insights()'::regprocedure
  )
  into insights_definition;

  if position(
    'homeground_private.inquiries'
    in insights_definition
  ) > 0
    or position(
      'homeground_private.non_test_inquiries'
      in insights_definition
    ) = 0
  then
    raise exception using
      errcode = 'P0001',
      message = 'admin insights test exclusion was not installed';
  end if;
end;
$admin_test_exclusion$;

commit;
