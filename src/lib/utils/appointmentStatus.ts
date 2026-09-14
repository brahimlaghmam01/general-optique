import type { BadgeVariant } from '@/components/ui/Badge';
import type { AppointmentStatus } from '@/types/appointment';

export interface AppointmentStatusMeta {
  label: string;
  variant: BadgeVariant;
}

const APPOINTMENT_STATUS_META: Record<AppointmentStatus, AppointmentStatusMeta> = {
  confirmed: { label: 'Confirmé', variant: 'success' },
  pending: { label: 'En attente', variant: 'warning' },
  cancelled: { label: 'Annulé', variant: 'error' },
};

/** Single source of truth for how an appointment status renders as a Badge — used on the main card and its detail view. */
export function getAppointmentStatusMeta(status: AppointmentStatus): AppointmentStatusMeta {
  return APPOINTMENT_STATUS_META[status];
}
