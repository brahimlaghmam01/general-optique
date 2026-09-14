import { addDays, nextFriday, nextSaturday, set } from 'date-fns';

const DAY_LABEL_RESOLVERS: Record<string, (from: Date) => Date> = {
  Demain: (from) => addDays(from, 1),
  Vendredi: (from) => nextFriday(from),
  Samedi: (from) => nextSaturday(from),
};

/**
 * Turns a mock TimeSlot's day label + "HH:mm" time into a concrete ISO
 * date-time relative to `from` (defaults to now) — the only reason a booked
 * or rescheduled appointment can show a genuine date instead of a stale one.
 * Unrecognized labels fall back to "tomorrow" rather than throwing.
 */
export function resolveSlotDateTime(dayLabel: string, time: string, from: Date = new Date()): string {
  const resolveDay = DAY_LABEL_RESOLVERS[dayLabel] ?? ((base: Date) => addDays(base, 1));
  const day = resolveDay(from);
  const [hours, minutes] = time.split(':').map(Number);
  return set(day, { hours, minutes, seconds: 0, milliseconds: 0 }).toISOString();
}
