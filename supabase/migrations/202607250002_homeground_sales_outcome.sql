begin;

-- Records what became of an enquiry.
--
-- Nothing in the system can observe this on its own. An enquiry arrives here,
-- the conversation happens on WhatsApp or email, and the money arrives by bank
-- transfer — none of which this database sees. Until payment runs through a
-- system we control, a person decides that a trip was won and says so here.
--
-- These columns are staff-owned. The public enquiry API never writes them, so
-- they are deliberately absent from the inquiry contract and from every RPC
-- reachable from the browser: a visitor must not be able to declare their own
-- enquiry won, or to read back what a planner recorded about it.
--
-- One row of this is what makes four separate questions answerable — whether a
-- paid click became a customer (the ad platform needs the outcome reported
-- back), what a channel actually returned, what a trip really costs to deliver,
-- and where enquiries are lost. Recording it late costs most of that: ad
-- platforms stop using a conversion for optimisation once it is old enough.

alter table homeground_private.inquiries
  add column if not exists sales_status text
    not null default 'new'
    check (
      sales_status in ('new', 'replied', 'quoted', 'won', 'lost')
    ),
  -- The moment the trip was won, not the moment somebody got around to
  -- recording it. Conversion reporting is judged against the click's own
  -- timestamp, so a backdated entry must carry the real date.
  add column if not exists won_at timestamptz,
  -- What Homeground actually earned, in whole cents, not what the traveller
  -- paid. Third-party costs pass straight through and would make every channel
  -- look profitable. Integer cents because binary floating point cannot hold a
  -- decimal currency amount exactly.
  add column if not exists margin_cents integer
    check (margin_cents is null or margin_cents >= 0),
  add column if not exists margin_currency text
    check (margin_currency is null or margin_currency ~ '^[A-Z]{3}$'),
  add column if not exists lost_reason text
    check (
      lost_reason is null
      or lost_reason in (
        'no_reply',
        'price',
        'went_competitor',
        'diy',
        'timing',
        'out_of_scope',
        'other'
      )
    ),
  -- Set once the outcome has been reported to the advertising platform, so a
  -- re-run of the upload cannot double-count a conversion.
  add column if not exists outcome_reported_at timestamptz;

-- A status is a claim about the world, and two of these claims carry evidence.
-- Enforcing the pairing here rather than in the uploader means a half-recorded
-- outcome cannot reach the point where it is reported to an ad platform.
alter table homeground_private.inquiries
  drop constraint if exists inquiry_sales_outcome_check;

alter table homeground_private.inquiries
  add constraint inquiry_sales_outcome_check check (
    (
      sales_status = 'won'
      and won_at is not null
      and margin_cents is not null
      and margin_currency is not null
      and lost_reason is null
    )
    or
    (
      sales_status = 'lost'
      and lost_reason is not null
      and won_at is null
      and margin_cents is null
      and margin_currency is null
    )
    or
    (
      sales_status in ('new', 'replied', 'quoted')
      and won_at is null
      and margin_cents is null
      and margin_currency is null
      and lost_reason is null
    )
  );

-- Finds the won trips still owed a conversion report. The partial index keeps
-- it small: it holds only the rows the uploader is looking for, and a row drops
-- out of it the moment the outcome is reported.
create index if not exists inquiries_unreported_wins_idx
  on homeground_private.inquiries(won_at)
  where sales_status = 'won' and outcome_reported_at is null;

create index if not exists inquiries_sales_status_idx
  on homeground_private.inquiries(sales_status, created_at);

comment on column homeground_private.inquiries.sales_status is
  'Staff-recorded outcome. Never written by the public enquiry API.';
comment on column homeground_private.inquiries.margin_cents is
  'Homeground margin in whole cents, excluding third-party supplier cost.';
comment on column homeground_private.inquiries.outcome_reported_at is
  'Set when the outcome reached the ad platform; guards against double-counting.';

commit;
