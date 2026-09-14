import { forwardRef, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';
import { SPRING_TOGGLE } from '@/theme/motion';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  /** Use on dark surfaces (e.g. a primary-colored card) so the toggle stays visible. */
  inverse?: boolean;
  accessibilityLabel?: string;
}

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 24;
const THUMB_INSET = 2;
const SPRING_CONFIG = SPRING_TOGGLE;

const TRACK_COLORS = {
  default: [colors.border.light, colors.primary[500]] as const,
  inverse: ['rgba(255,255,255,0.25)', '#FFFFFF'] as const,
};

const THUMB_COLORS = {
  default: [colors.background.secondary, colors.background.secondary] as const,
  inverse: [colors.background.secondary, colors.primary[500]] as const,
};

/** Animated on/off toggle — track color and thumb position both spring-interpolate. */
export const Switch = forwardRef<View, SwitchProps>(function Switch(
  { checked, onCheckedChange, disabled = false, inverse = false, accessibilityLabel },
  ref
) {
  const progress = useSharedValue(checked ? 1 : 0);
  const haptics = useHaptics();

  useEffect(() => {
    progress.value = withSpring(checked ? 1 : 0, SPRING_CONFIG);
  }, [checked, progress]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      inverse ? TRACK_COLORS.inverse : TRACK_COLORS.default
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [THUMB_INSET, TRACK_WIDTH - THUMB_SIZE - THUMB_INSET]
        ),
      },
    ],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      inverse ? THUMB_COLORS.inverse : THUMB_COLORS.default
    ),
  }));

  const handlePress = () => {
    if (disabled) return;
    haptics.selection();
    onCheckedChange(!checked);
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked, disabled }}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View
        style={[
          { width: TRACK_WIDTH, height: TRACK_HEIGHT, borderRadius: TRACK_HEIGHT / 2 },
          trackStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              marginTop: THUMB_INSET,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
});
