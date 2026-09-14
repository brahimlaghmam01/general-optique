import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Calendar, ChevronRight, RefreshCw, Store as StoreIcon, XCircle } from 'lucide-react-native';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { formatAppointmentDateTime } from '@/lib/utils/date';
import { getAppointmentStatusMeta } from '@/lib/utils/appointmentStatus';
import { colors } from '@/theme/colors';
import type { Appointment } from '@/types/appointment';
import type { Store } from '@/types/store';

export interface UpcomingAppointmentCardProps {
  appointment: Appointment;
  store: Store;
  onPressDetail: () => void;
  onPressAddToCalendar: () => void;
  onPressModify: () => void;
  onPressCancel: () => void;
}

/** Confirmed next-appointment summary — tap to open the full detail view; compact secondary actions below. */
export function UpcomingAppointmentCard({
  appointment,
  store,
  onPressDetail,
  onPressAddToCalendar,
  onPressModify,
  onPressCancel,
}: UpcomingAppointmentCardProps) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress(0.98);
  const date = parseISO(appointment.date);
  const monthLabel = format(date, 'LLL', { locale: fr }).toUpperCase().replace('.', '');
  const dayNumber = format(date, 'd');
  const statusMeta = getAppointmentStatusMeta(appointment.status);

  return (
    <View className="gap-4 rounded-2xl border border-border-light bg-background-secondary p-5">
      <Pressable
        onPress={onPressDetail}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessibilityRole="button"
        accessibilityLabel="Voir le détail du rendez-vous"
      >
        <Animated.View style={animatedStyle} className="gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
              Prochaine consultation
            </Text>
            <Badge label={statusMeta.label} variant={statusMeta.variant} size="sm" />
          </View>

          <View className="flex-row items-center gap-4">
            <View className="w-16 items-center gap-0.5 rounded-xl border border-border-light bg-background-tertiary py-2">
              <Text className="text-[10px] font-semibold uppercase tracking-wider text-primary-500">
                {monthLabel}
              </Text>
              <Text className="text-text-primary text-2xl font-semibold">{dayNumber}</Text>
            </View>
            <View className="flex-1 gap-1">
              <Text className="text-text-primary text-base font-semibold">
                {formatAppointmentDateTime(appointment.date)}
              </Text>
              <Text className="text-text-secondary text-sm">
                {appointment.practitioner} · {appointment.motif}
              </Text>
            </View>
            <ChevronRight size={18} color={colors.text.tertiary} />
          </View>

          <View className="flex-row items-center gap-3 rounded-xl bg-background-tertiary p-3">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-background-secondary">
              <StoreIcon size={16} color={colors.primary[500]} />
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="text-text-primary text-sm font-medium">{store.fullName}</Text>
              <Text className="text-text-secondary text-xs">
                {store.addressLine} · À {store.distanceLabel}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>

      <View className="flex-row gap-2">
        <View className="flex-1">
          <Button
            label="Ajouter"
            icon={Calendar}
            variant="secondary"
            size="sm"
            onPress={onPressAddToCalendar}
            fullWidth
          />
        </View>
        <View className="flex-1">
          <Button
            label="Modifier"
            icon={RefreshCw}
            variant="secondary"
            size="sm"
            onPress={onPressModify}
            fullWidth
          />
        </View>
        <View className="flex-1">
          <Button
            label="Annuler"
            icon={XCircle}
            variant="secondary"
            size="sm"
            onPress={onPressCancel}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}
