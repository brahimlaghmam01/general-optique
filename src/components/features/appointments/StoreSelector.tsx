import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { MapPin, Star } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';
import type { Store } from '@/types/store';

import { StepHeader } from './StepHeader';

export interface StoreSelectorProps {
  stores: Store[];
  selectedId: string;
  onSelect: (id: string) => void;
  onPressOtherCity?: () => void;
}

/** Step 2 — store picker, radio-row style with distance and opening hours. */
export function StoreSelector({
  stores,
  selectedId,
  onSelect,
  onPressOtherCity,
}: StoreSelectorProps) {
  return (
    <View className="gap-3">
      <StepHeader
        step={2}
        title="Sélection du magasin"
        trailing={
          <Text
            className="text-sm font-semibold text-primary-500"
            onPress={onPressOtherCity}
            accessibilityRole="button"
          >
            Autre ville
          </Text>
        }
      />
      <View className="gap-3">
        {stores.map((store) => (
          <StoreRow
            key={store.id}
            store={store}
            isSelected={store.id === selectedId}
            onPress={() => onSelect(store.id)}
          />
        ))}
      </View>
    </View>
  );
}

function StoreRow({
  store,
  isSelected,
  onPress,
}: {
  store: Store;
  isSelected: boolean;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress(0.98);
  const haptics = useHaptics();
  const Icon = store.tag ? Star : MapPin;

  const containerClassName = useMemo(
    () =>
      isSelected
        ? 'flex-row items-center gap-3 rounded-xl border-2 border-primary-500 bg-primary-50 p-4'
        : 'flex-row items-center gap-3 rounded-xl border-2 border-border-light bg-background-secondary p-4',
    [isSelected]
  );

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected }}
      accessibilityLabel={store.shortName}
    >
      {/* className must live on a plain View, not alongside an animated `style` on the
          same Animated.View — see src/theme/nativewindInterop.ts. */}
      <Animated.View style={animatedStyle}>
        <View className={containerClassName}>
          <Icon
            size={18}
            color={isSelected ? colors.primary[500] : colors.text.tertiary}
            fill={isSelected && store.tag ? colors.primary[500] : 'none'}
          />
          <View className="flex-1 gap-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-text-primary text-sm font-semibold">{store.shortName}</Text>
              {store.tag && <Badge label={store.tag} variant="brand" size="sm" />}
            </View>
            <Text className="text-text-secondary text-xs">
              {store.addressLine} · {store.distanceLabel}
            </Text>
            <Text className="text-text-tertiary text-xs">{store.hoursLabel}</Text>
          </View>
          <View
            className={
              isSelected
                ? 'h-5 w-5 items-center justify-center rounded-full border-2 border-primary-500'
                : 'h-5 w-5 items-center justify-center rounded-full border-2 border-border-medium'
            }
          >
            {isSelected && <View className="h-2.5 w-2.5 rounded-full bg-primary-500" />}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
