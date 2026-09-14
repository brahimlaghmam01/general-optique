import { TextInput, View } from 'react-native';
import { Mic, Search, SlidersHorizontal } from 'lucide-react-native';

import { IconButton } from '@/components/ui/IconButton';
import { colors } from '@/theme/colors';

export interface SearchSectionProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onPressMic?: () => void;
  onPressFilters?: () => void;
  placeholder?: string;
}

/** Search bar for finding a store or service, with a mic shortcut for voice search and a filter button alongside it. */
export function SearchSection({
  value,
  onChangeText,
  onPressMic,
  onPressFilters,
  placeholder = 'Rechercher un magasin ou un service',
}: SearchSectionProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View
        className="flex-1 flex-row items-center gap-3 rounded-full border border-border-light bg-background-secondary px-4"
        style={{ height: 56 }}
      >
        <Search size={18} color={colors.text.tertiary} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          className="text-text-primary flex-1 text-sm"
          accessibilityLabel="Rechercher un magasin ou un service"
        />
        <IconButton
          icon={Mic}
          variant="ghost"
          size="sm"
          onPress={onPressMic ?? (() => {})}
          accessibilityLabel="Recherche vocale"
        />
      </View>
      <IconButton
        icon={SlidersHorizontal}
        variant="outline"
        size="lg"
        onPress={onPressFilters ?? (() => {})}
        accessibilityLabel="Filtres"
      />
    </View>
  );
}
