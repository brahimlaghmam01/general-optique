import { Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatShortDate } from '@/lib/utils/date';
import type { Order } from '@/types/order';

export interface OrderStatusCardProps {
  order: Order;
  onPress: () => void;
}

/**
 * Calm, compact order summary for Home's primary-context slot — status,
 * product, and one CTA. The full step-by-step tracker lives on Commandes;
 * this deliberately stays lighter than that view.
 */
export function OrderStatusCard({ order, onPress }: OrderStatusCardProps) {
  return (
    <View className="gap-4 rounded-2xl bg-background-secondary p-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
          Votre commande #{order.reference}
        </Text>
        <Badge label={order.statusLabel} variant="warning" size="sm" />
      </View>

      <View className="gap-1">
        <Text className="text-text-primary text-lg font-semibold">{order.productName}</Text>
        <Text className="text-text-secondary text-sm">
          Prête estimée le {formatShortDate(order.estimatedReadyDate)}
        </Text>
      </View>

      <Button label="Suivre ma commande" variant="secondary" onPress={onPress} fullWidth />
    </View>
  );
}
