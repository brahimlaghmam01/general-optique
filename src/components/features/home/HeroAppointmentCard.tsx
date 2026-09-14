import { Text, View } from 'react-native';
import { Calendar, MapPin, ShieldCheck, Stethoscope } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { formatAppointmentDateTime } from '@/lib/utils/date';
import type { Appointment } from '@/types/appointment';

export interface HeroAppointmentCardProps {
  appointment: Appointment;
  onPress: () => void;
}

/** Deep-green hero card surfacing the member's next confirmed appointment. */
export function HeroAppointmentCard({ appointment, onPress }: HeroAppointmentCardProps) {
  return (
    <View className="gap-5 rounded-2xl bg-primary-500 p-5">
      <View className="flex-row items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1">
        <ShieldCheck size={12} color="#FFFFFF" />
        <Text className="text-[10px] font-semibold uppercase tracking-wider text-white">
          Votre expérience Générale d&apos;Optique
        </Text>
      </View>

      <View className="gap-3">
        <Text className="text-2xl text-white" style={{ fontFamily: 'InstrumentSerif_400Regular' }}>
          Votre prochain rendez-vous
        </Text>

        <View className="gap-1.5">
          <View className="flex-row items-center gap-2">
            <Calendar size={16} color="rgba(255,255,255,0.85)" />
            <Text className="text-sm text-white/85">{formatAppointmentDateTime(appointment.date)}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <MapPin size={16} color="rgba(255,255,255,0.85)" />
            <Text className="text-sm text-white/85">{appointment.store}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Stethoscope size={16} color="rgba(255,255,255,0.85)" />
            <Text className="text-sm text-white/85">{appointment.motif}</Text>
          </View>
        </View>
      </View>

      <Button label="Voir mon rendez-vous →" variant="inverse" onPress={onPress} fullWidth />
    </View>
  );
}
