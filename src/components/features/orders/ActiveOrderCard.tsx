import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Glasses, Store as StoreIcon } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { PulsingDot } from '@/components/ui/PulsingDot';
import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { formatFullDate } from '@/lib/utils/date';
import { colors } from '@/theme/colors';
import type { Order } from '@/types/order';

export interface ActiveOrderCardProps {
  order: Order;
  onPressDetail: () => void;
}

/** Active order summary — the visually dominant primary section on Commandes; tap to open the full detail. */
export function ActiveOrderCard({ order, onPressDetail }: ActiveOrderCardProps) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress(0.98);

  return (
    <View className="gap-5 rounded-2xl border border-border-light bg-background-secondary p-5">
      <Pressable
        onPress={onPressDetail}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessibilityRole="button"
        accessibilityLabel="Voir le détail de la commande"
      >
        <Animated.View style={animatedStyle} className="gap-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-text-tertiary text-xs font-semibold">N° {order.reference}</Text>
            <View className="flex-row items-center gap-1.5">
              <PulsingDot color={colors.warning} size={7} />
              <Badge label={order.statusLabel} variant="warning" size="sm" />
            </View>
          </View>

          <View className="flex-row gap-4">
            <View className="h-20 w-20 items-center justify-center rounded-xl bg-background-tertiary">
              <Glasses size={32} color={colors.text.tertiary} />
              <View className="absolute -bottom-1.5 self-center rounded-full bg-primary-500 px-2 py-0.5">
                <Text className="text-[9px] font-semibold text-white">Essilor</Text>
              </View>
            </View>
            <View className="flex-1 gap-1">
              {order.category && (
                <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
                  {order.category}
                </Text>
              )}
              <Text className="text-text-primary text-lg font-semibold">{order.productName}</Text>
              <Text className="text-text-secondary text-xs">{order.productDescription}</Text>
              {order.specs && order.specs.length > 0 && (
                <View className="flex-row flex-wrap gap-2 pt-1">
                  {order.specs.map((spec) => (
                    <Chip key={spec} label={spec} />
                  ))}
                </View>
              )}
            </View>
          </View>

          {order.pickupLocation && (
            <View className="flex-row items-center gap-3 rounded-xl bg-background-tertiary p-3">
              <View className="h-9 w-9 items-center justify-center rounded-lg bg-background-secondary">
                <StoreIcon size={16} color={colors.primary[500]} />
              </View>
              <View className="flex-1 gap-0.5">
                <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
                  Disponibilité estimée
                </Text>
                <Text className="text-text-primary text-sm font-semibold">
                  {formatFullDate(order.estimatedReadyDate)}
                </Text>
                <Text className="text-text-secondary text-xs">{order.pickupLocation}</Text>
              </View>
            </View>
          )}
        </Animated.View>
      </Pressable>

      <Button label="Suivre ma commande" onPress={onPressDetail} fullWidth />
    </View>
  );
}
