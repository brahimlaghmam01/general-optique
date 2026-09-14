/** What the alert is fundamentally about — decides where its CTA leads. */
export type HealthAlertKind = 'prescription' | 'checkup' | 'mutuelle';

export interface HealthAlert {
  kind: HealthAlertKind;
  coverageLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
}
