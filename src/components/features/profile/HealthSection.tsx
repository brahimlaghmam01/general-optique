import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FileCheck2, FileText, ShieldCheck } from 'lucide-react-native';

import { Divider } from '@/components/ui/Divider';
import { ListRow } from '@/components/ui/ListRow';
import { PulsingDot } from '@/components/ui/PulsingDot';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { mockMutuelle, mockPrescription } from '@/constants/mockData';
import { colors } from '@/theme/colors';

/**
 * "Ma santé visuelle" — the gateway into the Phase 2 health routes. Each row
 * links directly to its own drill-in; nothing about Dossier is duplicated
 * here, only entry points into the existing screens.
 */
export function HealthSection() {
  const router = useRouter();

  return (
    <View className="gap-3">
      <SectionHeader
        title="Ma santé visuelle"
        trailing={
          <View className="flex-row items-center gap-1.5">
            <PulsingDot color={colors.success} size={7} />
            <Text className="text-text-tertiary text-xs">Carte Vitale active</Text>
          </View>
        }
      />

      <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
        <ListRow
          icon={FileText}
          title="Dossier de vue"
          subtitle="Suivi & rappels de santé visuelle"
          onPress={() => router.push('/ma-sante-visuelle/dossier-de-vue')}
          showChevron
        />
        <Divider />
        <ListRow
          icon={FileCheck2}
          title="Ordonnances"
          subtitle={`Valide · ${mockPrescription.validUntilLabel}`}
          onPress={() => router.push('/ma-sante-visuelle/ordonnances')}
          showChevron
        />
        <Divider />
        <ListRow
          icon={ShieldCheck}
          title="Mutuelle"
          subtitle={mockMutuelle.provider}
          onPress={() => router.push('/ma-sante-visuelle/mutuelle')}
          showChevron
        />
      </View>
    </View>
  );
}
