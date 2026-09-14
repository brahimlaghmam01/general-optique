import { Text, View } from 'react-native';
import { Circle, type LucideIcon } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { StepMarker } from '@/components/ui/StepMarker';
import { colors } from '@/theme/colors';
import type { OrderStep } from '@/types/order';

export interface OrderTimelineProps {
  steps: OrderStep[];
  /** Per-step trailing icon; falls back to a neutral dot when omitted. */
  getStepIcon?: (step: OrderStep) => LucideIcon;
}

/**
 * Vertical stepper (rail + rows) generalized from AtelierTimeline's
 * implementation so any order/process tracker can render from one place.
 * Deliberately just the stepper — the surrounding card, heading, and any
 * action buttons stay feature-specific and wrap this. `AtelierTimeline`
 * itself isn't migrated to use this yet (that happens when the Commandes
 * screen is redesigned); this only builds and verifies the primitive.
 */
export function OrderTimeline({ steps, getStepIcon }: OrderTimelineProps) {
  return (
    <View>
      {steps.map((step, index) => (
        <TimelineRow
          key={step.key}
          step={step}
          icon={getStepIcon?.(step) ?? Circle}
          isLast={index === steps.length - 1}
        />
      ))}
    </View>
  );
}

function TimelineRow({
  step,
  icon: Icon,
  isLast,
}: {
  step: OrderStep;
  icon: LucideIcon;
  isLast: boolean;
}) {
  const isUpcoming = step.status === 'upcoming';

  return (
    <View className="flex-row gap-3">
      <View className="items-center">
        <StepMarker status={step.status} />
        {!isLast && (
          <View
            className={step.status === 'completed' ? 'bg-primary-500' : 'bg-border-light'}
            style={{ width: 2, flex: 1 }}
          />
        )}
      </View>

      <View className={isLast ? 'flex-1 gap-1' : 'flex-1 gap-1 pb-6'}>
        <View className="flex-row items-center justify-between gap-2">
          <Text
            className={
              isUpcoming
                ? 'text-text-tertiary flex-1 text-sm font-semibold'
                : 'text-text-primary flex-1 text-sm font-semibold'
            }
          >
            {step.label}
          </Text>
          {step.status === 'in_progress' && <Badge label="En cours" variant="warning" size="sm" />}
        </View>
        {step.description && (
          <Text className={isUpcoming ? 'text-text-tertiary text-xs' : 'text-text-secondary text-xs'}>
            {step.description}
          </Text>
        )}
      </View>

      <Icon size={16} color={isUpcoming ? colors.text.tertiary : colors.primary[500]} />
    </View>
  );
}
