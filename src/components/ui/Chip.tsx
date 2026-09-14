import { forwardRef, useMemo, type ReactNode } from 'react';
import { Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import Animated from 'react-native-reanimated';

import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';

export interface ChipProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  active?: boolean;
  icon?: ReactNode;
}

function joinClasses(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Filter / selection tag — e.g. motif-de-visite or store pickers. */
export const Chip = forwardRef<View, ChipProps>(function Chip(
  { label, onPress, active = false, icon },
  ref
) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress();
  const haptics = useHaptics();

  const containerClassName = useMemo(
    () =>
      joinClasses(
        'flex-row items-center gap-1.5 rounded-lg px-3 py-2',
        active ? 'bg-primary-900' : 'bg-background-tertiary'
      ),
    [active]
  );

  const labelClassName = useMemo(
    () => joinClasses('text-sm font-medium', active ? 'text-text-inverse' : 'text-text-primary'),
    [active]
  );

  if (!onPress) {
    return (
      <View ref={ref} className={containerClassName}>
        {icon}
        <Text className={labelClassName}>{label}</Text>
      </View>
    );
  }

  const handlePress = (event: GestureResponderEvent) => {
    haptics.light();
    onPress(event);
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
    >
      {/* className must live on a plain View, not alongside an animated `style` on the
          same Animated.View — see src/theme/nativewindInterop.ts. */}
      <Animated.View style={animatedStyle}>
        <View className={containerClassName}>
          {icon}
          <Text className={labelClassName}>{label}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
});
