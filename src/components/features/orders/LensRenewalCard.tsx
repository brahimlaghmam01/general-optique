import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Droplet, RefreshCw, Truck } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useHaptics } from '@/hooks/useHaptics';
import { formatPrice } from '@/lib/utils/format';
import { colors } from '@/theme/colors';
import type { LensRenewal } from '@/types/lensRenewal';

export interface LensRenewalCardProps {
  lensRenewal: LensRenewal;
}

const REORDER_DURATION_MS = 1200;

/** Auto-renewal card for contact lenses, with a simulated quick-reorder flow. */
export function LensRenewalCard({ lensRenewal }: LensRenewalCardProps) {
  const [isReordering, setIsReordering] = useState(false);
  const haptics = useHaptics();

  const handleReorder = () => {
    setIsReordering(true);
    setTimeout(() => {
      setIsReordering(false);
      haptics.success();
      Alert.alert('Commande envoyée', `${lensRenewal.productName} a été recommandé.`);
    }, REORDER_DURATION_MS);
  };

  return (
    <View className="gap-4">
      <View className="gap-1">
        <Text className="text-text-primary text-lg font-semibold">Renouvellement automatique</Text>
        <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
          Contactologie
        </Text>
      </View>

      <View className="gap-4 rounded-2xl border border-border-light bg-background-secondary p-5">
        <View className="flex-row items-center gap-2">
          <Badge label={lensRenewal.type} variant="brand" size="sm" />
          <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
            Ordonnance active
          </Text>
          <View className="h-1.5 w-1.5 rounded-full bg-success" />
        </View>

        <View className="flex-row items-center gap-3">
          <View className="h-16 w-16 items-center justify-center rounded-xl bg-background-tertiary">
            <Droplet size={26} color={colors.text.tertiary} />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-text-primary text-base font-semibold">
              {lensRenewal.productName}
            </Text>
            <Text className="text-text-secondary text-xs">{lensRenewal.productDescription}</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3 rounded-xl bg-background-tertiary p-3">
          <Truck size={18} color={colors.primary[500]} />
          <View className="flex-1 gap-0.5">
            <Text className="text-text-primary text-xs font-medium">
              {lensRenewal.deliveryEstimateLabel}
            </Text>
            <Text className="text-text-secondary text-xs" style={{ fontFamily: 'JetBrainsMono_400Regular' }}>
              OD {lensRenewal.prescriptionOD} | OG {lensRenewal.prescriptionOG}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between gap-3 pt-1">
          <View className="shrink gap-0.5">
            <Text
              className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider"
              numberOfLines={1}
            >
              Prix préférentiel
            </Text>
            <Text className="text-text-primary text-lg font-semibold">
              {formatPrice(lensRenewal.price)}
            </Text>
          </View>
          <Button
            label="Commander à nouveau"
            icon={RefreshCw}
            size="sm"
            loading={isReordering}
            onPress={handleReorder}
          />
        </View>
      </View>
    </View>
  );
}
