begin;

alter table homeground_private.admin_access_log
  drop constraint if exists admin_access_log_endpoint_check;

alter table homeground_private.admin_access_log
  add constraint admin_access_log_endpoint_check check (
    endpoint in ('admin-insights', 'admin-health', 'admin-traffic')
  );

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
    or p_endpoint not in (
      'admin-insights',
      'admin-health',
      'admin-traffic'
    )
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

create or replace function public.get_homeground_admin_traffic()
returns table(payload jsonb)
language plpgsql
security definer
set search_path = pg_catalog, homeground_private, extensions
as $$
declare
  generated_at timestamptz := clock_timestamp();
  window_started_at timestamptz :=
    generated_at - interval '30 days';
begin
  return query
  with
  window_sessions as (
    select session.*
      from homeground_private.traffic_sessions as session
      where session.first_seen_at >= window_started_at
        and session.first_seen_at <= generated_at
        and session.contract_version =
          'homeground-traffic-events.v1'
        and session.notice_version = '2026-07-31.1'
  ),
  window_events as (
    select event.*
      from homeground_private.traffic_events as event
      join window_sessions as session
        on session.session_hash = event.session_hash
      where event.received_at >= window_started_at
        and event.received_at <= generated_at
        and event.contract_version =
          'homeground-traffic-events.v1'
  ),
  total_counts as (
    select
      (select count(*)::integer from window_sessions)
        as sessions,
      (
        select count(*)::integer
          from window_sessions as unknown_session
          where unknown_session.utm_source is null
      ) as unknown_source_sessions,
      (
        select count(*)::integer
          from homeground_private.inquiry_traffic_attribution
            as attribution
          where attribution.linked_at >= window_started_at
            and attribution.linked_at <= generated_at
      ) as attributed_enquiries,
      count(*) filter (
        where event.event_type = 'page_view'
      )::integer as page_views,
      count(*) filter (
        where event.event_type = 'contact_channel_clicked'
      )::integer as contact_click_attempts,
      count(*) filter (
        where event.event_type = 'email_form_started'
      )::integer as email_form_started
      from window_events as event
  ),
  source_counts as (
    select
      session.utm_source as label,
      count(*)::integer as observed_count
      from window_sessions as session
      group by session.utm_source
  ),
  source_dimension as (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'bucketType', bucket.bucket_type,
          'label', bucket.label,
          'count',
            case
              when bucket.observed_count = 0
                or bucket.observed_count >= 5
              then bucket.observed_count
              else null
            end,
          'suppressed',
            bucket.observed_count between 1 and 4
        )
        order by
          case bucket.bucket_type
            when 'unknown' then 0
            when 'suppressed' then 2
            else 1
          end,
          bucket.observed_count desc,
          bucket.label
      ),
      '[]'::jsonb
    ) as buckets
      from (
        select
          case
            when label is null then 'unknown'
            else 'value'
          end::text as bucket_type,
          label,
          observed_count
          from source_counts
          where label is null
            or observed_count >= 5
        union all
        select
          'suppressed'::text,
          null::text,
          1
          where exists (
            select 1
              from source_counts
              where label is not null
                and observed_count between 1 and 4
          )
      ) as bucket
  ),
  campaign_counts as (
    select
      session.utm_campaign as label,
      count(*)::integer as observed_count
      from window_sessions as session
      group by session.utm_campaign
  ),
  campaign_dimension as (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'bucketType', bucket.bucket_type,
          'label', bucket.label,
          'count',
            case
              when bucket.observed_count = 0
                or bucket.observed_count >= 5
              then bucket.observed_count
              else null
            end,
          'suppressed',
            bucket.observed_count between 1 and 4
        )
        order by
          case bucket.bucket_type
            when 'unknown' then 0
            when 'suppressed' then 2
            else 1
          end,
          bucket.observed_count desc,
          bucket.label
      ),
      '[]'::jsonb
    ) as buckets
      from (
        select
          case
            when label is null then 'unknown'
            else 'value'
          end::text as bucket_type,
          label,
          observed_count
          from campaign_counts
          where label is null
            or observed_count >= 5
        union all
        select
          'suppressed'::text,
          null::text,
          1
          where exists (
            select 1
              from campaign_counts
              where label is not null
                and observed_count between 1 and 4
          )
      ) as bucket
  ),
  page_counts as (
    select
      event.page_path as label,
      count(*)::integer as observed_count
      from window_events as event
      where event.event_type = 'page_view'
      group by event.page_path
  ),
  page_dimension as (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'bucketType', bucket.bucket_type,
          'label', bucket.label,
          'count',
            case
              when bucket.observed_count >= 5
              then bucket.observed_count
              else null
            end,
          'suppressed', bucket.observed_count between 1 and 4
        )
        order by
          case bucket.bucket_type
            when 'suppressed' then 1
            else 0
          end,
          bucket.observed_count desc,
          bucket.label
      ),
      '[]'::jsonb
    ) as buckets
      from (
        select
          'value'::text as bucket_type,
          label,
          observed_count
          from page_counts
          where observed_count >= 5
        union all
        select
          'suppressed'::text,
          null::text,
          1
          where exists (
            select 1
              from page_counts
              where observed_count between 1 and 4
          )
      ) as bucket
  ),
  entry_page_counts as (
    select
      session.entry_path as label,
      count(*)::integer as observed_count
      from window_sessions as session
      group by session.entry_path
  ),
  recent_candidates as (
    select
      session.*,
      'HG-' || upper(
        substr(
          encode(
            extensions.digest(
              convert_to(
                session.session_hash
                  || ':homeground-admin-traffic:'
                  || window_started_at::date::text,
                'UTF8'
              ),
              'sha256'
            ),
            'hex'
          ),
          1,
          8
        )
      ) as session_label,
      case
        when session.utm_source is null then 'unknown'
        when source_count.observed_count >= 5 then 'value'
        else 'suppressed'
      end as source_bucket_type,
      case
        when source_count.observed_count >= 5
        then session.utm_source
        else null
      end as source_label,
      case
        when session.utm_campaign is null then 'unknown'
        when campaign_count.observed_count >= 5 then 'value'
        else 'suppressed'
      end as campaign_bucket_type,
      case
        when campaign_count.observed_count >= 5
        then session.utm_campaign
        else null
      end as campaign_label,
      case
        when entry_page_count.observed_count >= 5
        then 'value'
        else 'suppressed'
      end as entry_page_bucket_type,
      case
        when entry_page_count.observed_count >= 5
        then session.entry_path
        else null
      end as entry_page_label
      from window_sessions as session
      left join source_counts as source_count
        on source_count.label is not distinct from session.utm_source
      left join campaign_counts as campaign_count
        on campaign_count.label is not distinct from session.utm_campaign
      left join entry_page_counts as entry_page_count
        on entry_page_count.label = session.entry_path
      where (select sessions from total_counts) >= 5
        and (
          select count(*)
            from window_sessions as eligible_session
            where not exists (
              select 1
                from homeground_private.inquiry_traffic_attribution
                  as eligible_attribution
                where eligible_attribution.session_hash =
                  eligible_session.session_hash
            )
        ) >= 5
        and not exists (
        select 1
          from homeground_private.inquiry_traffic_attribution
            as attribution
          where attribution.session_hash = session.session_hash
      )
      order by session.last_seen_at desc, session.session_hash
      limit 12
  ),
  recent_sessions as (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'sessionLabel', candidate.session_label,
          'startedAt',
            date_trunc(
              'day',
              candidate.first_seen_at at time zone 'UTC'
            ) at time zone 'UTC',
          'lastSeenAt',
            date_trunc(
              'day',
              candidate.last_seen_at at time zone 'UTC'
            ) at time zone 'UTC',
          'locale', candidate.locale,
          'source', jsonb_build_object(
            'bucketType', candidate.source_bucket_type,
            'label', candidate.source_label
          ),
          'campaign', jsonb_build_object(
            'bucketType', candidate.campaign_bucket_type,
            'label', candidate.campaign_label
          ),
          'entryPage', jsonb_build_object(
            'bucketType', candidate.entry_page_bucket_type,
            'label', candidate.entry_page_label
          )
        )
        order by candidate.last_seen_at desc, candidate.session_label
      ),
      '[]'::jsonb
    ) as sessions
      from recent_candidates as candidate
  )
  select jsonb_build_object(
    'contractVersion', 'homeground-admin-traffic.v1',
    'generatedAt', generated_at,
    'timezone', 'Asia/Shanghai',
    'window', jsonb_build_object(
      'days', 30,
      'startsAt', window_started_at,
      'endsAt', generated_at
    ),
    'totals', jsonb_build_object(
      'sessions', jsonb_build_object(
        'count',
          case
            when total.sessions = 0 or total.sessions >= 5
            then total.sessions
            else null
          end,
        'suppressed', total.sessions between 1 and 4
      ),
      'pageViews', jsonb_build_object(
        'count',
          case
            when total.page_views = 0 or total.page_views >= 5
            then total.page_views
            else null
          end,
        'suppressed', total.page_views between 1 and 4
      ),
      'contactClickAttempts', jsonb_build_object(
        'count',
          case
            when total.contact_click_attempts = 0
              or total.contact_click_attempts >= 5
            then total.contact_click_attempts
            else null
          end,
        'suppressed',
          total.contact_click_attempts between 1 and 4
      ),
      'emailFormStarts', jsonb_build_object(
        'count',
          case
            when total.email_form_started = 0
              or total.email_form_started >= 5
            then total.email_form_started
            else null
          end,
        'suppressed',
          total.email_form_started between 1 and 4
      ),
      'attributedEnquiries', jsonb_build_object(
        'count',
          case
            when total.attributed_enquiries = 0
              or total.attributed_enquiries >= 5
            then total.attributed_enquiries
            else null
          end,
        'suppressed',
          total.attributed_enquiries between 1 and 4
      ),
      'unknownSourceSessions', jsonb_build_object(
        'count',
          case
            when total.unknown_source_sessions = 0
              or total.unknown_source_sessions >= 5
            then total.unknown_source_sessions
            else null
          end,
        'suppressed',
          total.unknown_source_sessions between 1 and 4
      )
    ),
    'dimensions', jsonb_build_object(
      'sources', source_dimension.buckets,
      'campaigns', campaign_dimension.buckets,
      'pages', page_dimension.buckets
    ),
    'recentSessions', recent_sessions.sessions,
    'limits', jsonb_build_object(
      'minimumVisibleCount', 5,
      'maximumRecentSessions', 12,
      'recentSessionsMinimumEligibleCount', 5,
      'perSessionEventsIncluded', false,
      'timeResolution', 'day',
      'linkedInquirySessionsExcluded', true,
      'sessionLabelScope', 'current_30_day_window'
    ),
    'notice', jsonb_build_object(
      'scope',
        'Consented anonymous sessions; not people, customers, or market share.',
      'clickMeaning',
        'A contact-channel click does not prove that a message was sent.'
    )
  )
    from total_counts as total
    cross join source_dimension
    cross join campaign_dimension
    cross join page_dimension
    cross join recent_sessions;
end;
$$;

comment on function public.get_homeground_admin_traffic() is
  'Returns a bounded 30-day consented anonymous traffic read model. Dynamic dimensions are typed and k-suppressed; recent session summaries require at least five sessions, use day-level dates, omit per-session events, and exclude linked inquiry sessions and raw identifiers.';

revoke all on function public.get_homeground_admin_traffic()
  from public, anon, authenticated;
grant execute on function public.get_homeground_admin_traffic()
  to service_role;

commit;
