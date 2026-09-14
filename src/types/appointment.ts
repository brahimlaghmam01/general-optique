export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Appointment {
  id: string;
  /** ISO 8601 date-time. */
  date: string;
  motif: string;
  practitioner: string;
  store: string;
  status: AppointmentStatus;
}
