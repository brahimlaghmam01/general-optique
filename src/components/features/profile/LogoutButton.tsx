import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { LogOut } from 'lucide-react-native';

import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';

export interface LogoutButtonProps {
  onPress: () => void;
}

/** Tinted (not solid) destructive action — softer than the design system's `danger` Button. Opens a confirmation sheet. */
export function LogoutButton({ onPress }: LogoutButtonProps) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress(0.98);
  const haptics = useHaptics();

  const handlePress = () => {
    haptics.warning();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel="Déconnexion du compte"
    >
      {/* className must live on a plain View, not alongside an animated `style` on the
          same Animated.View — see src/theme/nativewindInterop.ts. `width:100%` is
          replicated inline since `w-full` can no longer sit in that className. */}
      <Animated.View style={[{ width: '100%' }, animatedStyle]}>
        <View className="w-full flex-row items-center justify-center gap-2 rounded-xl bg-error/10 py-3.5">
          <LogOut size={16} color={colors.error} />
          <Text className="text-sm font-semibold text-error">Déconnexion du compte</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}
