import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { formatAppointmentDateTime } from '@/lib/utils/date';
import type { Appointment } from '@/types/appointment';

export interface CancelAppointmentSheetProps {
  appointment: Appointment;
  onKeep: () => void;
  onConfirmCancel: () => void;
}

/** Shared cancellation-confirmation content — used by the main Rendez-vous card and its detail view. */
export function CancelAppointmentSheet({ appointment, onKeep, onConfirmCancel }: CancelAppointmentSheetProps) {
  return (
    <View className="gap-5">
      <Text className="text-text-primary text-2xl" style={{ fontFamily: 'InstrumentSerif_400Regular' }}>
        Annuler ce rendez-vous ?
      </Text>

      <View className="gap-1 rounded-xl bg-background-tertiary p-4">
        <Text className="text-text-primary text-sm font-semibold">
          {formatAppointmentDateTime(appointment.date)}
        </Text>
        <Text className="text-text-secondary text-xs">{appointment.store}</Text>
        <Text className="text-text-secondary text-xs">{appointment.motif}</Text>
      </View>

      <View className="gap-3">
        <Button label="Conserver le rendez-vous" fullWidth onPress={onKeep} />
        <Button label="Annuler" variant="danger" fullWidth onPress={onConfirmCancel} />
      </View>
    </View>
  );
}
