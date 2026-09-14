import { Alert, Text, View } from 'react-native';
import { Download, Eye, FileCheck2, Factory, PackageCheck, Wrench, type LucideIcon } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { OrderTimeline } from '@/components/ui/OrderTimeline';
import { useHaptics } from '@/hooks/useHaptics';
import type { OrderStep } from '@/types/order';

export interface AtelierTimelineProps {
  steps: OrderStep[];
  onPressTrack: () => void;
}

const STEP_ICONS: Record<string, LucideIcon> = {
  order: FileCheck2,
  manufacturing: Factory,
  fitting: Wrench,
  ready: PackageCheck,
};

function getStepIcon(step: OrderStep): LucideIcon {
  return STEP_ICONS[step.key] ?? FileCheck2;
}

/** Façonnage protocol card — heading + actions around the shared OrderTimeline primitive. */
export function AtelierTimeline({ steps, onPressTrack }: AtelierTimelineProps) {
  const haptics = useHaptics();

  const handleDownload = () => {
    haptics.success();
    Alert.alert('Bon de prise en charge', 'Le document a été téléchargé.');
  };

  return (
    <View className="gap-5 rounded-2xl border border-border-light bg-background-secondary p-5">
      <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
        Protocole de façonnage
      </Text>

      <OrderTimeline steps={steps} getStepIcon={getStepIcon} />

      <View className="gap-3">
        <Button label="Suivre le montage en atelier" icon={Eye} onPress={onPressTrack} fullWidth />
        <Button
          label="Télécharger le bon de prise en charge"
          icon={Download}
          variant="secondary"
          onPress={handleDownload}
          fullWidth
        />
      </View>
    </View>
  );
}
