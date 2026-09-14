import { useMemo } from 'react';
import { MapPin } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { HealthAlertCard } from '@/components/features/home/HealthAlertCard';
import { HeroAppointmentCard } from '@/components/features/home/HeroAppointmentCard';
import { OrderStatusCard } from '@/components/features/home/OrderStatusCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { DURATION_MICRO, useMotionPreset } from '@/theme/motion';
import type { HomePrimaryContext } from '@/lib/utils/homeContext';
import type { HealthAlert } from '@/types/health';

export interface PrimaryContextCardProps {
  context: HomePrimaryContext;
  onPressAppointment: () => void;
  onPressOrder: () => void;
  /** Receives the alert so the caller can decide the destination from its `kind`. */
  onPressHealth: (alert: HealthAlert) => void;
  onPressDiscover: () => void;
}

/**
 * Renders exactly one of Home's four priority states behind a single shared
 * entrance animation, so switching context (a keyed remount) reads as a
 * replacement rather than an abrupt swap. Which state to show is decided
 * entirely by getHomePrimaryContext — this component only presents it.
 */
export function PrimaryContextCard({
  context,
  onPressAppointment,
  onPressOrder,
  onPressHealth,
  onPressDiscover,
}: PrimaryContextCardProps) {
  const { reduced } = useMotionPreset();
  const entering = useMemo(
    () => (reduced ? FadeIn.duration(DURATION_MICRO) : FadeInDown.springify()),
    [reduced]
  );

  return (
    <Animated.View key={context.type} entering={entering}>
      {context.type === 'appointment' && (
        <HeroAppointmentCard appointment={context.appointment} onPress={onPressAppointment} />
      )}
      {context.type === 'order' && (
        <OrderStatusCard order={context.order} onPress={onPressOrder} />
      )}
      {context.type === 'health' && (
        <HealthAlertCard alert={context.alert} onPressAction={() => onPressHealth(context.alert)} />
      )}
      {context.type === 'default' && (
        <EmptyState
          icon={MapPin}
          title="Découvrez votre magasin"
          description="Trouvez la boutique Générale d'Optique la plus proche et réservez votre créneau."
          actionLabel="Trouver un magasin"
          onPressAction={onPressDiscover}
        />
      )}
    </Animated.View>
  );
}
