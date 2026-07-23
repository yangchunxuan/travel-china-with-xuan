begin;

-- Compatibility is data, not an implicit cast. Each metric explicitly names
-- the schema, entry path, form version, and rule version it can interpret.
create table if not exists
  homeground_private.admin_metric_compatibility (
    metric_id text not null,
    schema_version smallint not null,
    entry_path text not null,
    form_version text not null,
    rule_version text not null,
    primary key (
      metric_id,
      schema_version,
      entry_path,
      form_version,
      rule_version
    ),
    constraint admin_metric_id_check check (
      metric_id in (
        'destination_selections',
        'trip_duration',
        'party',
        'pace',
        'stay_time_reference_match',
        'must_see_selections',
        'reply_channel_choice',
        'form_locale'
      )
    )
  );

alter table homeground_private.admin_metric_compatibility
  enable row level security;
alter table homeground_private.admin_metric_compatibility
  force row level security;

revoke all on homeground_private.admin_metric_compatibility
  from public, anon, authenticated, service_role;

-- This is an operator-access ledger, not customer telemetry. It stores only
-- the authenticated administrator UUID, one fixed endpoint, one fixed
-- outcome, and a database timestamp. It never stores request or response
-- bodies, customer values, query strings, IP addresses, or User-Agent.
create table if not exists homeground_private.admin_access_log (
  access_id bigint generated always as identity primary key,
  admin_user_id uuid not null,
  endpoint text not null check (
    endpoint in ('admin-insights', 'admin-health')
  ),
  result text not null check (
    result in ('success', 'summary_unavailable', 'contract_rejected')
  ),
  occurred_at timestamptz not null default clock_timestamp()
);

create index if not exists admin_access_log_retention_idx
  on homeground_private.admin_access_log(occurred_at);

alter table homeground_private.admin_access_log
  enable row level security;
alter table homeground_private.admin_access_log
  force row level security;

revoke all on homeground_private.admin_access_log
  from public, anon, authenticated, service_role;

create or replace function public.record_homeground_admin_access(
  p_admin_user_id uuid,
  p_endpoint text,
  p_result text
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
begin
  if p_admin_user_id is null
    or p_endpoint not in ('admin-insights', 'admin-health')
    or p_result not in (
      'success',
      'summary_unavailable',
      'contract_rejected'
    )
  then
    raise exception using
      errcode = '22023',
      message = 'invalid admin access audit input';
  end if;

  insert into homeground_private.admin_access_log (
    admin_user_id,
    endpoint,
    result
  )
  values (
    p_admin_user_id,
    p_endpoint,
    p_result
  );

  return true;
end;
$$;

create or replace function public.prune_homeground_admin_access_log()
returns integer
language plpgsql
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  deleted_count integer;
begin
  delete from homeground_private.admin_access_log
    where occurred_at <= clock_timestamp() - interval '30 days';

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

comment on function public.record_homeground_admin_access(
  uuid,
  text,
  text
) is
  'Records one fixed, body-free Admin access outcome using server time.';
comment on function public.prune_homeground_admin_access_log() is
  'Deletes Admin access-ledger rows after the fixed 30-day TTL.';

revoke all on function public.record_homeground_admin_access(
  uuid,
  text,
  text
) from public, anon, authenticated;
revoke all on function public.prune_homeground_admin_access_log()
  from public, anon, authenticated;

grant execute on function public.record_homeground_admin_access(
  uuid,
  text,
  text
) to service_role;
grant execute on function public.prune_homeground_admin_access_log()
  to service_role;

insert into homeground_private.admin_metric_compatibility (
  metric_id,
  schema_version,
  entry_path,
  form_version,
  rule_version
)
select
  metric.metric_id,
  1,
  'generated_route',
  '2026-07-18.1',
  '2026-07-17.1'
from unnest(array[
  'trip_duration',
  'reply_channel_choice',
  'form_locale'
]) as metric(metric_id)
on conflict do nothing;

insert into homeground_private.admin_metric_compatibility (
  metric_id,
  schema_version,
  entry_path,
  form_version,
  rule_version
)
select
  metric.metric_id,
  2,
  'destination_timing',
  form.form_version,
  '2026-07-19.1'
from unnest(array[
  'destination_selections',
  'trip_duration',
  'party',
  'pace',
  'stay_time_reference_match',
  'must_see_selections',
  'reply_channel_choice',
  'form_locale'
]) as metric(metric_id)
cross join unnest(array[
  '2026-07-19.1',
  '2026-07-20.1',
  '2026-07-20.2',
  '2026-07-21.1'
]) as form(form_version)
on conflict do nothing;

create or replace function
  homeground_private.is_homeground_controlled_string_array(
    p_value jsonb,
    p_allowed_values text[],
    p_maximum_items integer
  )
returns boolean
language plpgsql
immutable
set search_path = pg_catalog
as $$
declare
  item jsonb;
  item_text text;
  seen_values text[] := '{}'::text[];
begin
  -- Keep the type check separate from jsonb_array_length. PostgreSQL does
  -- not promise boolean-expression evaluation order, and
  -- jsonb_array_length(non-array) raises instead of producing Unknown.
  if p_value is null or jsonb_typeof(p_value) <> 'array' then
    return false;
  end if;

  if jsonb_array_length(p_value) > p_maximum_items then
    return false;
  end if;

  for item in
    select value
      from jsonb_array_elements(p_value)
  loop
    if jsonb_typeof(item) <> 'string' then
      return false;
    end if;

    item_text := item #>> '{}';
    if not item_text = any(p_allowed_values)
      or item_text = any(seen_values)
    then
      return false;
    end if;
    seen_values := array_append(seen_values, item_text);
  end loop;

  return true;
end;
$$;

create or replace function
  homeground_private.is_homeground_controlled_string_array_subset(
    p_subset jsonb,
    p_superset jsonb,
    p_allowed_values text[],
    p_subset_maximum_items integer,
    p_superset_maximum_items integer
  )
returns boolean
language plpgsql
immutable
set search_path = pg_catalog, homeground_private
as $$
declare
  item jsonb;
  item_text text;
begin
  if not homeground_private.is_homeground_controlled_string_array(
    p_subset,
    p_allowed_values,
    p_subset_maximum_items
  ) then
    return false;
  end if;

  if not homeground_private.is_homeground_controlled_string_array(
    p_superset,
    p_allowed_values,
    p_superset_maximum_items
  ) then
    return false;
  end if;

  for item in
    select value
      from jsonb_array_elements(p_subset)
  loop
    item_text := item #>> '{}';
    if not (p_superset ? item_text) then
      return false;
    end if;
  end loop;

  return true;
end;
$$;

create or replace function
  homeground_private.get_homeground_metric_compatibility(
    p_metric_id text
  )
returns jsonb
language sql
stable
security definer
set search_path = pg_catalog, homeground_private
as $$
  select jsonb_build_object(
    'compatibilitySets',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'schemaVersion', registry.schema_version::text,
          'entryPath', registry.entry_path,
          'formVersion', registry.form_version,
          'ruleVersion', registry.rule_version
        )
        order by
          registry.schema_version,
          registry.entry_path,
          registry.form_version,
          registry.rule_version
      ),
      '[]'::jsonb
    )
  )
  from homeground_private.admin_metric_compatibility registry
  where registry.metric_id = p_metric_id;
