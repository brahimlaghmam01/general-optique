import { Text, View } from 'react-native';
import { BadgeCheck, Pencil } from 'lucide-react-native';

import { Avatar } from '@/components/ui/Avatar';
import { IconButton } from '@/components/ui/IconButton';
import { colors } from '@/theme/colors';
import type { User } from '@/types/user';

export interface ProfileIdentityCardProps {
  user: User;
  onPressEdit: () => void;
}

/**
 * Identity — avatar, name, concise membership info. Deliberately minimal:
 * contact details live in Compte → Coordonnées, coverage status lives in
 * Ma santé visuelle, so this stays the calmest, most legible block on screen.
 */
export function ProfileIdentityCard({ user, onPressEdit }: ProfileIdentityCardProps) {
  return (
    <View className="flex-row items-center gap-4">
      <View>
        <Avatar fallback={`${user.firstName} ${user.lastName}`} size="xl" />
        <View className="absolute -bottom-1 -right-1 h-6 w-6 items-center justify-center rounded-full bg-background-primary">
          <BadgeCheck size={20} color={colors.success} />
        </View>
      </View>

      <View className="flex-1 gap-1">
        <Text className="text-text-primary text-xl font-semibold">
          {user.firstName} {user.lastName}
        </Text>
        <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
          Membre privilégié · Depuis {user.memberSince}
        </Text>
        <Text className="text-text-secondary text-xs" style={{ fontFamily: 'JetBrainsMono_400Regular' }}>
          ID: {user.memberId}
        </Text>
      </View>

      <IconButton icon={Pencil} variant="ghost" onPress={onPressEdit} accessibilityLabel="Modifier le profil" />
    </View>
  );
}
