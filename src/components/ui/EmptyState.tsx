import { Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { colors } from '@/theme/colors';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

/** Icon + short copy + optional CTA — for "nothing here yet" states. */
export function EmptyState({ icon: Icon, title, description, actionLabel, onPressAction }: EmptyStateProps) {
  return (
    <View className="items-center gap-3 px-6 py-8">
      <View className="h-14 w-14 items-center justify-center rounded-full bg-primary-50">
        <Icon size={24} color={colors.primary[500]} />
      </View>
      <View className="gap-1">
        <Text className="text-text-primary text-center text-base font-semibold">{title}</Text>
        {description && (
          <Text className="text-text-secondary text-center text-sm">{description}</Text>
        )}
      </View>
      {actionLabel && onPressAction && (
        <Button label={actionLabel} variant="secondary" size="sm" onPress={onPressAction} />
      )}
    </View>
  );
}
