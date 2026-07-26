begin;

-- Emergency rollback for the one fixed marker batch. It removes no Inquiry,
-- outbox row, email, contact value or note. Abort if the current batch is not
-- exactly the reviewed 11-reference set.
do $unmark_known_tests$
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
  marked_sorted text[];
  deleted_markers integer;
begin
  select array_agg(reference order by reference)
    into expected_sorted
    from unnest(expected_references) as expected(reference);

  select array_agg(inquiry.public_reference order by inquiry.public_reference)
    into marked_sorted
    from homeground_private.inquiry_test_markers marker
    join homeground_private.inquiries inquiry
      on inquiry.inquiry_id = marker.inquiry_id
    where marker.marker_batch = 'known-tests-2026-07-26'
      and marker.reason_code = 'verified_test_submission';

  if cardinality(expected_references) <> 11
    or marked_sorted is distinct from expected_sorted
  then
    raise exception using
      errcode = 'P0001',
      message = 'known-test rollback batch does not exactly match reviewed set';
  end if;

  delete from homeground_private.inquiry_test_markers marker
  using homeground_private.inquiries inquiry
  where marker.inquiry_id = inquiry.inquiry_id
    and marker.marker_batch = 'known-tests-2026-07-26'
    and marker.reason_code = 'verified_test_submission'
    and inquiry.public_reference = any(expected_references);

  get diagnostics deleted_markers = row_count;

  if deleted_markers <> 11
    or exists (
      select 1
      from homeground_private.inquiry_test_markers marker
      where marker.marker_batch = 'known-tests-2026-07-26'
    )
  then
    raise exception using
      errcode = 'P0001',
      message = 'known-test rollback did not remove exactly 11 markers';
  end if;
end;
$unmark_known_tests$;

commit;
