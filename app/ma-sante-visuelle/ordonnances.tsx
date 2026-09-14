import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { PrescriptionCard } from '@/components/features/dossier/PrescriptionCard';
import { IconButton } from '@/components/ui/IconButton';
import { mockPrescription } from '@/constants/mockData';

/** Ordonnances — the member's current optical prescription. */
export default function OrdonnancesScreen() {
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
          Ordonnances
        </Text>

        <PrescriptionCard prescription={mockPrescription} />
      </ScrollView>
    </SafeAreaView>
  );
}
