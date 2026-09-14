import { Text, View } from 'react-native';
import { Bell, Contrast, Globe } from 'lucide-react-native';

import { Divider } from '@/components/ui/Divider';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';

export interface PreferencesSectionProps {
  onPressAccessibility: () => void;
  onPressLanguage: () => void;
}

/** "Préférences" — notifications cadence, language, accessibility/display comfort. */
export function PreferencesSection({ onPressAccessibility, onPressLanguage }: PreferencesSectionProps) {
  return (
    <View className="gap-3">
      <SectionHeader title="Préférences" />

      <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
        <ListRow
          icon={Bell}
          title="Notifications"
          subtitle="Renouvellement ordonnance & contrôles"
          rightSlot={<Text className="text-text-secondary text-xs">Tous les 6 mois</Text>}
        />
        <Divider />
        <ListRow
          icon={Globe}
          title="Langue"
          subtitle="Langue de l'application"
          onPress={onPressLanguage}
          rightSlot={<Text className="text-text-secondary text-xs">Français</Text>}
        />
        <Divider />
        <ListRow
          icon={Contrast}
          title="Accessibilité"
          subtitle="Contraste renforcé, calibrage dioptrique"
          onPress={onPressAccessibility}
          showChevron
        />
      </View>
    </View>
  );
}
