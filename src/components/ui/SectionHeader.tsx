import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

export interface SectionHeaderProps {
  title: string;
  trailing?: ReactNode;
}

/** Uppercase overline + optional trailing slot, used above every Profil section. */
export function SectionHeader({ title, trailing }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
        {title}
      </Text>
      {trailing}
    </View>
  );
}
