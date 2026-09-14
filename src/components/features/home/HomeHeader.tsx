import { Pressable, Text, View } from 'react-native';
import { Bell, Glasses, SlidersHorizontal } from 'lucide-react-native';

import { Avatar } from '@/components/ui/Avatar';
import { IconButton } from '@/components/ui/IconButton';
import { PulsingDot } from '@/components/ui/PulsingDot';

export interface HomeHeaderProps {
  firstName: string;
  avatarFallback: string;
  avatarUrl?: string;
  hasUnreadNotifications?: boolean;
  onPressNotifications?: () => void;
  onPressFilters?: () => void;
  onPressAvatar?: () => void;
}

/** Brand app bar + personalized greeting row for the Accueil screen. */
export function HomeHeader({
  firstName,
  avatarFallback,
  avatarUrl,
  hasUnreadNotifications = true,
  onPressNotifications,
  onPressFilters,
  onPressAvatar,
}: HomeHeaderProps) {
  return (
    <View className="gap-6">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-xl bg-primary-500">
            <Glasses size={18} color="#FFFFFF" />
          </View>
          <View>
            <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
              Maison Optique
            </Text>
            <Text className="text-text-primary text-base font-semibold">Accueil</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View>
            <IconButton
              icon={Bell}
              variant="ghost"
              onPress={onPressNotifications ?? (() => {})}
              accessibilityLabel="Notifications"
            />
            {hasUnreadNotifications && (
              <View className="absolute right-1 top-1">
                <PulsingDot size={8} />
              </View>
            )}
          </View>
          <Pressable
            onPress={onPressAvatar}
            disabled={!onPressAvatar}
            accessibilityRole={onPressAvatar ? 'button' : undefined}
            accessibilityLabel="Profil"
          >
            <Avatar src={avatarUrl} fallback={avatarFallback} size="sm" />
          </Pressable>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text
          className="text-text-primary text-2xl"
          style={{ fontFamily: 'InstrumentSerif_400Regular' }}
        >
          Bonjour, {firstName} 👋
        </Text>
        <View className="flex-row items-center gap-2">
          <IconButton
            icon={Bell}
            variant="ghost"
            size="sm"
            onPress={onPressNotifications ?? (() => {})}
            accessibilityLabel="Notifications"
          />
          <IconButton
            icon={SlidersHorizontal}
            variant="ghost"
            size="sm"
            onPress={onPressFilters ?? (() => {})}
            accessibilityLabel="Filtres"
          />
        </View>
      </View>
    </View>
  );
}
