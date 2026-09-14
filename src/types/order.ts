export type OrderStepStatus = 'completed' | 'in_progress' | 'upcoming';

export interface OrderStep {
  key: string;
  label: string;
  /** Compact label for the horizontal Home stepper, e.g. "Montage" vs the full "Montage & Centrage laser". */
  shortLabel?: string;
  status: OrderStepStatus;
  /** Fully formatted trailing detail, e.g. "24 août 2025 · Tiers-Payant accepté". */
  description?: string;
}

export interface Order {
  id: string;
  reference: string;
  statusLabel: string;
  category?: string;
  productName: string;
  productDescription: string;
  tag?: string;
  specs?: string[];
  pickupLocation?: string;
  /** ISO 8601 date. */
  estimatedReadyDate: string;
  steps: OrderStep[];
}
