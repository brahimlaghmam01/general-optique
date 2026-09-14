import { Text, View } from 'react-native';

export interface ProfileLegalFooterProps {
  onPressLink: (link: 'mentions' | 'privacy' | 'social-security') => void;
}

/** RGPD/HDS legal notice + the three standard legal links, centered. */
export function ProfileLegalFooter({ onPressLink }: ProfileLegalFooterProps) {
  return (
    <View className="items-center gap-3 px-6 py-2">
      <Text className="text-text-tertiary text-center text-[11px]">
        Données de santé hébergées selon la norme souveraine HDS (Hébergeur de Données de Santé)
        & certifiées RGPD UE 2016/679.
      </Text>
      <View className="flex-row items-center gap-2">
        <Text
          className="text-text-tertiary text-[11px] font-medium"
          onPress={() => onPressLink('mentions')}
          accessibilityRole="button"
        >
          Mentions légales
        </Text>
        <Text className="text-text-tertiary text-[11px]">·</Text>
        <Text
          className="text-text-tertiary text-[11px] font-medium"
          onPress={() => onPressLink('privacy')}
          accessibilityRole="button"
        >
          Confidentialité
        </Text>
        <Text className="text-text-tertiary text-[11px]">·</Text>
        <Text
          className="text-text-tertiary text-[11px] font-medium"
          onPress={() => onPressLink('social-security')}
          accessibilityRole="button"
        >
          Agrément Sécurité Sociale
        </Text>
      </View>
    </View>
  );
}
