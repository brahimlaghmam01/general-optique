import { Text, View } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';

import { PulsingDot } from '@/components/ui/PulsingDot';
import { formatPrice } from '@/lib/utils/format';
import { colors } from '@/theme/colors';
import type { MutuelleInfo } from '@/types/mutuelle';

export interface MutuelleCardProps {
  mutuelle: MutuelleInfo;
}

const MONO_FONT = { fontFamily: 'JetBrainsMono_400Regular' };

/** Direct third-party-payer coverage summary — contract, teletransmission, and remaining cost. */
export function MutuelleCard({ mutuelle }: MutuelleCardProps) {
  return (
    <View className="gap-4 rounded-2xl border border-border-light bg-background-secondary p-5">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <ShieldCheck size={14} color={colors.primary[500]} />
          <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
            Prise en charge directe
          </Text>
        </View>
        <PulsingDot color={colors.success} size={8} />
      </View>

      <Text className="text-text-primary text-lg font-semibold">{mutuelle.provider}</Text>

      <View className="flex-row gap-4">
        <View className="flex-1 gap-1">
          <Text className="text-text-tertiary text-xs">{mutuelle.contractLabel}</Text>
          <Text className="text-text-primary text-sm font-semibold">{mutuelle.formulaLabel}</Text>
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-text-tertiary text-xs">Télétransmission No</Text>
          <Text className="text-text-primary text-sm font-semibold" style={MONO_FONT}>
            {mutuelle.teletransmissionNumber}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between rounded-xl bg-primary-50 px-4 py-3">
        <Text className="text-text-secondary text-sm">Reste à charge estimé</Text>
        <Text className="text-2xl font-bold text-primary-500">
          {formatPrice(mutuelle.remainingCost)}
        </Text>
      </View>
    </View>
  );
}
