begin;

-- Production-only, repeat-safe data maintenance.
-- The owner and a read-only Gmail audit verified every public reference below
-- from its matching Homeground notification as a QA/test submission. Do not
-- replace this exact set with email, phone, locale, note-text, or date-range
-- matching.
do $mark_known_tests$
declare
  expected_references constant text[] := array[
    'HG-RRRS-MAYF-E33W',
    'HG-CTM2-3YE5-CW3Q',
    'HG-WPZG-U4XK-KT8N',
    'HG-R2HQ-WRPA-PB3R',
    'HG-DVJS-XWYQ-Z64P',
    'HG-CPZ5-JQ4M-XAHA',
    'HG-4LUJ-YNE2-9JSU',
    'HG-WLTK-KELU-QUWD',
    'HG-GJ24-65MQ-MT9M',
    'HG-JSLN-MQ2L-NDEY',
    'HG-RAKP-AD42-43KV'
  ];
  expected_sorted text[];
  found_sorted text[];
  marked_sorted text[];
  existing_batch_conflicts bigint;
begin
  select array_agg(reference order by reference)
    into expected_sorted
    from unnest(expected_references) as expected(reference);

  if cardinality(expected_references) <> 11
    or cardinality(expected_sorted)
      <> (
        select count(distinct reference)
        from unnest(expected_references) as unique_expected(reference)
      )
  then
    raise exception using
      errcode = 'P0001',
      message = 'known-test maintenance set must contain 11 unique references';
  end if;

  select array_agg(inquiry.public_reference order by inquiry.public_reference)
    into found_sorted
    from homeground_private.inquiries inquiry
    where inquiry.public_reference = any(expected_references);

  if found_sorted is distinct from expected_sorted then
    raise exception using
      errcode = 'P0001',
      message = 'known-test references do not exactly match production inquiries';
  end if;

  select count(*)::bigint
    into existing_batch_conflicts
    from homeground_private.inquiry_test_markers marker
    join homeground_private.inquiries inquiry
      on inquiry.inquiry_id = marker.inquiry_id
    where inquiry.public_reference = any(expected_references)
      and (
        marker.reason_code <> 'verified_test_submission'
        or marker.marker_batch <> 'known-tests-2026-07-26'
      );

  if existing_batch_conflicts <> 0 then
    raise exception using
      errcode = 'P0001',
      message = 'known-test inquiry already has a conflicting marker';
  end if;

  insert into homeground_private.inquiry_test_markers (
    inquiry_id,
    reason_code,
    marker_batch
  )
  select
    inquiry.inquiry_id,
    'verified_test_submission',
    'known-tests-2026-07-26'
  from homeground_private.inquiries inquiry
  where inquiry.public_reference = any(expected_references)
  on conflict (inquiry_id) do nothing;

  select array_agg(inquiry.public_reference order by inquiry.public_reference)
    into marked_sorted
    from homeground_private.inquiry_test_markers marker
    join homeground_private.inquiries inquiry
      on inquiry.inquiry_id = marker.inquiry_id
    where marker.marker_batch = 'known-tests-2026-07-26';

  if marked_sorted is distinct from expected_sorted then
    raise exception using
      errcode = 'P0001',
      message = 'known-test marker batch does not exactly match the verified set';
  end if;
end;
$mark_known_tests$;

commit;
