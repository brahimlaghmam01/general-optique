import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShieldCheck, Smartphone } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { IconButton } from '@/components/ui/IconButton';
import { ListRow } from '@/components/ui/ListRow';
import { mockSecuritySettings } from '@/constants/mockData';

/** "Sécurité du compte" drill-in — 2FA status and connected devices, moved off the main Profile screen. */
export default function AccountSecurityScreen() {
  const router = useRouter();
  const settings = mockSecuritySettings;

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
          Sécurité du compte
        </Text>

        <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
          <ListRow
            icon={ShieldCheck}
            title="Double authentification (2FA)"
            subtitle="Codes de session par SMS sécurisé"
            rightSlot={
              <Badge label={settings.twoFactorEnabled ? 'Actif' : 'Inactif'} variant="success" size="sm" />
            }
          />
          <Divider />
          <ListRow
            icon={Smartphone}
            title="Appareils connectés"
            subtitle={settings.connectedDevicesLabel}
            onPress={() => Alert.alert('Appareils connectés')}
            rightSlot={
              <Text className="text-sm font-semibold text-primary-500">
                Gérer ({settings.connectedDevicesCount})
              </Text>
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
