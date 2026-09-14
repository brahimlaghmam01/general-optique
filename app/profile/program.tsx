import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { PrivilegeProgramCard } from '@/components/features/profile/PrivilegeProgramCard';
import { IconButton } from '@/components/ui/IconButton';

/** "Programme avantages" drill-in — the full card content, moved off the main Profile screen. */
export default function ProgramDetailScreen() {
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

        <PrivilegeProgramCard />
      </ScrollView>
    </SafeAreaView>
  );
}
