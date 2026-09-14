import { ScrollView } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { Chip } from '@/components/ui/Chip';
import { colors } from '@/theme/colors';

export interface QuickAction {
  key: string;
  label: string;
  icon: LucideIcon;
  onPress: () => void;
}

export interface QuickActionsProps {
  actions: QuickAction[];
}

/** Horizontally scrollable row of shortcut actions (store finder, booking, try-on). */
export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3 pr-1"
    >
      {actions.map((action) => (
        <Chip
          key={action.key}
          label={action.label}
          icon={<action.icon size={14} color={colors.text.primary} />}
          onPress={action.onPress}
        />
      ))}
    </ScrollView>
  );
}
