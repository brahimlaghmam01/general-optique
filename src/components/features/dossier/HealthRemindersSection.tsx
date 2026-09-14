import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { CalendarClock, ChevronRight, Droplet, ShoppingCart } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';
import type { LensStockAlert, VisionCheckupReminder } from '@/types/healthReminder';

export interface HealthRemindersSectionProps {
  checkupReminder: VisionCheckupReminder;
  lensStockAlert: LensStockAlert;
  onPressCheckup: () => void;
}

const REORDER_DURATION_MS = 1200;
const MONO_FONT = { fontFamily: 'JetBrainsMono_400Regular' };

/** "Suivi de santé visuelle" — upcoming checkup nudge + low lens-stock reorder card. */
export function HealthRemindersSection({
  checkupReminder,
  lensStockAlert,
  onPressCheckup,
}: HealthRemindersSectionProps) {
  const [isReordering, setIsReordering] = useState(false);
  const haptics = useHaptics();

  const handleReorder = () => {
    setIsReordering(true);
    setTimeout(() => {
      setIsReordering(false);
      haptics.success();
      Alert.alert('Commande envoyée', `${lensStockAlert.productName} a été recommandé.`);
    }, REORDER_DURATION_MS);
  };

  return (
    <View className="gap-3">
      <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
        Suivi de santé visuelle & rappels
      </Text>

      <Pressable
        onPress={onPressCheckup}
        className="flex-row items-center gap-3 rounded-2xl border border-border-light bg-background-secondary p-4"
        accessibilityRole="button"
      >
        <View className="h-10 w-10 items-center justify-center rounded-lg bg-background-tertiary">
          <CalendarClock size={18} color={colors.primary[500]} />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="text-text-primary text-sm font-semibold">{checkupReminder.title}</Text>
          <Text className="text-text-secondary text-xs">{checkupReminder.description}</Text>
        </View>
        <ChevronRight size={18} color={colors.text.tertiary} />
      </Pressable>

      <View className="gap-3 rounded-2xl border border-border-light bg-background-secondary p-4">
        <Badge
          label={`Stock faible · ${lensStockAlert.weeksRemaining} semaines`}
          variant="warning"
          size="sm"
        />

        <View className="flex-row items-center gap-3">
          <View className="h-14 w-14 items-center justify-center rounded-xl bg-background-tertiary">
            <Droplet size={22} color={colors.text.tertiary} />
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="text-text-primary text-sm font-semibold">
              {lensStockAlert.productName}
            </Text>
            <Text className="text-text-secondary text-xs" style={MONO_FONT}>
              OD: {lensStockAlert.prescriptionOD} | OG: {lensStockAlert.prescriptionOG}
            </Text>
          </View>
        </View>

        <Button
          label="Commander un renouvellement"
          icon={ShoppingCart}
          loading={isReordering}
          onPress={handleReorder}
          fullWidth
        />
      </View>
    </View>
  );
}
