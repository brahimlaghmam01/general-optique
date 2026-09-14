import { useCallback, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { HdsComplianceFooter } from '@/components/features/dossier/HdsComplianceFooter';
import { HealthRemindersSection } from '@/components/features/dossier/HealthRemindersSection';
import { VisionStabilityChart } from '@/components/features/profile/VisionStabilityChart';
import { IconButton } from '@/components/ui/IconButton';
import { mockLensStockAlert, mockVisionCheckupReminder, mockVisionHistory } from '@/constants/mockData';
import { colors } from '@/theme/colors';

const REFRESH_DURATION_MS = 1000;

/** Dossier de vue — vision-health overview: reminders, lens stock, and refraction stability. */
export default function DossierDeVueScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), REFRESH_DURATION_MS);
  }, []);

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background-primary">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-6 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary[500]}
          />
        }
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
          Dossier de vue
        </Text>

        <HealthRemindersSection
          checkupReminder={mockVisionCheckupReminder}
          lensStockAlert={mockLensStockAlert}
          onPressCheckup={() =>
            Alert.alert(
              'Bilan visuel',
              'Prise de rendez-vous pour votre prochain bilan recommandé.'
            )
          }
        />

        <VisionStabilityChart history={mockVisionHistory} />

        <HdsComplianceFooter />
      </ScrollView>
    </SafeAreaView>
  );
}
