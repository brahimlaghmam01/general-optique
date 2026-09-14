import { useMemo } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Navigation, Store as StoreIcon } from 'lucide-react-native';

import { IconButton } from '@/components/ui/IconButton';
import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';
import type { Store } from '@/types/store';

export interface StoreAvailabilityRowProps {
  store: Store;
  selected: boolean;
  onSelect: () => void;
}

/**
 * One store that can fit/try the current product. Selecting it (radio-style,
 * same visual language as the booking flow's StoreSelector) decides which
 * store gets pre-filled into the appointment. Directions is a separate,
 * sibling action — not nested inside the selection Pressable.
 */
export function StoreAvailabilityRow({ store, selected, onSelect }: StoreAvailabilityRowProps) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress(0.98);
  const haptics = useHaptics();

  const radioClassName = useMemo(
    () =>
      selected
        ? 'h-5 w-5 items-center justify-center rounded-full border-2 border-primary-500'
        : 'h-5 w-5 items-center justify-center rounded-full border-2 border-border-medium',
    [selected]
  );

  const handleSelect = () => {
    haptics.light();
    onSelect();
  };

  const handleDirections = () => {
    const query = encodeURIComponent(`${store.fullName}, ${store.addressLine}`);
    void Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  return (
    <View className="flex-row items-center gap-2 py-3">
      <Pressable
        onPress={handleSelect}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        className="flex-1"
        accessibilityRole="radio"
        accessibilityState={{ checked: selected }}
        accessibilityLabel={store.fullName}
      >
        {/* className must live on a plain View, not alongside an animated `style` on the
            same Animated.View — see src/theme/nativewindInterop.ts. */}
        <Animated.View style={animatedStyle}>
          <View className="flex-row items-center gap-3">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-background-tertiary">
              <StoreIcon size={16} color={selected ? colors.primary[500] : colors.text.tertiary} />
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="text-text-primary text-sm font-medium">{store.fullName}</Text>
              <Text className="text-text-secondary text-xs">Disponible pour essayage</Text>
            </View>
            <View className={radioClassName}>
              {selected && <View className="h-2.5 w-2.5 rounded-full bg-primary-500" />}
            </View>
          </View>
        </Animated.View>
      </Pressable>

      <IconButton
        icon={Navigation}
        variant="ghost"
        size="sm"
        onPress={handleDirections}
        accessibilityLabel={`Itinéraire vers ${store.shortName}`}
      />
    </View>
  );
}
