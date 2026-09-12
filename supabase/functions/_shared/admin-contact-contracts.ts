// Shared by the privileged Edge response and the admin UI. No person-level data.
export const contactChannels = ['all', 'whatsapp', 'email', 'messenger'] as const;
export const contactDimensions = ['pages', 'entryPages', 'sources', 'products', 'surfaces'] as const;
export type ContactChannel = typeof contactChannels[number];
export type ContactDimension = typeof contactDimensions[number];
export interface ContactCount { clicks: number; sessions: number }
export interface ContactRow extends ContactCount { key: string }
export interface ContactSlice extends ContactCount {
  channel: ContactChannel;
  unknownSourceClicks: number;
  dimensions: Record<ContactDimension, { rows: ContactRow[]; remainingClicks: number }>;
  daily: (ContactCount & { day: string })[];
}
export interface ContactPeriod {
  days: 7 | 30;
  startsAt: string;
  endsAt: string;
  eligibleSessions: number;
  channels: ContactSlice[];
}
export interface ContactReport { periods: ContactPeriod[] }

function record(value: unknown, keys: string[]): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
      Object.keys(value).length !== keys.length || Object.keys(value).some(key => !keys.includes(key))) throw Error('Invalid contact report fields');
  return value as Record<string, unknown>;
}
function count(value: unknown): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0 || value > 10_000_000) throw Error('Invalid contact count');
  return value;
}
function counts(value: Record<string, unknown>): ContactCount {
  const clicks = count(value.clicks), sessions = count(value.sessions);
  if (sessions > clicks || (clicks > 0 && sessions === 0)) throw Error('Invalid contact session count');
  return { clicks, sessions };
}
function array(value: unknown, max: number): unknown[] {
  if (!Array.isArray(value) || value.length > max) throw Error('Invalid contact report rows');
  return value;
}
function date(value: unknown): string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(value) || !Number.isFinite(Date.parse(value))) throw Error('Invalid contact date');
  return value;
}
function key(value: unknown, dimension: ContactDimension): string {
  if (typeof value !== 'string' || value.length > 180) throw Error('Invalid contact label');
  const valid = dimension === 'pages' || dimension === 'entryPages'
    ? /^\/[A-Za-z0-9/_-]*$/.test(value) && !value.includes('//') && !value.includes('..')
    : value === 'Unknown' || (value.length <= 96 && /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/.test(value));
  if (!valid) throw Error('Invalid contact label');
  return value;
}
function shanghaiDay(timestamp: number) { return new Date(timestamp + 8 * 3600_000).toISOString().slice(0, 10); }

export function parseContactReport(value: unknown, generatedAt: string): ContactReport {
  const root = record(value, ['periods']);
  const periods = array(root.periods, 2);
  if (periods.length !== 2) throw Error('Missing contact periods');
  const parsed = periods.map((input, i): ContactPeriod => {
    const period = record(input, ['days', 'startsAt', 'endsAt', 'eligibleSessions', 'channels']);
    const days = i === 0 ? 7 : 30;
    const startsAt = date(period.startsAt), endsAt = date(period.endsAt);
    if (period.days !== days || Date.parse(endsAt) !== Date.parse(generatedAt) ||
      Date.parse(endsAt) - Date.parse(startsAt) !== days * 86400_000) throw Error('Invalid contact window');
    const eligibleSessions = count(period.eligibleSessions);
    const inputs = array(period.channels, 4);
    const seen = new Set<string>();
    const channels = inputs.map((input): ContactSlice => {
      const row = record(input, ['channel', 'clicks', 'sessions', 'unknownSourceClicks', 'dimensions', 'daily']);
      const channel = row.channel as ContactChannel;
      if (!contactChannels.includes(channel) || seen.has(channel)) throw Error('Invalid contact channel');
      seen.add(channel);
      const totals = counts(row), unknownSourceClicks = count(row.unknownSourceClicks);
      if (totals.sessions > eligibleSessions || unknownSourceClicks > totals.clicks) throw Error('Invalid contact totals');
      const dimensionsInput = record(row.dimensions, [...contactDimensions]);
      const dimensions = {} as ContactSlice['dimensions'];
      for (const dimension of contactDimensions) {
        const dimensionInput = record(dimensionsInput[dimension], ['rows', 'remainingClicks']);
        const remainingClicks = count(dimensionInput.remainingClicks), labels = new Set<string>();
        const rows = array(dimensionInput.rows, 20).map((input): ContactRow => {
          const row = record(input, ['key', 'clicks', 'sessions']);
          const label = key(row.key, dimension), value = counts(row);
          if (labels.has(label) || value.clicks === 0 || value.sessions > totals.sessions) throw Error('Invalid contact grouping');
          labels.add(label);
          return { key: label, ...value };
        });
        if (rows.reduce((n, row) => n + row.clicks, remainingClicks) !== totals.clicks) throw Error('Contact grouping does not reconcile');
        dimensions[dimension] = { rows, remainingClicks };
      }
      const dailyInputs = array(row.daily, days + 1);
      if (dailyInputs.length !== days + 1) throw Error('Missing contact days');
      const daily = dailyInputs.map((input, i) => {
        const row = record(input, ['day', 'clicks', 'sessions']);
        const day = shanghaiDay(Date.parse(startsAt) + i * 86400_000), value = counts(row);
        if (row.day !== day || value.sessions > totals.sessions) throw Error('Invalid contact day');
        return { day, ...value };
      });
      if (daily.reduce((n, row) => n + row.clicks, 0) !== totals.clicks) throw Error('Contact days do not reconcile');
      return { channel, ...totals, unknownSourceClicks, dimensions, daily };
    });
    if (seen.size !== 4) throw Error('Missing contact channels');
    const all = channels.find(row => row.channel === 'all')!;
    const individual = channels.filter(row => row.channel !== 'all');
    if (individual.reduce((n, row) => n + row.clicks, 0) !== all.clicks ||
      individual.reduce((n, row) => n + row.unknownSourceClicks, 0) !== all.unknownSourceClicks ||
      individual.some(row => row.sessions > all.sessions) ||
      individual.reduce((n, row) => n + row.sessions, 0) < all.sessions) throw Error('Contact channels do not reconcile');
    return { days, startsAt, endsAt, eligibleSessions, channels };
  });
  for (const small of parsed[0].channels) {
    const large = parsed[1].channels.find(row => row.channel === small.channel)!;
    if (small.clicks > large.clicks || small.sessions > large.sessions) throw Error('Contact periods do not reconcile');
  }
  if (parsed[0].eligibleSessions > parsed[1].eligibleSessions) throw Error('Invalid contact denominators');
  return { periods: parsed };
}
