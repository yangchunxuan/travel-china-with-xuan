export function isIsoDateTimeWithTimezone(value) {
  if (typeof value !== "string") return false;

  const match =
    /^(\d{4})-(\d{2})-(\d{2})T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-])(\d{2}):(\d{2}))$/u.exec(
      value,
    );
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    0,
    31,
    leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month]) {
    return false;
  }

  if (match[4] === undefined) return true;
  const offsetHour = Number(match[5]);
  const offsetMinute = Number(match[6]);
  return (
    offsetMinute <= 59 &&
    (offsetHour < 14 || (offsetHour === 14 && offsetMinute === 0))
  );
}
