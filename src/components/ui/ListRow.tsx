import { useMemo, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { ChevronRight, type LucideIcon } from 'lucide-react-native';

import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';

export interface ListRowProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightSlot?: ReactNode;
  showChevron?: boolean;
  iconTint?: 'default' | 'brand';
}

/** Icon + title/subtitle + trailing slot — the single settings-row primitive for Profil. */
export function ListRow({
  icon: Icon,
  title,
  subtitle,
  onPress,
  rightSlot,
  showChevron = false,
  iconTint = 'default',
}: ListRowProps) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress(0.98);
  const haptics = useHaptics();

  const iconContainerClassName = useMemo(
    () =>
      iconTint === 'brand'
        ? 'h-10 w-10 items-center justify-center rounded-lg bg-primary-50'
        : 'h-10 w-10 items-center justify-center rounded-lg bg-background-tertiary',
    [iconTint]
  );

  const content = (
    <>
      <View className={iconContainerClassName}>
        <Icon size={18} color={iconTint === 'brand' ? colors.primary[500] : colors.text.tertiary} />
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="text-text-primary text-sm font-medium">{title}</Text>
        {subtitle && (
          <Text className="text-text-secondary text-xs" numberOfLines={2}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightSlot}
      {!rightSlot && showChevron && <ChevronRight size={18} color={colors.text.tertiary} />}
    </>
  );

  if (!onPress) {
    return <View className="flex-row items-center gap-3 py-3">{content}</View>;
  }

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Animated.View style={animatedStyle} className="flex-row items-center gap-3 py-3">
        {content}
      </Animated.View>
    </Pressable>
  );
}
