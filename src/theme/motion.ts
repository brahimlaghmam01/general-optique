import { useReducedMotion } from 'react-native-reanimated';

/**
 * Centralized spring/duration presets. useAnimatedPress, Checkbox, OtpInput,
 * and Switch all import their spring configs from here. AnimatedTabBar keeps
 * its own inline values deliberately — it's frozen as a "before" reference
 * on /design-system, not part of the production app.
 */
export const SPRING_PRESS = { damping: 15, stiffness: 400 } as const;
export const SPRING_TOGGLE = { damping: 12, stiffness: 400 } as const;
export const SPRING_TAB_INDICATOR = { damping: 18, stiffness: 200 } as const;

/** Duration constants (ms), matching the brief's micro/component/screen scale. */
export const DURATION_MICRO = 150;
export const DURATION_COMPONENT = 220;
export const DURATION_SCREEN = 350;

export const motion = {
  springPress: SPRING_PRESS,
  springToggle: SPRING_TOGGLE,
  springTabIndicator: SPRING_TAB_INDICATOR,
  durationMicro: DURATION_MICRO,
  durationComponent: DURATION_COMPONENT,
  durationScreen: DURATION_SCREEN,
} as const;

export interface MotionPreset {
  /** True when the OS "Reduce Motion" accessibility setting is on. */
  reduced: boolean;
  /** Entrance duration to use — short fade under reduced motion, full duration otherwise. */
  entranceDuration: number;
}

/**
 * Reduced-motion-aware entrance timing. Components that use Reanimated's
 * `entering={...}` prop should branch on `reduced` to swap a spring/slide
 * entrance for a short fade — see the /design-system showcase for the pattern.
 */
export function useMotionPreset(): MotionPreset {
  const reduced = useReducedMotion();
  return {
    reduced,
    entranceDuration: reduced ? DURATION_MICRO : DURATION_SCREEN,
  };
}
