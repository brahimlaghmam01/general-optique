import { forwardRef, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
  type TextStyle,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react-native';

import { IconButton } from '@/components/ui/IconButton';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/spacing';

export interface TextFieldProps
  extends Pick<
    TextInputProps,
    'autoComplete' | 'autoFocus' | 'onBlur' | 'onFocus' | 'maxLength' | 'returnKeyType' | 'onSubmitEditing'
  > {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onPressRightIcon?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
}

const FOCUS_DURATION_MS = 180;

/** Suppresses the browser's default focus ring on web so only our animated border shows. */
const WEB_NO_OUTLINE_STYLE = { outlineStyle: 'none' } as unknown as TextStyle;

/** The foundation text input — animated focus border, inline error, and a built-in password toggle. */
export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  {
    label,
    placeholder,
    value,
    onChangeText,
    error,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    onPressRightIcon,
    secureTextEntry = false,
    keyboardType = 'default',
    editable = true,
    onFocus,
    onBlur,
    ...inputProps
  },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const focusProgress = useSharedValue(0);

  const handleFocus: TextInputProps['onFocus'] = (event) => {
    setIsFocused(true);
    focusProgress.value = withTiming(1, { duration: FOCUS_DURATION_MS });
    onFocus?.(event);
  };

  const handleBlur: TextInputProps['onBlur'] = (event) => {
    setIsFocused(false);
    focusProgress.value = withTiming(0, { duration: FOCUS_DURATION_MS });
    onBlur?.(event);
  };

  const borderAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: error
      ? colors.error
      : interpolateColor(focusProgress.value, [0, 1], [colors.border.light, colors.primary[500]]),
  }));

  const isPassword = secureTextEntry;
  const showAsSecure = isPassword && !isPasswordVisible;

  return (
    <View className="gap-1.5">
      <Text className="text-text-secondary text-xs font-medium">{label}</Text>

      {/* className must live on a plain View, not alongside an animated `style` on the
          same Animated.View — see src/theme/nativewindInterop.ts. `borderRadius` is
          mirrored onto this outer border box so it aligns with the inner rounded-xl
          background instead of showing square corners around a rounded fill. */}
      <Animated.View style={[{ borderWidth: 1.5, borderRadius: radius.xl }, borderAnimatedStyle]}>
        <View className="flex-row items-center gap-2 rounded-xl bg-background-secondary px-4">
          {LeftIcon && <LeftIcon size={18} color={colors.text.tertiary} />}
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.text.tertiary}
            secureTextEntry={showAsSecure}
            keyboardType={keyboardType}
            editable={editable}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="text-text-primary flex-1 py-3.5 text-sm"
            style={WEB_NO_OUTLINE_STYLE}
            accessibilityLabel={label}
            accessibilityHint={error}
            {...inputProps}
          />
          {isPassword && (
            <IconButton
              icon={isPasswordVisible ? EyeOff : Eye}
              variant="ghost"
              size="sm"
              onPress={() => setIsPasswordVisible((visible) => !visible)}
              accessibilityLabel={isPasswordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            />
          )}
          {!isPassword && RightIcon && (
            <IconButton
              icon={RightIcon}
              variant="ghost"
              size="sm"
              onPress={onPressRightIcon ?? (() => {})}
              accessibilityLabel={label}
            />
          )}
        </View>
      </Animated.View>

      {error && (
        <Animated.Text
          entering={FadeInDown.duration(150)}
          exiting={FadeOutUp.duration(120)}
          className="text-error text-xs"
        >
          {error}
        </Animated.Text>
      )}
    </View>
  );
});