$$;

-- Suppression happens before the Edge Function sees the response. For a
-- mutually exclusive metric with any positive bucket or Unknown below k=5,
-- at least one additional visible complement is suppressed so subtraction
-- cannot reconstruct a sparse value.
create or replace function
  homeground_private.build_homeground_admin_metric(
    p_metric_id text,
    p_label text,
    p_multi_select boolean,
    p_denominator bigint,
    p_unknown bigint,
    p_not_applicable bigint,
    p_bucket_ids text[],
    p_bucket_counts bigint[]
  )
returns jsonb
language plpgsql
stable
security definer
set search_path = pg_catalog, homeground_private
as $$
declare
  bucket_total integer := coalesce(array_length(p_bucket_ids, 1), 0);
  bucket_suppressed boolean[];
  buckets jsonb := '[]'::jsonb;
  compatibility jsonb;
  insufficient_sample boolean :=
    p_denominator < 5
    or p_not_applicable between 1 and 4;
  percentages_visible boolean := p_denominator >= 20;
  unknown_suppressed boolean := false;
  sparse_count integer := 0;
  complement_index integer := 0;
  complement_count bigint := -1;
  not_applicable_value bigint;
  index integer;
  count_value bigint;
  percentage_value numeric;
begin
  if bucket_total = 0
    or bucket_total <> coalesce(array_length(p_bucket_counts, 1), 0)
    or p_denominator < 0
    or p_unknown < 0
    or p_not_applicable < 0
  then
    raise exception using
      errcode = '22023',
      message = 'invalid admin metric input';
  end if;

  compatibility :=
    homeground_private.get_homeground_metric_compatibility(p_metric_id);
  if compatibility -> 'compatibilitySets' = '[]'::jsonb then
    raise exception using
      errcode = '22023',
      message = 'unknown admin metric compatibility';
  end if;

  bucket_suppressed := array_fill(false, array[bucket_total]);

  if insufficient_sample then
    bucket_suppressed := array_fill(true, array[bucket_total]);
    unknown_suppressed := true;
    percentages_visible := false;
  else
    for index in 1..bucket_total loop
      count_value := p_bucket_counts[index];
      if count_value < 0 then
        raise exception using
          errcode = '22023',
          message = 'invalid admin bucket count';
      end if;
      if count_value between 1 and 4 then
        bucket_suppressed[index] := true;
        sparse_count := sparse_count + 1;
      end if;
    end loop;

    if p_unknown between 1 and 4 then
      unknown_suppressed := true;
      sparse_count := sparse_count + 1;
    end if;

    if not p_multi_select and sparse_count >= 1 then
      for index in 1..bucket_total loop
        if not bucket_suppressed[index]
          and p_bucket_counts[index] >= 5
          and p_bucket_counts[index] > complement_count
        then
          complement_index := index;
          complement_count := p_bucket_counts[index];
        end if;
      end loop;

      if not unknown_suppressed
        and p_unknown >= 5
        and p_unknown > complement_count
      then
        complement_index := 0;
        complement_count := p_unknown;
      end if;

      if complement_count >= 5 then
        if complement_index = 0 then
          unknown_suppressed := true;
        else
          bucket_suppressed[complement_index] := true;
        end if;
      else
        -- If every positive category is itself sparse, there is no safe
        -- complementary value to hide. Suppress the entire metric, including
        -- its compatibility denominator, rather than reveal the sparse sum.
        insufficient_sample := true;
        bucket_suppressed := array_fill(true, array[bucket_total]);
        unknown_suppressed := true;
        percentages_visible := false;
      end if;
    end if;
  end if;

  for index in 1..bucket_total loop
    count_value := p_bucket_counts[index];
    percentage_value := case
      when percentages_visible
        and not bucket_suppressed[index]
        and p_denominator > 0
      then round(count_value * 100.0 / p_denominator, 1)
      else null
    end;

    buckets := buckets || jsonb_build_array(jsonb_build_object(
      'id', p_bucket_ids[index],
      'count', case
        when bucket_suppressed[index] then null
        else count_value
      end,
      'percentage', percentage_value,
      'suppressed', bucket_suppressed[index]
    ));
  end loop;

  not_applicable_value := case
    when insufficient_sample then null
    when p_not_applicable between 1 and 4 then null
    else p_not_applicable
  end;

  return jsonb_build_object(
    'id', p_metric_id,
    'label', p_label,
    'multiSelect', p_multi_select,
    'denominator', case
      when insufficient_sample then null
      else p_denominator
    end,
    'unknown', case
      when unknown_suppressed then null
      else p_unknown
    end,
    'notApplicable', not_applicable_value,
    'compatibilitySets', compatibility -> 'compatibilitySets',
    'insufficientSample', insufficient_sample,
    'percentagesVisible', percentages_visible,
    'buckets', buckets
  );
