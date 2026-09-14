import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/theme/colors';
import { SPRING_PRESS } from '@/theme/motion';
import { radius } from '@/theme/spacing';

export interface OtpInputProps {
  length?: number;
  onComplete: (code: string) => void;
  hasError?: boolean;
  autoFocus?: boolean;
}

const BOX_SPRING = SPRING_PRESS;

/**
 * A single hidden TextInput drives 6 visual digit boxes — this makes paste
 * (a full pasted code lands in one onChangeText call) and auto-advance free,
 * rather than juggling focus across 6 real inputs.
 */
export function OtpInput({ length = 6, onComplete, hasError = false, autoFocus = true }: OtpInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);
  const shakeX = useSharedValue(0);

  useEffect(() => {
    if (hasError) {
      shakeX.value = withSequence(
        withTiming(-8, { duration: 45 }),
        withTiming(8, { duration: 45 }),
        withTiming(-6, { duration: 45 }),
        withTiming(6, { duration: 45 }),
        withTiming(0, { duration: 45 })
      );
    }
  }, [hasError, shakeX]);

  const handleChangeText = (text: string) => {
    const digits = text.replace(/[^0-9]/g, '').slice(0, length);
    setValue(digits);
    if (digits.length === length) {
      onComplete(digits);
    }
  };

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  return (
    <Pressable onPress={() => inputRef.current?.focus()} accessibilityRole="none">
      {/* className must live on a plain View, not alongside an animated `style` on the
          same Animated.View — see src/theme/nativewindInterop.ts. */}
      <Animated.View style={shakeStyle}>
        <View className="flex-row gap-2">
          {Array.from({ length }).map((_, index) => (
            <DigitBox
              key={index}
              digit={value[index]}
              isActive={index === value.length}
              hasError={hasError}
            />
          ))}
        </View>
      </Animated.View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        maxLength={length}
        autoFocus={autoFocus}
        accessibilityLabel="Code de vérification à 6 chiffres"
        style={{ position: 'absolute', opacity: 0, height: 1, width: 1 }}
      />
    </Pressable>
  );
}

function DigitBox({
  digit,
  isActive,
  hasError,
}: {
  digit: string | undefined;
  isActive: boolean;
  hasError: boolean;
}) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isActive ? 1.06 : 1, BOX_SPRING);
  }, [isActive, scale]);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const borderColor = hasError
    ? colors.error
    : isActive
      ? colors.primary[500]
      : colors.border.light;

  return (
    // className must live on a plain View, not alongside an animated `style` on the
    // same Animated.View — see src/theme/nativewindInterop.ts. `flex:1` and
    // `borderRadius` are replicated inline so the row-sharing and the rounded
    // border/background stay aligned once className moves to the inner View.
    <Animated.View
      style={[{ flex: 1, height: 56, borderWidth: 2, borderColor, borderRadius: radius.xl }, style]}
    >
      <View className="flex-1 items-center justify-center rounded-xl bg-background-secondary">
        <Text
          className="text-text-primary text-xl font-semibold"
          style={{ fontFamily: 'JetBrainsMono_400Regular' }}
        >
          {digit ?? ''}
        </Text>
      </View>
    </Animated.View>
  );
}
