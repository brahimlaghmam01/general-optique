import { View } from 'react-native';
import { Check } from 'lucide-react-native';

import { PulsingDot } from '@/components/ui/PulsingDot';
import { colors } from '@/theme/colors';
import type { OrderStepStatus } from '@/types/order';

export interface StepMarkerProps {
  status: OrderStepStatus;
  size?: number;
}

/** Completed / in-progress / upcoming marker shared by horizontal and vertical steppers. */
export function StepMarker({ status, size = 24 }: StepMarkerProps) {
  if (status === 'completed') {
    return (
      <View
        className="items-center justify-center rounded-full bg-primary-500"
        style={{ width: size, height: size }}
      >
        <Check size={size * 0.58} color="#FFFFFF" />
      </View>
    );
  }

  if (status === 'in_progress') {
    return (
      <View style={{ width: size, height: size }} className="items-center justify-center">
        <PulsingDot color={colors.primary[500]} size={size} />
      </View>
    );
  }

  return (
    <View
      className="rounded-full border-2 border-border-light bg-background-secondary"
      style={{ width: size, height: size }}
    />
  );
}
