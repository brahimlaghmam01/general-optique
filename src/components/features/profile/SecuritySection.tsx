import { Text, View } from 'react-native';
import { Fingerprint, ShieldCheck } from 'lucide-react-native';

import { Divider } from '@/components/ui/Divider';
import { ListRow } from '@/components/ui/ListRow';
import { PulsingDot } from '@/components/ui/PulsingDot';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Switch } from '@/components/ui/Switch';
import { colors } from '@/theme/colors';
import type { SecuritySettings } from '@/types/security';

export interface SecuritySectionProps {
  settings: SecuritySettings;
  /** From LocalAuthentication.hasHardwareAsync() — disable the row rather than toggle a lie. */
  isBiometricHardwareAvailable: boolean;
  onToggleBiometric: (enabled: boolean) => void;
  onPressAccountSecurity: () => void;
}

/** "Sécurité & confidentialité" — biometrics inline, everything else behind one drill-in. */
export function SecuritySection({
  settings,
  isBiometricHardwareAvailable,
  onToggleBiometric,
  onPressAccountSecurity,
}: SecuritySectionProps) {
  return (
    <View className="gap-3">
      <SectionHeader
        title="Sécurité & confidentialité"
        trailing={
          <View className="flex-row items-center gap-1.5">
            <PulsingDot color={colors.success} size={7} />
            <Text className="text-text-tertiary text-xs">Niveau HDS Élevé</Text>
          </View>
        }
      />

      <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
        <ListRow
          icon={Fingerprint}
          title="Face ID / Biométrie"
          subtitle={
            isBiometricHardwareAvailable ? 'Accès instantané sécurisé' : 'Non disponible sur cet appareil'
          }
          iconTint="brand"
          rightSlot={
            <Switch
              checked={isBiometricHardwareAvailable && settings.biometricEnabled}
              onCheckedChange={onToggleBiometric}
              disabled={!isBiometricHardwareAvailable}
              accessibilityLabel="Activer Face ID / Biométrie"
            />
          }
        />
        <Divider />
        <ListRow
          icon={ShieldCheck}
          title="Sécurité du compte"
          subtitle={`2FA ${settings.twoFactorEnabled ? 'active' : 'inactive'} · ${settings.connectedDevicesLabel}`}
          onPress={onPressAccountSecurity}
          showChevron
        />
      </View>
    </View>
  );
}