end;
$$;

create or replace function public.get_homeground_admin_insights()
returns table (payload jsonb)
language plpgsql
stable
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  generated_at timestamptz := now();
  window_started_at timestamptz :=
    generated_at - interval '90 days';
  shanghai_today_started_at timestamptz :=
    (
      (generated_at at time zone 'Asia/Shanghai')::date
      at time zone 'Asia/Shanghai'
    );
  retained_today bigint;
  retained_7_days bigint;
  retained_30_days bigint;
  retained_90_days bigint;
  coverage_started_at timestamptz;
  collecting_baseline boolean;
  data_quality_hold_active boolean;
  denominator_count bigint;
  unknown_count bigint;
  not_applicable_count bigint;
  bucket_counts bigint[];
  metrics jsonb := '[]'::jsonb;
  allowed_destination_ids constant text[] := array[
    'beijing-great-wall',
    'shanghai',
    'xian',
    'chengdu',
    'chongqing',
    'zhangjiajie',
    'guilin-yangshuo',
    'hangzhou-suzhou',
    'yunnan-dali-lijiang',
    'guangzhou-shenzhen'
  ];
begin
  select
    count(*) filter (
      where inquiry.created_at >= shanghai_today_started_at
        and inquiry.created_at <= generated_at
    )::bigint,
    count(*) filter (
      where inquiry.created_at >= generated_at - interval '7 days'
        and inquiry.created_at <= generated_at
    )::bigint,
    count(*) filter (
      where inquiry.created_at >= generated_at - interval '30 days'
        and inquiry.created_at <= generated_at
    )::bigint,
    count(*) filter (
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
    )::bigint,
    min(inquiry.created_at) filter (
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
    ),
    not exists (
      select 1
        from homeground_private.inquiries baseline
        where baseline.created_at <= window_started_at
    )
  into
    retained_today,
    retained_7_days,
    retained_30_days,
    retained_90_days,
    coverage_started_at,
    collecting_baseline
  from homeground_private.inquiries inquiry;

  -- With no retained submissions there is no observed start to display, so
  -- retain the approved query boundary. As soon as one record exists, the
  -- UI receives the actual first retained date within the fixed 90-day
  -- query window.
  coverage_started_at :=
    coalesce(coverage_started_at, window_started_at);

  select
    exists (
      select 1
        from homeground_private.data_quality_incidents incident
        where incident.status = 'open'
    )
    or exists (
      select 1
        from homeground_private.inquiries future_inquiry
        where future_inquiry.created_at > generated_at
    )
  into data_quality_hold_active;

  -- Destination selections (Schema 2 only, multi-select).
  with compatible as (
    select inquiry.*
      from homeground_private.inquiries inquiry
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
        and exists (
          select 1
            from homeground_private.admin_metric_compatibility registry
            where registry.metric_id = 'destination_selections'
              and registry.schema_version = inquiry.schema_version
              and registry.entry_path = inquiry.entry_path
              and registry.form_version = inquiry.form_version
              and registry.rule_version = inquiry.rule_version
        )
  ),
  normalized as (
    select
      compatible.*,
      homeground_private.is_homeground_controlled_string_array(
        compatible.answers_json -> 'destinationIds',
        allowed_destination_ids,
        10
      ) as is_valid
    from compatible
  )
  select
    count(*)::bigint,
    count(*) filter (where not is_valid)::bigint,
    array[
      count(*) filter (
        where is_valid
          and answers_json -> 'destinationIds' ? 'beijing-great-wall'
      )::bigint,
      count(*) filter (
        where is_valid and answers_json -> 'destinationIds' ? 'shanghai'
      )::bigint,
      count(*) filter (
        where is_valid and answers_json -> 'destinationIds' ? 'xian'
      )::bigint,
      count(*) filter (
        where is_valid and answers_json -> 'destinationIds' ? 'chengdu'
      )::bigint,
      count(*) filter (
        where is_valid and answers_json -> 'destinationIds' ? 'chongqing'
      )::bigint,
      count(*) filter (
        where is_valid
          and answers_json -> 'destinationIds' ? 'zhangjiajie'
      )::bigint,
      count(*) filter (
        where is_valid
          and answers_json -> 'destinationIds' ? 'guilin-yangshuo'
      )::bigint,
      count(*) filter (
        where is_valid
          and answers_json -> 'destinationIds' ? 'hangzhou-suzhou'
      )::bigint,
      count(*) filter (
        where is_valid
          and answers_json -> 'destinationIds' ? 'yunnan-dali-lijiang'
      )::bigint,
      count(*) filter (
        where is_valid
          and answers_json -> 'destinationIds' ? 'guangzhou-shenzhen'
      )::bigint
    ]
  into denominator_count, unknown_count, bucket_counts
  from normalized;

  not_applicable_count := retained_90_days - denominator_count;
  metrics := metrics || jsonb_build_array(
    homeground_private.build_homeground_admin_metric(
      'destination_selections',
      'Destination selections',
      true,
      denominator_count,
      unknown_count,
      not_applicable_count,
      allowed_destination_ids,
      bucket_counts
    )
  );

  -- Canonical trip duration supports both schemas without mapping Party/Pace.
  with compatible as (
    select inquiry.*
      from homeground_private.inquiries inquiry
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
        and exists (
          select 1
            from homeground_private.admin_metric_compatibility registry
            where registry.metric_id = 'trip_duration'
              and registry.schema_version = inquiry.schema_version
              and registry.entry_path = inquiry.entry_path
              and registry.form_version = inquiry.form_version
              and registry.rule_version = inquiry.rule_version
        )
  ),
  normalized as (
    select
      case
        when schema_version = 1
          and jsonb_typeof(answers_json -> 'nights') = 'string'
          and answers_json ->> 'nights' in ('7', '10', '14', '18')
          and jsonb_typeof(
            route_snapshot_json -> 'totalNights'
          ) = 'number'
          and route_snapshot_json ->> 'totalNights'
            in ('7', '10', '14', '18')
          and route_snapshot_json ->> 'totalNights'
            = answers_json ->> 'nights'
        then (answers_json ->> 'nights')::integer
        when schema_version = 2
          and jsonb_typeof(answers_json -> 'totalNights') = 'number'
          and answers_json ->> 'totalNights' ~ '^[1-9][0-9]?$'
          and jsonb_typeof(
            route_snapshot_json -> 'totalNights'
          ) = 'number'
          and route_snapshot_json ->> 'totalNights'
            ~ '^[1-9][0-9]?$'
          and route_snapshot_json ->> 'totalNights'
            = answers_json ->> 'totalNights'
        then case
          -- The outer CASE proves both values are at most two decimal
          -- digits before either cast is reachable.
          when (answers_json ->> 'totalNights')::integer
            between 1 and 60
            and (route_snapshot_json ->> 'totalNights')::integer
              between 1 and 60
          then (answers_json ->> 'totalNights')::integer
          else null
        end
        else null
      end as total_nights
    from compatible
  )
  select
    count(*)::bigint,
    count(*) filter (where total_nights is null)::bigint,
    array[
      count(*) filter (where total_nights between 1 and 7)::bigint,
      count(*) filter (where total_nights between 8 and 10)::bigint,
      count(*) filter (where total_nights between 11 and 14)::bigint,
      count(*) filter (where total_nights between 15 and 21)::bigint,
      count(*) filter (where total_nights >= 22)::bigint
    ]
  into denominator_count, unknown_count, bucket_counts
  from normalized;

  not_applicable_count := retained_90_days - denominator_count;
  metrics := metrics || jsonb_build_array(
    homeground_private.build_homeground_admin_metric(
      'trip_duration',
      'Trip duration',
      false,
      denominator_count,
      unknown_count,
      not_applicable_count,
      array['1-7', '8-10', '11-14', '15-21', '22-plus'],
      bucket_counts
    )
  );

  -- Schema 2 Party. Schema 1 Party is deliberately Not applicable.
  with compatible as (
    select inquiry.*
      from homeground_private.inquiries inquiry
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
        and exists (
          select 1
            from homeground_private.admin_metric_compatibility registry
            where registry.metric_id = 'party'
              and registry.schema_version = inquiry.schema_version
              and registry.entry_path = inquiry.entry_path
              and registry.form_version = inquiry.form_version
              and registry.rule_version = inquiry.rule_version
        )
  )
  select
    count(*)::bigint,
    count(*) filter (
      where coalesce(answers_json ->> 'party', '') not in (
        'solo',
        'two-adults',
        'family-with-children',
        'older-relatives',
        'multigenerational-family',
        'friends-private-group'
      )
    )::bigint,
    array[
      count(*) filter (where answers_json ->> 'party' = 'solo')::bigint,
      count(*) filter (
        where answers_json ->> 'party' = 'two-adults'
      )::bigint,
      count(*) filter (
        where answers_json ->> 'party' = 'family-with-children'
      )::bigint,
      count(*) filter (
        where answers_json ->> 'party' = 'older-relatives'
      )::bigint,
      count(*) filter (
        where answers_json ->> 'party' = 'multigenerational-family'
      )::bigint,
      count(*) filter (
        where answers_json ->> 'party' = 'friends-private-group'
      )::bigint
    ]
  into denominator_count, unknown_count, bucket_counts
  from compatible;

  not_applicable_count := retained_90_days - denominator_count;
  metrics := metrics || jsonb_build_array(
    homeground_private.build_homeground_admin_metric(
      'party',
      'Party',
      false,
      denominator_count,
      unknown_count,
      not_applicable_count,
      array[
        'solo',
        'two-adults',
        'family-with-children',
        'older-relatives',
        'multigenerational-family',
        'friends-private-group'
      ],
      bucket_counts
    )
  );

  -- Schema 2 Pace. Schema 1 Pace is deliberately Not applicable.
  with compatible as (
    select inquiry.*
      from homeground_private.inquiries inquiry
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
        and exists (
          select 1
            from homeground_private.admin_metric_compatibility registry
            where registry.metric_id = 'pace'
              and registry.schema_version = inquiry.schema_version
              and registry.entry_path = inquiry.entry_path
              and registry.form_version = inquiry.form_version
              and registry.rule_version = inquiry.rule_version
        )
  )
  select
    count(*)::bigint,
    count(*) filter (
      where coalesce(answers_json ->> 'pace', '') not in (
        'essentials',
        'classic',
        'unhurried'
      )
    )::bigint,
    array[
      count(*) filter (
        where answers_json ->> 'pace' = 'essentials'
      )::bigint,
      count(*) filter (
        where answers_json ->> 'pace' = 'classic'
      )::bigint,
      count(*) filter (
        where answers_json ->> 'pace' = 'unhurried'
      )::bigint
    ]
  into denominator_count, unknown_count, bucket_counts
  from compatible;

  not_applicable_count := retained_90_days - denominator_count;
  metrics := metrics || jsonb_build_array(
    homeground_private.build_homeground_admin_metric(
      'pace',
      'Pace',
      false,
      denominator_count,
      unknown_count,
      not_applicable_count,
      array['essentials', 'classic', 'unhurried'],
      bucket_counts
    )
  );

  with compatible as (
    select inquiry.*
      from homeground_private.inquiries inquiry
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
        and exists (
          select 1
            from homeground_private.admin_metric_compatibility registry
            where registry.metric_id = 'stay_time_reference_match'
              and registry.schema_version = inquiry.schema_version
              and registry.entry_path = inquiry.entry_path
              and registry.form_version = inquiry.form_version
              and registry.rule_version = inquiry.rule_version
        )
  )
  select
    count(*)::bigint,
    count(*) filter (
      where coalesce(route_snapshot_json ->> 'status', '') not in (
        'needs_prioritization',
        'tighter_than_selected_pace',
        'within_reference_range',
        'room_to_shape',
        'partial_manual_check',
        'manual_only'
      )
    )::bigint,
    array[
      count(*) filter (
        where route_snapshot_json ->> 'status' =
          'needs_prioritization'
      )::bigint,
      count(*) filter (
        where route_snapshot_json ->> 'status' =
          'tighter_than_selected_pace'
      )::bigint,
      count(*) filter (
        where route_snapshot_json ->> 'status' =
          'within_reference_range'
      )::bigint,
      count(*) filter (
        where route_snapshot_json ->> 'status' = 'room_to_shape'
      )::bigint,
      count(*) filter (
        where route_snapshot_json ->> 'status' =
          'partial_manual_check'
      )::bigint,
      count(*) filter (
        where route_snapshot_json ->> 'status' = 'manual_only'
      )::bigint
    ]
  into denominator_count, unknown_count, bucket_counts
  from compatible;

  not_applicable_count := retained_90_days - denominator_count;
  metrics := metrics || jsonb_build_array(
    homeground_private.build_homeground_admin_metric(
      'stay_time_reference_match',
      'Destination stay-time reference match',
      false,
      denominator_count,
      unknown_count,
      not_applicable_count,
      array[
        'needs_prioritization',
        'tighter_than_selected_pace',
        'within_reference_range',
        'room_to_shape',
        'partial_manual_check',
        'manual_only'
      ],
      bucket_counts
    )
  );

  with compatible as (
    select inquiry.*
      from homeground_private.inquiries inquiry
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
        and exists (
          select 1
            from homeground_private.admin_metric_compatibility registry
            where registry.metric_id = 'must_see_selections'
              and registry.schema_version = inquiry.schema_version
              and registry.entry_path = inquiry.entry_path
              and registry.form_version = inquiry.form_version
              and registry.rule_version = inquiry.rule_version
        )
  ),
  normalized as (
    select
      compatible.*,
      homeground_private.is_homeground_controlled_string_array_subset(
        compatible.answers_json -> 'mustSeeIds',
        compatible.answers_json -> 'destinationIds',
        allowed_destination_ids,
        3,
        10
      ) as is_valid
    from compatible
  )
  select
    count(*)::bigint,
    count(*) filter (where not is_valid)::bigint,
    array[
      count(*) filter (
        where is_valid
          and answers_json -> 'mustSeeIds' ? 'beijing-great-wall'
      )::bigint,
      count(*) filter (
        where is_valid and answers_json -> 'mustSeeIds' ? 'shanghai'
      )::bigint,
      count(*) filter (
        where is_valid and answers_json -> 'mustSeeIds' ? 'xian'
      )::bigint,
      count(*) filter (
        where is_valid and answers_json -> 'mustSeeIds' ? 'chengdu'
      )::bigint,
      count(*) filter (
        where is_valid and answers_json -> 'mustSeeIds' ? 'chongqing'
      )::bigint,
      count(*) filter (
        where is_valid and answers_json -> 'mustSeeIds' ? 'zhangjiajie'
      )::bigint,
      count(*) filter (
        where is_valid
          and answers_json -> 'mustSeeIds' ? 'guilin-yangshuo'
      )::bigint,
      count(*) filter (
        where is_valid
          and answers_json -> 'mustSeeIds' ? 'hangzhou-suzhou'
      )::bigint,
      count(*) filter (
        where is_valid
          and answers_json -> 'mustSeeIds' ? 'yunnan-dali-lijiang'
      )::bigint,
      count(*) filter (
        where is_valid
          and answers_json -> 'mustSeeIds' ? 'guangzhou-shenzhen'
      )::bigint
    ]
  into denominator_count, unknown_count, bucket_counts
  from normalized;

  not_applicable_count := retained_90_days - denominator_count;
  metrics := metrics || jsonb_build_array(
    homeground_private.build_homeground_admin_metric(
      'must_see_selections',
      'Must-see selections',
      true,
      denominator_count,
      unknown_count,
      not_applicable_count,
      allowed_destination_ids,
      bucket_counts
    )
  );

  with compatible as (
    select inquiry.*
      from homeground_private.inquiries inquiry
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
        and exists (
          select 1
            from homeground_private.admin_metric_compatibility registry
            where registry.metric_id = 'reply_channel_choice'
              and registry.schema_version = inquiry.schema_version
              and registry.entry_path = inquiry.entry_path
              and registry.form_version = inquiry.form_version
              and registry.rule_version = inquiry.rule_version
        )
  )
  select
    count(*)::bigint,
    count(*) filter (
      where contact_channel not in ('email', 'whatsapp')
    )::bigint,
    array[
      count(*) filter (where contact_channel = 'email')::bigint,
      count(*) filter (where contact_channel = 'whatsapp')::bigint
    ]
  into denominator_count, unknown_count, bucket_counts
  from compatible;

  not_applicable_count := retained_90_days - denominator_count;
  metrics := metrics || jsonb_build_array(
    homeground_private.build_homeground_admin_metric(
      'reply_channel_choice',
      'Reply-channel choice',
      false,
      denominator_count,
      unknown_count,
      not_applicable_count,
      array['email', 'whatsapp'],
      bucket_counts
    )
  );

  with compatible as (
    select inquiry.*
      from homeground_private.inquiries inquiry
      where inquiry.created_at >= window_started_at
        and inquiry.created_at <= generated_at
        and exists (
          select 1
            from homeground_private.admin_metric_compatibility registry
            where registry.metric_id = 'form_locale'
              and registry.schema_version = inquiry.schema_version
              and registry.entry_path = inquiry.entry_path
              and registry.form_version = inquiry.form_version
              and registry.rule_version = inquiry.rule_version
        )
  )
  select
    count(*)::bigint,
    count(*) filter (
      where locale not in ('en', 'zh', 'ko')
    )::bigint,
    array[
      count(*) filter (where locale = 'en')::bigint,
      count(*) filter (where locale = 'zh')::bigint,
      count(*) filter (where locale = 'ko')::bigint
    ]
  into denominator_count, unknown_count, bucket_counts
  from compatible;

  not_applicable_count := retained_90_days - denominator_count;
  metrics := metrics || jsonb_build_array(
    homeground_private.build_homeground_admin_metric(
      'form_locale',
      'Form locale',
      false,
      denominator_count,
      unknown_count,
      not_applicable_count,
      array['en', 'zh', 'ko'],
      bucket_counts
    )
  );

  return query
  select jsonb_build_object(
    'contractVersion', 'homeground-admin-insights.v1',
    'generatedAt', generated_at,
    'timezone', 'Asia/Shanghai',
    'window', jsonb_build_object(
      'days', 90,
      'startsAt', coverage_started_at,
      'endsAt', generated_at,
      'collectingBaseline', collecting_baseline
    ),
    'retainedCounts', jsonb_build_object(
      'today', retained_today,
      'past7Days', retained_7_days,
      'past30Days', retained_30_days
    ),
    'dataQualityHold', jsonb_build_object(
      'active', data_quality_hold_active,
      'message', case
        when data_quality_hold_active
          then
            'Do not use this window for content or product decisions.'
        else null
      end
    ),
    'metrics', metrics,
    'notice',
      'Saved submissions, not unique people, customers, or market share.'
  );
