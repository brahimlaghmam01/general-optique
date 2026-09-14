import { Alert, Text, View } from 'react-native';
import { Camera, FileCheck2, FileText, Stethoscope } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';
import type { Prescription } from '@/types/prescription';

import { PrescriptionTable } from './PrescriptionTable';

export interface PrescriptionCardProps {
  prescription: Prescription;
}

/** Certified optical prescription: doctor info, OD/OG table, and source actions. */
export function PrescriptionCard({ prescription }: PrescriptionCardProps) {
  const haptics = useHaptics();

  const handleViewOriginal = () => {
    haptics.light();
    Alert.alert('Ordonnance originale', 'Ouverture du PDF signé par le praticien.');
  };

  const handleScanNew = () => {
    haptics.light();
    Alert.alert('Scanner une ordonnance', "Ouverture de l'appareil photo.");
  };

  return (
    <View className="gap-5 rounded-2xl border border-border-light bg-background-secondary p-5">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <FileCheck2 size={14} color={colors.primary[500]} />
          <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
            Prescription certifiée
          </Text>
        </View>
        <Badge label={`Valide · ${prescription.validUntilLabel}`} variant="success" size="sm" />
      </View>

      <View className="flex-row items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-lg bg-background-tertiary">
          <Stethoscope size={16} color={colors.text.tertiary} />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="text-text-primary text-base font-semibold">
            {prescription.doctorName}
          </Text>
          <Text className="text-text-secondary text-xs">
            {prescription.doctorRole} · {prescription.doctorAddress}
          </Text>
        </View>
      </View>

      <PrescriptionTable prescription={prescription} />

      <View className="gap-3">
        <Button
          label="Voir l'ordonnance originale (PDF signé)"
          icon={FileText}
          onPress={handleViewOriginal}
          fullWidth
        />
        <Button
          label="Scanner une nouvelle ordonnance"
          icon={Camera}
          variant="secondary"
          onPress={handleScanNew}
          fullWidth
        />
      </View>
    </View>
  );
}
