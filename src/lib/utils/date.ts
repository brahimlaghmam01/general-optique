import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** "2025-08-28T10:30:00" -> "Jeudi 28 août à 10h30" */
export function formatAppointmentDateTime(iso: string): string {
  return capitalize(format(parseISO(iso), "EEEE d MMMM 'à' HH'h'mm", { locale: fr }));
}

/** "2025-09-02" -> "2 sept." */
export function formatShortDate(iso: string): string {
  return format(parseISO(iso), 'd MMM', { locale: fr });
}

/** "2025-09-02" -> "Mardi 2 septembre 2025" */
export function formatFullDate(iso: string): string {
  return capitalize(format(parseISO(iso), 'EEEE d MMMM yyyy', { locale: fr }));
}
