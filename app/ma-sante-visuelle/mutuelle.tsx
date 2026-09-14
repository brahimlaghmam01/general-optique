import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { MutuelleCard } from '@/components/features/dossier/MutuelleCard';
import { TiersPayantCard } from '@/components/features/profile/TiersPayantCard';
import { IconButton } from '@/components/ui/IconButton';
import { mockMutuelle, mockTiersPayantInfo } from '@/constants/mockData';

/** Mutuelle — coverage summary and tiers-payant status. */
export default function MutuelleScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background-primary">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-6 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <IconButton
          icon={ArrowLeft}
          variant="ghost"
          onPress={() => router.back()}
          accessibilityLabel="Retour"
        />

        <Text
          className="text-text-primary text-3xl"
          style={{ fontFamily: 'InstrumentSerif_400Regular' }}
        >
          Mutuelle
        </Text>

        <MutuelleCard mutuelle={mockMutuelle} />
        <TiersPayantCard info={mockTiersPayantInfo} />
      </ScrollView>
    </SafeAreaView>
  );
}
