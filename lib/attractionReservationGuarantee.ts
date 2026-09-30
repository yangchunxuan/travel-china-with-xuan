/**
 * Owner decision for the attraction reservation service: a request sent and
 * paid at least this many days before the visit date is a guaranteed
 * booking at every offered attraction. If Homeground fails to secure it, the
 * service fee and the ticket money for that attraction are refunded in full.
 * A later request is still attempted but not guaranteed; if it is not
 * secured, that attraction's fee and any unused ticket money are refunded.
 *
 * It lives in its own module so the legal copy (used by the client footer)
 * can state it without pulling in the reservation rules and tour prices.
 */
export const ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS = 8;
