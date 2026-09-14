import { forwardRef, useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type PressableProps,
} from 'react-native';
import Animated from 'react-native-reanimated';
import type { LucideIcon } from 'lucide-react-native';

import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'inverse' | 'outlineInverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'onPress' | 'children' | 'style'> {
  /** Visible label. Also used as the default accessibility label. */
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner in place of the label/icons and blocks interaction. */
  loading?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  accessibilityLabel?: string;
}

const CONTAINER_BASE_CLASSES = 'flex-row items-center justify-center';

const CONTAINER_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 border border-primary-500',
  secondary: 'bg-transparent border border-primary-500',
  ghost: 'bg-transparent border border-transparent',
  danger: 'bg-error border border-error',
  inverse: 'bg-background-secondary border border-background-secondary',
  outlineInverse: 'bg-transparent border border-white/40',
};

const CONTAINER_DISABLED_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-border-medium border border-border-medium',
  secondary: 'bg-transparent border border-border-medium',
  ghost: 'bg-transparent border border-transparent',
  danger: 'bg-border-medium border border-border-medium',
  inverse: 'bg-white/40 border border-white/40',
  outlineInverse: 'bg-transparent border border-white/20',
};

const LABEL_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'text-text-inverse',
  secondary: 'text-primary-500',
  ghost: 'text-primary-500',
  danger: 'text-text-inverse',
  inverse: 'text-primary-500',
  outlineInverse: 'text-text-inverse',
};

const LABEL_DISABLED_CLASS = 'text-text-tertiary';

const SIZE_CONTAINER_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 rounded-lg gap-1.5',
  md: 'px-5 py-3 rounded-xl gap-2',
  lg: 'px-6 py-4 rounded-xl gap-2.5',
};

const SIZE_LABEL_CLASSES: Record<ButtonSize, string> = {
  sm: 'text-sm font-semibold',
  md: 'text-base font-semibold',
  lg: 'text-lg font-semibold',
};

const ICON_SIZE: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 };

const INVERSE_TEXT_VARIANTS: ReadonlySet<ButtonVariant> = new Set([
  'primary',
  'danger',
  'outlineInverse',
]);

function joinClasses(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Core design-system button. Variants (primary/secondary/ghost/danger) and
 * sizes (sm/md/lg) cover every CTA in the app; icon, loading and disabled
 * states compose on top so screens never need bespoke button styling.
 */
export const Button = forwardRef<View, ButtonProps>(function Button(
  {
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    fullWidth = false,
    accessibilityLabel,
    ...pressableProps
  },
  ref
) {
  const isDisabled = disabled || loading;
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress();
  const haptics = useHaptics();

  const containerClassName = useMemo(
    () =>
      joinClasses(
        CONTAINER_BASE_CLASSES,
        SIZE_CONTAINER_CLASSES[size],
        isDisabled ? CONTAINER_DISABLED_CLASSES[variant] : CONTAINER_VARIANT_CLASSES[variant]
      ),
    [size, variant, isDisabled]
  );

  const labelClassName = useMemo(
    () =>
      joinClasses(
        SIZE_LABEL_CLASSES[size],
        isDisabled ? LABEL_DISABLED_CLASS : LABEL_VARIANT_CLASSES[variant]
      ),
    [size, variant, isDisabled]
  );

  const iconColor = useMemo(() => {
    if (isDisabled) return colors.text.tertiary;
    return INVERSE_TEXT_VARIANTS.has(variant) ? colors.text.inverse : colors.primary[500];
  }, [variant, isDisabled]);

  const spinnerColor = iconColor;

  const handlePress = (event: GestureResponderEvent) => {
    if (isDisabled) return;
    haptics.light();
    onPress?.(event);
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      onPressIn={isDisabled ? undefined : onPressIn}
      onPressOut={isDisabled ? undefined : onPressOut}
      disabled={isDisabled}
      className={fullWidth ? 'w-full' : 'self-start'}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...pressableProps}
    >
      {/* className must live on a plain View, never alongside an animated `style` on the
          same Animated.View — see src/theme/nativewindInterop.ts for why that silently
          drops one of the two on native. */}
      <Animated.View style={animatedStyle}>
        <View className={containerClassName}>
          {loading ? (
            <ActivityIndicator size="small" color={spinnerColor} />
          ) : (
            <>
              {Icon && iconPosition === 'left' && <Icon size={ICON_SIZE[size]} color={iconColor} />}
              <Text className={labelClassName}>{label}</Text>
              {Icon && iconPosition === 'right' && <Icon size={ICON_SIZE[size]} color={iconColor} />}
            </>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
});
