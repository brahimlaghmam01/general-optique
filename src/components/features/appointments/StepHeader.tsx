import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

export interface StepHeaderProps {
  step: number;
  title: string;
  trailing?: ReactNode;
}

/** Numbered circle + title row shared by the three booking-flow steps. */
export function StepHeader({ step, title, trailing }: StepHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <View className="h-6 w-6 items-center justify-center rounded-full bg-primary-500">
          <Text className="text-xs font-semibold text-white">{step}</Text>
        </View>
        <Text className="text-text-primary text-base font-semibold">{title}</Text>
      </View>
      {trailing}
    </View>
  );
}
