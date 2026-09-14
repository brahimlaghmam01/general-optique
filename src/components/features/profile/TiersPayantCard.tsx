import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Download, RefreshCw, ShieldCheck } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';
import type { TiersPayantInfo } from '@/types/tiersPayant';

export interface TiersPayantCardProps {
  info: TiersPayantInfo;
}

const REFRESH_DURATION_MS = 1000;

/** Third-party-payer telestransmission status, with PDF and refresh actions. */
export function TiersPayantCard({ info }: TiersPayantCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const haptics = useHaptics();

  const handleDownload = () => {
    haptics.light();
    Alert.alert('Attestation PDF', "L'attestation de tiers-payant a été téléchargée.");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      haptics.success();
      Alert.alert('Statut actualisé', 'Votre tiers-payant est à jour.');
    }, REFRESH_DURATION_MS);
  };

  return (
    <View className="gap-4 rounded-2xl border border-border-light bg-background-secondary p-5">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 flex-row items-center gap-2">
          <ShieldCheck size={16} color={colors.primary[500]} />
          <Text className="text-text-primary flex-1 text-sm font-semibold">{info.title}</Text>
        </View>
        <View className="items-end">
          <Text className="text-text-tertiary text-[10px] uppercase tracking-wider">Valide au</Text>
          <Text className="text-text-primary text-xs font-semibold">{info.validUntilLabel}</Text>
        </View>
      </View>

      <Text className="text-text-secondary text-sm">{info.description}</Text>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <Button
            label="Attestation PDF"
            icon={Download}
            variant="secondary"
            onPress={handleDownload}
            fullWidth
          />
        </View>
        <View className="flex-1">
          <Button
            label="Actualiser"
            icon={RefreshCw}
            variant="secondary"
            loading={isRefreshing}
            onPress={handleRefresh}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}
