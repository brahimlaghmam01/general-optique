import type { Appointment } from '@/types/appointment';
import type { HealthAlert } from '@/types/health';
import type { Order } from '@/types/order';

export type HomePrimaryContext =
  | { type: 'appointment'; appointment: Appointment }
  | { type: 'order'; order: Order }
  | { type: 'health'; alert: HealthAlert }
  | { type: 'default' };

export interface HomeContextInput {
  appointment?: Appointment | null;
  order?: Order | null;
  healthAlert?: HealthAlert | null;
}

/** An order is still "active" while its last step hasn't been reached yet. */
export function isOrderActive(order: Order): boolean {
  const lastStep = order.steps[order.steps.length - 1];
  return lastStep ? lastStep.status !== 'completed' : false;
}

/**
 * Deterministic Home priority: exactly one contextual state becomes the
 * primary surface (upcoming appointment > active order > health reminder >
 * default discovery). Extend by adding a branch + a HomePrimaryContext
 * variant — the screen renders whatever this returns, it never decides.
 */
export function getHomePrimaryContext({
  appointment,
  order,
  healthAlert,
}: HomeContextInput): HomePrimaryContext {
  if (appointment && appointment.status !== 'cancelled') {
    return { type: 'appointment', appointment };
  }
  if (order && isOrderActive(order)) {
    return { type: 'order', order };
  }
  if (healthAlert) {
    return { type: 'health', alert: healthAlert };
  }
  return { type: 'default' };
}

/**
 * The valid (non-primary) contexts left over after `getHomePrimaryContext`,
 * for Home's compact secondary rows. Same validity rules as the primary
 * function, so a context never appears as both primary and secondary.
 */
export function getHomeSecondaryContexts(
  { appointment, order, healthAlert }: HomeContextInput,
  primary: HomePrimaryContext,
  limit = 2
): HomePrimaryContext[] {
  const candidates: HomePrimaryContext[] = [];

  if (appointment && appointment.status !== 'cancelled') {
    candidates.push({ type: 'appointment', appointment });
  }
  if (order && isOrderActive(order)) {
    candidates.push({ type: 'order', order });
  }
  if (healthAlert) {
    candidates.push({ type: 'health', alert: healthAlert });
  }

  return candidates.filter((candidate) => candidate.type !== primary.type).slice(0, limit);
}
