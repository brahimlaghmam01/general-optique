import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Calendar } from 'lucide-react-native';

import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';
import type { TimeSlot } from '@/types/booking';

import { StepHeader } from './StepHeader';

export interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedId: string;
  onSelect: (id: string) => void;
  storeName: string;
  onPressFullCalendar?: () => void;
}

/** Step 3 — time-slot picker with a 3-up card grid. */
export function TimeSlotPicker({
  slots,
  selectedId,
  onSelect,
  storeName,
  onPressFullCalendar,
}: TimeSlotPickerProps) {
  return (
    <View className="gap-3">
      <StepHeader
        step={3}
        title="Créneaux disponibles"
        trailing={<Text className="text-text-tertiary text-xs">{storeName}</Text>}
      />
      <Text className="text-text-secondary text-sm">
        Sélectionnez l&apos;horaire le plus adapté ou affichez l&apos;agenda complet :
      </Text>

      <View className="flex-row gap-3">
        {slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            isSelected={slot.id === selectedId}
            onPress={() => onSelect(slot.id)}
          />
        ))}
      </View>

      <View className="flex-row items-center justify-between border-t border-border-light pt-3">
        <Pressable
          onPress={onPressFullCalendar}
          className="flex-row items-center gap-1.5"
          accessibilityRole="button"
        >
          <Calendar size={14} color={colors.primary[500]} />
          <Text className="text-sm font-medium text-primary-500">
            Consulter le calendrier complet
          </Text>
        </Pressable>
        <Text className="text-text-tertiary text-xs">Sans avance de frais</Text>
      </View>
    </View>
  );
}

function SlotCard({
  slot,
  isSelected,
  onPress,
}: {
  slot: TimeSlot;
  isSelected: boolean;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress(0.96);
  const haptics = useHaptics();

  const containerClassName = useMemo(
    () =>
      isSelected
        ? 'flex-1 items-center gap-1 rounded-xl bg-primary-500 py-3'
        : 'flex-1 items-center gap-1 rounded-xl border border-border-light bg-background-secondary py-3',
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
      className="flex-1"
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected }}
      accessibilityLabel={`${slot.dayLabel} ${slot.time} avec ${slot.practitioner}`}
    >
      <Animated.View style={animatedStyle} className={containerClassName}>
        <Text
          className={
            isSelected
              ? 'text-[10px] font-semibold uppercase tracking-wider text-white/80'
              : 'text-text-tertiary text-[10px] font-semibold uppercase tracking-wider'
          }
        >
          {slot.dayLabel}
        </Text>
        <Text
          className={isSelected ? 'text-base font-semibold text-white' : 'text-text-primary text-base font-semibold'}
        >
          {slot.time}
        </Text>
        <Text className={isSelected ? 'text-[11px] text-white/80' : 'text-text-tertiary text-[11px]'}>
          {slot.practitioner}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
