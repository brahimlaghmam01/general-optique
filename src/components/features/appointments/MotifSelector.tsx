import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Check, Droplet, Eye, Glasses, Wrench, type LucideIcon } from 'lucide-react-native';

import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';
import { Badge } from '@/components/ui/Badge';
import { colors } from '@/theme/colors';
import type { VisitMotif } from '@/types/booking';

import { StepHeader } from './StepHeader';

export interface MotifSelectorProps {
  motifs: VisitMotif[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const MOTIF_ICONS: Record<string, LucideIcon> = {
  motif_exam: Eye,
  motif_lenses: Droplet,
  motif_frames: Glasses,
  motif_repair: Wrench,
};

/** Step 1 — visit-reason picker, radio-card style with duration badges. */
export function MotifSelector({ motifs, selectedId, onSelect }: MotifSelectorProps) {
  return (
    <View className="gap-3">
      <StepHeader
        step={1}
        title="Motif de visite"
        trailing={<Badge label="Recommandé" variant="brand" size="sm" />}
      />
      <View className="gap-3">
        {motifs.map((motif) => (
          <MotifRow
            key={motif.id}
            motif={motif}
            isSelected={motif.id === selectedId}
            onPress={() => onSelect(motif.id)}
          />
        ))}
      </View>
    </View>
  );
}

function MotifRow({
  motif,
  isSelected,
  onPress,
}: {
  motif: VisitMotif;
  isSelected: boolean;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress(0.98);
  const haptics = useHaptics();
  const Icon = MOTIF_ICONS[motif.id] ?? Eye;

  const containerClassName = useMemo(
    () =>
      isSelected
        ? 'flex-row items-start gap-3 rounded-xl border-2 border-primary-500 bg-primary-50 p-4'
        : 'flex-row items-start gap-3 rounded-xl border-2 border-border-light bg-background-secondary p-4',
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
      accessibilityLabel={motif.label}
    >
      <Animated.View style={animatedStyle} className={containerClassName}>
        <View className="h-9 w-9 items-center justify-center rounded-lg bg-background-tertiary">
          <Icon size={18} color={colors.primary[500]} />
        </View>
        <View className="flex-1 gap-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="text-text-primary flex-1 text-sm font-semibold">{motif.label}</Text>
            <Text className="text-text-tertiary text-xs">{motif.durationMinutes} min</Text>
          </View>
          <Text className="text-text-secondary text-xs">{motif.description}</Text>
        </View>
        {isSelected && (
          <View className="h-5 w-5 items-center justify-center rounded-full bg-primary-500">
            <Check size={12} color="#FFFFFF" />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}
