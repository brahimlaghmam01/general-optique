import { useEffect, useState, type ReactNode } from 'react';
import { AccessibilityInfo, Platform, StyleSheet, View, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

import { colors } from '@/theme/colors';

export interface GlassContainerProps {
  /** Optional — omit for a purely decorative backdrop layer (e.g. behind a sheet's own content). */
  children?: ReactNode;
  /** 1–100, default 50. */
  intensity?: number;
  /** Tailwind rounding class for the container's corners. */
  roundedClassName?: string;
  className?: string;
  style?: ViewStyle;
}

/** background.primary (#F5F3EE) at 60% — the brand's warm-white glass tint. */
const GLASS_OVERLAY_COLOR = 'rgba(245, 243, 238, 0.6)';

/**
 * The one glass/blur primitive in the app. Floating tab bar, bottom sheets,
 * and transient overlays route through this — never primary content
 * surfaces (cards, list rows stay solid per the brand's restrained-glass rule).
 *
 * `className` is applied to a plain View wrapper (not BlurView directly) so
 * rounding/border are guaranteed to work regardless of NativeWind's support
 * for third-party native components; the blur layer fills behind it.
 * Falls back to a solid fill when iOS "Reduce Transparency" is enabled.
 */
export function GlassContainer({
  children,
  intensity = 50,
  roundedClassName = 'rounded-full',
  className,
  style,
}: GlassContainerProps) {
  const [reduceTransparency, setReduceTransparency] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'ios') return undefined;

    AccessibilityInfo.isReduceTransparencyEnabled?.()
      .then(setReduceTransparency)
      .catch(() => {});

    const subscription = AccessibilityInfo.addEventListener?.(
      'reduceTransparencyChanged',
      setReduceTransparency
    );
    return () => subscription?.remove();
  }, []);

  const containerClassName = joinClasses(
    'overflow-hidden border border-white/40',
    roundedClassName,
    className
  );

  if (reduceTransparency) {
    return (
      <View
        className={containerClassName}
        style={[{ backgroundColor: colors.background.secondary }, style]}
      >
        {children}
      </View>
    );
  }

  return (
    <View className={containerClassName} style={style}>
      <BlurView
        intensity={intensity}
        tint="light"
        blurMethod="dimezisBlurViewSdk31Plus"
        style={[StyleSheet.absoluteFill, { backgroundColor: GLASS_OVERLAY_COLOR }]}
      />
      {children}
    </View>
  );
}

function joinClasses(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
