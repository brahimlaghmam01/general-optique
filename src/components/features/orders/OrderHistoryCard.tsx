import { Fragment } from 'react';
import { Text, View } from 'react-native';
import { FileText, Glasses, RefreshCw } from 'lucide-react-native';

import { Divider } from '@/components/ui/Divider';
import { ListRow } from '@/components/ui/ListRow';
import { colors } from '@/theme/colors';
import type { PastOrder } from '@/types/orderHistory';

export interface OrderHistoryCardProps {
  pastOrders: PastOrder[];
  onPressArchives?: () => void;
  onPressAction: (order: PastOrder) => void;
}

/** Compact history of past orders — ListRow entries, not competing with the active order above. */
export function OrderHistoryCard({ pastOrders, onPressArchives, onPressAction }: OrderHistoryCardProps) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
          Historique
        </Text>
        <Text
          className="text-sm font-semibold text-primary-500"
          onPress={onPressArchives}
          accessibilityRole="button"
        >
          Archives
        </Text>
      </View>

      <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
        {pastOrders.map((order, index) => {
          const ActionIcon = order.action === 'invoice' ? FileText : RefreshCw;
          return (
            <Fragment key={order.id}>
              {index > 0 && <Divider />}
              <ListRow
                icon={Glasses}
                title={order.productName}
                subtitle={`${order.deliveredDateLabel} · ${order.statusLabel}`}
                onPress={() => onPressAction(order)}
                rightSlot={<ActionIcon size={16} color={colors.primary[500]} />}
              />
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}
