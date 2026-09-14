import { useEffect, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';

import { useHaptics } from '@/hooks/useHaptics';
import { SPRING_TOGGLE } from '@/theme/motion';

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Rich label content — supports an inline pressable link (e.g. to terms). */
  children: ReactNode;
  error?: boolean;
  accessibilityLabel: string;
}

/** Consent checkbox with a spring-scaled check — used for RGPD/HDS acceptance rows. */
export function Checkbox({ checked, onCheckedChange, children, error, accessibilityLabel }: CheckboxProps) {
  const scale = useSharedValue(checked ? 1 : 0);
  const haptics = useHaptics();

  useEffect(() => {
    scale.value = withSpring(checked ? 1 : 0, SPRING_TOGGLE);
  }, [checked, scale]);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  const handlePress = () => {
    haptics.light();
    onCheckedChange(!checked);
  };

  const boxClassName = error
    ? 'border-error bg-background-secondary'
    : checked
      ? 'border-primary-500 bg-primary-500'
      : 'border-border-medium bg-background-secondary';

  return (
    <Pressable
      onPress={handlePress}
      className="flex-row items-start gap-3"
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel}
    >
      <View className={`mt-0.5 h-5 w-5 items-center justify-center rounded-md border-2 ${boxClassName}`}>
        <Animated.View style={checkStyle}>
          <Check size={12} color="#FFFFFF" />
        </Animated.View>
      </View>
      <View className="flex-1">{children}</View>
    </Pressable>
  );
}
