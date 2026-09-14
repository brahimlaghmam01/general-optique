import { useCallback } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { SPRING_PRESS } from '@/theme/motion';

const DEFAULT_PRESS_SCALE = 0.96;
const SPRING_CONFIG = SPRING_PRESS;

/**
 * Drives the standard "press" micro-interaction (scale down on press-in,
 * spring back on press-out) shared by every pressable in the design system.
 */
export function useAnimatedPress(pressScale: number = DEFAULT_PRESS_SCALE) {
  const scale = useSharedValue(1);

  const onPressIn = useCallback(() => {
    scale.value = withSpring(pressScale, SPRING_CONFIG);
  }, [pressScale, scale]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING_CONFIG);
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { animatedStyle, onPressIn, onPressOut };
}
