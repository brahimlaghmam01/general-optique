export interface VisitMotif {
  id: string;
  label: string;
  description: string;
  durationMinutes: number;
  recommended?: boolean;
}

export interface TimeSlot {
  id: string;
  dayLabel: string;
  time: string;
  practitioner: string;
}
