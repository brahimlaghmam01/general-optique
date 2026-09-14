import type { HealthAlertKind } from '@/types/health';

/**
 * Where a health alert's CTA leads, decided entirely by its `kind` — the
 * card and screen never hardcode a single destination. Extend by adding a
 * kind to HealthAlertKind and a branch here.
 */
export function getHealthAlertHref(kind: HealthAlertKind): string {
  switch (kind) {
    case 'prescription':
      return '/ma-sante-visuelle/ordonnances';
    case 'mutuelle':
      return '/ma-sante-visuelle/mutuelle';
    case 'checkup':
      return '/appointment/book';
  }
}