end;
$$;

create or replace function public.get_homeground_admin_health()
returns table (payload jsonb)
language plpgsql
stable
security definer
set search_path = pg_catalog, public, homeground_private,
  homeground_recovery
as $$
declare
  checked_at timestamptz := now();
  queued_count bigint;
  processing_count bigint;
  accepted_count bigint;
  failed_count bigint;
  overdue_count bigint;
  expired_count bigint;
  oldest_queued_age_seconds bigint;
  retained_10_minutes bigint;
  retained_1_hour bigint;
  retained_24_hours bigint;
  last_retained_submission_at timestamptz;
  cleanup_status text;
  cleanup_started_at timestamptz;
  cleanup_finished_at timestamptz;
  cleanup_error_code text;
  cleanup_inquiries_deleted integer;
  cleanup_outbox_deleted integer;
  cleanup_retries_expired integer;
  expired_admin_access_log_count bigint;
  backup_status text;
  backup_checked_at timestamptz;
  backup_environment text;
  backup_artifact_version text;
  canary_status text;
  canary_checked_at timestamptz;
  canary_environment text;
  canary_artifact_version text;
  data_quality_hold_active boolean;
  open_incident_types text[];
  tombstones_pending_replication bigint;
begin
  select
    count(*) filter (where outbox.status = 'pending')::bigint,
    count(*) filter (where outbox.status = 'processing')::bigint,
    count(*) filter (where outbox.status = 'accepted')::bigint,
    count(*) filter (where outbox.status = 'failed')::bigint,
    count(*) filter (
      where outbox.retry_deadline_at > checked_at
        and (
          (
            outbox.status = 'pending'
            and outbox.next_attempt_at
              <= checked_at - interval '5 minutes'
          )
          or (
            outbox.status = 'processing'
            and outbox.lease_until
              <= checked_at - interval '5 minutes'
          )
        )
    )::bigint,
    count(*) filter (
      where outbox.status in ('pending', 'processing')
        and outbox.retry_deadline_at <= checked_at
    )::bigint,
    coalesce(
      floor(extract(epoch from (
        checked_at - min(outbox.created_at) filter (
          where outbox.status in ('pending', 'processing')
        )
      )))::bigint,
      null
    )
  into
    queued_count,
    processing_count,
    accepted_count,
    failed_count,
    overdue_count,
    expired_count,
    oldest_queued_age_seconds
  from homeground_private.notification_outbox outbox;

  select
    count(*) filter (
      where inquiry.created_at >= checked_at - interval '10 minutes'
        and inquiry.created_at <= checked_at
    )::bigint,
    count(*) filter (
      where inquiry.created_at >= checked_at - interval '1 hour'
        and inquiry.created_at <= checked_at
    )::bigint,
    count(*) filter (
      where inquiry.created_at >= checked_at - interval '24 hours'
        and inquiry.created_at <= checked_at
    )::bigint,
    max(inquiry.created_at) filter (
      where inquiry.created_at <= checked_at
    )
  into
    retained_10_minutes,
    retained_1_hour,
    retained_24_hours,
    last_retained_submission_at
  from homeground_private.inquiries inquiry;

  select
    run.status,
    run.started_at,
    run.finished_at,
    run.error_code,
    run.inquiries_deleted_count,
    run.outbox_deleted_count,
    run.retries_expired_count
  into
    cleanup_status,
    cleanup_started_at,
    cleanup_finished_at,
    cleanup_error_code,
    cleanup_inquiries_deleted,
    cleanup_outbox_deleted,
    cleanup_retries_expired
  from homeground_private.retention_cleanup_runs run
  order by run.started_at desc
  limit 1;

  select count(*)::bigint
    into expired_admin_access_log_count
    from homeground_private.admin_access_log access_log
    where access_log.occurred_at
      <= checked_at - interval '30 days';

  select
    check_run.status,
    check_run.checked_at,
    check_run.environment,
    check_run.artifact_version
  into
    backup_status,
    backup_checked_at,
    backup_environment,
    backup_artifact_version
  from homeground_private.operational_check_runs check_run
  where check_run.check_type = 'backup_restore'
  order by check_run.checked_at desc
  limit 1;

  select
    check_run.status,
    check_run.checked_at,
    check_run.environment,
    check_run.artifact_version
  into
    canary_status,
    canary_checked_at,
    canary_environment,
    canary_artifact_version
  from homeground_private.operational_check_runs check_run
  where check_run.check_type = 'isolated_e2e_canary'
  order by check_run.checked_at desc
  limit 1;

  select
    count(*) > 0,
    coalesce(
      array_agg(
        distinct incident.incident_type
        order by incident.incident_type
      ),
      '{}'::text[]
    )
  into data_quality_hold_active, open_incident_types
  from homeground_private.data_quality_incidents incident
  where incident.status = 'open';

  if exists (
    select 1
      from homeground_private.inquiries future_inquiry
      where future_inquiry.created_at > checked_at
  ) then
    data_quality_hold_active := true;
    if not 'schema_contract_mismatch' = any(open_incident_types) then
      open_incident_types :=
        array_append(open_incident_types, 'schema_contract_mismatch');
      select array_agg(value order by value)
        into open_incident_types
        from unnest(open_incident_types) as future_hold(value);
    end if;
  end if;

  select count(*)::bigint
    into tombstones_pending_replication
    from homeground_recovery.deletion_tombstones tombstone
    where tombstone.replicated_at is null;

  return query
  select jsonb_build_object(
    'contractVersion', 'homeground-admin-health.v1',
    'checkedAt', checked_at,
    'database', jsonb_build_object(
      'summaryReadable', true,
      'contractVersion', 'homeground-admin-health.v1'
    ),
    'outbox', jsonb_build_object(
      'queued', queued_count,
      'processing', processing_count,
      'providerAccepted', accepted_count,
      'failed', failed_count,
      'overdue', overdue_count,
      'expired', expired_count,
      'oldestQueuedAgeSeconds', oldest_queued_age_seconds,
      'retryDeadlineHours', 72
    ),
    'retainedCounts', jsonb_build_object(
      'past10Minutes', retained_10_minutes,
      'past1Hour', retained_1_hour,
      'past24Hours', retained_24_hours
    ),
    'lastRetainedSubmissionAt', last_retained_submission_at,
    'cleanup', jsonb_build_object(
      'status', coalesce(cleanup_status, 'never_run'),
      'startedAt', cleanup_started_at,
      'finishedAt', cleanup_finished_at,
      'errorCode', cleanup_error_code,
      'inquiriesDeleted', coalesce(cleanup_inquiries_deleted, 0),
      'outboxDeleted', coalesce(cleanup_outbox_deleted, 0),
      'retriesExpired', coalesce(cleanup_retries_expired, 0),
      'expiredAdminAccessLogCount',
        expired_admin_access_log_count,
      'pendingTombstoneReplication',
        tombstones_pending_replication
    ),
    'backupRestore', jsonb_build_object(
      'status', coalesce(backup_status, 'never_run'),
      'checkedAt', backup_checked_at,
      'environment', backup_environment,
      'artifactVersion', backup_artifact_version
    ),
    'isolatedCanary', jsonb_build_object(
      'status', coalesce(canary_status, 'never_run'),
      'checkedAt', canary_checked_at,
      'environment', canary_environment,
      'artifactVersion', canary_artifact_version
    ),
    'dataQualityHold', jsonb_build_object(
      'active', data_quality_hold_active,
      'incidentTypes', to_jsonb(open_incident_types),
      'message', case
        when data_quality_hold_active
          then
            'Do not use this window for content or product decisions.'
        else null
      end
    ),
    'versions', jsonb_build_object(
      'currentForm', '2026-07-21.1',
      'currentPrivacy', '2026-07-21.1',
      'destinationRule', '2026-07-19.1',
      'legacyRouteRule', '2026-07-17.1'
    )
  );
