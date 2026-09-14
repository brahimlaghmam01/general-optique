import { Text, View } from 'react-native';
import { Lock } from 'lucide-react-native';

import { colors } from '@/theme/colors';

/** HDS/RGPD hosting compliance notice, centered at the foot of the record. */
export function HdsComplianceFooter() {
  return (
    <View className="items-center gap-2 px-6 py-2">
      <Lock size={14} color={colors.text.tertiary} />
      <Text className="text-text-tertiary text-center text-[11px]">
        Hébergement certifié HDS · Conformité médicale RGPD Santé · Générale d&apos;Optique
      </Text>
    </View>
  );
}
