import { forwardRef, useMemo } from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import type { LucideIcon } from 'lucide-react-native';

import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';

export type IconButtonVariant = 'ghost' | 'filled' | 'outline';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  icon: LucideIcon;
  onPress: (event: GestureResponderEvent) => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  accessibilityLabel: string;
}

const CONTAINER_VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  filled: 'bg-primary-500',
  outline: 'bg-transparent border border-primary-500',
  ghost: 'bg-transparent',
};

const CONTAINER_DISABLED_CLASSES: Record<IconButtonVariant, string> = {
  filled: 'bg-border-medium',
  outline: 'bg-transparent border border-border-medium',
  ghost: 'bg-transparent',
};

const DIMENSION: Record<IconButtonSize, number> = { sm: 32, md: 40, lg: 48 };
const ICON_SIZE: Record<IconButtonSize, number> = { sm: 16, md: 20, lg: 24 };

function joinClasses(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Circular icon-only button — used for headers, cards, and inline actions. */
export const IconButton = forwardRef<View, IconButtonProps>(function IconButton(
  { icon: Icon, onPress, variant = 'ghost', size = 'md', disabled = false, accessibilityLabel },
  ref
) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress();
  const haptics = useHaptics();
  const dimension = DIMENSION[size];

  const containerClassName = useMemo(
    () =>
      joinClasses(
        'items-center justify-center rounded-full',
        disabled ? CONTAINER_DISABLED_CLASSES[variant] : CONTAINER_VARIANT_CLASSES[variant]
      ),
    [variant, disabled]
  );

  const iconColor = useMemo(() => {
    if (disabled) return colors.text.tertiary;
    return variant === 'filled' ? colors.text.inverse : colors.primary[500];
  }, [variant, disabled]);

  const handlePress = (event: GestureResponderEvent) => {
    if (disabled) return;
    haptics.light();
    onPress(event);
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      onPressIn={disabled ? undefined : onPressIn}
      onPressOut={disabled ? undefined : onPressOut}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
    >
      {/* className must live on a plain View, not alongside an animated `style` on the
          same Animated.View — see src/theme/nativewindInterop.ts. */}
      <Animated.View style={[{ width: dimension, height: dimension }, animatedStyle]}>
        <View className={containerClassName} style={{ width: dimension, height: dimension }}>
          <Icon size={ICON_SIZE[size]} color={iconColor} />
        </View>
      </Animated.View>
    </Pressable>
  );
});
