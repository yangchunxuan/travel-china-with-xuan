/**
 * Owner decision for the attraction reservation service: a booking is
 * guaranteed at every offered attraction only when the request, the payment
 * AND complete passport details for every traveller all reach Homeground at
 * least this many days before the visit date (owner decision, 2026-10-22).
 * Passport details are still requested only after the traveller accepts the
 * written confirmation, and must arrive by this same deadline. If Homeground
 * fails to secure a guaranteed booking, the service fee and the ticket money
 * for that attraction are refunded in full. If any of the three arrives
 * later, the booking is still attempted but not guaranteed; if it is not
 * secured, that attraction's fee and any unused ticket money are refunded.
 *
 * It lives in its own module so the legal copy (used by the client footer)
 * can state it without pulling in the reservation rules and tour prices.
 */
export const ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS = 8;
