import { Text, View } from 'react-native';
import { Briefcase, ChevronRight, Glasses, Mail, Phone, Users } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { IconButton } from '@/components/ui/IconButton';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { maskPhone } from '@/lib/utils/format';
import { colors } from '@/theme/colors';
import type { User } from '@/types/user';

export interface AccountSectionProps {
  user: User;
  onPressPersonalInfo: () => void;
  onPressContactInfo: () => void;
  onPressCallOptician: () => void;
  onPressHousehold: () => void;
}

/** "Compte" — personal info, contact details, referring optician, household. */
export function AccountSection({
  user,
  onPressPersonalInfo,
  onPressContactInfo,
  onPressCallOptician,
  onPressHousehold,
}: AccountSectionProps) {
  const householdNames = user.household.map((member) => member.name).join(', ');

  return (
    <View className="gap-3">
      <SectionHeader title="Compte" />

      <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
        <ListRow
          icon={Briefcase}
          title="Informations personnelles"
          subtitle={user.birthInfo}
          onPress={onPressPersonalInfo}
          showChevron
        />
        <Divider />
        <ListRow
          icon={Mail}
          title="Coordonnées"
          subtitle={`${user.email} · ${maskPhone(user.phone)}`}
          onPress={onPressContactInfo}
          showChevron
        />
        <Divider />
        <ListRow
          icon={Glasses}
          title="Opticien référent"
          subtitle={`${user.referringOptician.name} · ${user.referringOptician.storeLabel}`}
          rightSlot={
            <IconButton
              icon={Phone}
              variant="ghost"
              size="sm"
              onPress={onPressCallOptician}
              accessibilityLabel="Appeler l'opticien référent"
            />
          }
        />
        <Divider />
        <ListRow
          icon={Users}
          title="Mon foyer & rattachés"
          subtitle={householdNames}
          onPress={onPressHousehold}
          rightSlot={
            <View className="flex-row items-center gap-2">
              <Badge label={`${user.household.length} profil(s)`} variant="brand" size="sm" />
              <ChevronRight size={18} color={colors.text.tertiary} />
            </View>
          }
        />
      </View>
    </View>
  );
}
