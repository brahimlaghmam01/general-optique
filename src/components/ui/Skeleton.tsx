import { useEffect } from 'react';
import { View, type DimensionValue } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  /** Tailwind border-radius class, e.g. "rounded-full". Defaults to "rounded-md". */
  rounded?: string;
}

const MIN_OPACITY = 0.3;
const MAX_OPACITY = 0.7;
const PULSE_DURATION_MS = 800;

/** Pulsing placeholder shown while real content is loading. */
export function Skeleton({ width = '100%', height = 16, rounded = 'rounded-md' }: SkeletonProps) {
  const opacity = useSharedValue(MIN_OPACITY);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(MAX_OPACITY, { duration: PULSE_DURATION_MS, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    // className must live on a plain View, not alongside an animated `style` on the
    // same Animated.View — see src/theme/nativewindInterop.ts.
    <Animated.View
      style={[{ width, height }, animatedStyle]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View className={`h-full w-full bg-border-light ${rounded}`} />
    </Animated.View>
  );
}