end;
$$;

comment on function public.get_homeground_admin_insights() is
  'Returns one fixed 90-day, k-suppressed aggregate payload. It never returns a row identifier, public reference, contact value, budget, country, or free text.';
comment on function public.get_homeground_admin_health() is
  'Returns operational truth sources and aggregate counts. Provider Accepted is not delivery, reading, or reply confirmation.';

revoke all on function
  homeground_private.is_homeground_controlled_string_array(
    jsonb,
    text[],
    integer
  )
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.is_homeground_controlled_string_array_subset(
    jsonb,
    jsonb,
    text[],
    integer,
    integer
  )
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.get_homeground_metric_compatibility(text)
  from public, anon, authenticated, service_role;
revoke all on function
  homeground_private.build_homeground_admin_metric(
    text,
    text,
    boolean,
    bigint,
    bigint,
    bigint,
    text[],
    bigint[]
  )
  from public, anon, authenticated, service_role;
revoke all on function public.get_homeground_admin_insights()
  from public, anon, authenticated;
revoke all on function public.get_homeground_admin_health()
  from public, anon, authenticated;

grant execute on function public.get_homeground_admin_insights()
  to service_role;
grant execute on function public.get_homeground_admin_health()
  to service_role;

do $admin_access_schedule$
begin
  if exists (
    select 1
      from cron.job
      where jobname = 'homeground-admin-access-log-prune-daily'
  ) then
    perform cron.unschedule(
      'homeground-admin-access-log-prune-daily'
    );
  end if;

  perform cron.schedule(
    'homeground-admin-access-log-prune-daily',
    '15 19 * * *',
    'select public.prune_homeground_admin_access_log();'
  );
end;
$admin_access_schedule$;

commit;
