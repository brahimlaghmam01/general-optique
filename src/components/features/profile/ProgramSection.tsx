import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Award } from 'lucide-react-native';

import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** "Programme & avantages" — one compact row; full content lives in its drill-in. */
export function ProgramSection() {
  const router = useRouter();

  return (
    <View className="gap-3">
      <SectionHeader title="Programme & avantages" />

      <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
        <ListRow
          icon={Award}
          title="Programme avantages"
          subtitle="Garantie Casse & Réglages Illimités"
          onPress={() => router.push('/profile/program')}
          showChevron
        />
      </View>
    </View>
  );
}
