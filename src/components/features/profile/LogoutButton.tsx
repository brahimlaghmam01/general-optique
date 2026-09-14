import { Pressable, Text } from 'react-native';
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
      <Animated.View
        style={animatedStyle}
        className="w-full flex-row items-center justify-center gap-2 rounded-xl bg-error/10 py-3.5"
      >
        <LogOut size={16} color={colors.error} />
        <Text className="text-sm font-semibold text-error">Déconnexion du compte</Text>
      </Animated.View>
    </Pressable>
  );
}
