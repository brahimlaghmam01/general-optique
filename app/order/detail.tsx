import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Store as StoreIcon } from 'lucide-react-native';

import { AtelierTimeline } from '@/components/features/orders/AtelierTimeline';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { IconButton } from '@/components/ui/IconButton';
import { mockActiveOrder } from '@/constants/mockData';
import { formatFullDate } from '@/lib/utils/date';
import { colors } from '@/theme/colors';

/** Full drill-in for the active order — same mockActiveOrder as Commandes and Home, no separate copy. */
export default function OrderDetailScreen() {
  const router = useRouter();
  const order = mockActiveOrder;

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background-primary">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-6 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <IconButton
          icon={ArrowLeft}
          variant="ghost"
          onPress={() => router.back()}
          accessibilityLabel="Retour"
        />

        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
              N° {order.reference}
            </Text>
            <Badge label={order.statusLabel} variant="warning" size="sm" />
          </View>
          <Text
            className="text-text-primary text-3xl"
            style={{ fontFamily: 'InstrumentSerif_400Regular' }}
          >
            {order.productName}
          </Text>
          <Text className="text-text-secondary text-sm">{order.productDescription}</Text>
          {order.specs && order.specs.length > 0 && (
            <View className="flex-row flex-wrap gap-2 pt-1">
              {order.specs.map((spec) => (
                <Chip key={spec} label={spec} />
              ))}
            </View>
          )}
        </View>

        {order.pickupLocation && (
          <View className="flex-row items-center gap-3 rounded-2xl border border-border-light bg-background-secondary p-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-background-tertiary">
              <StoreIcon size={18} color={colors.primary[500]} />
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

        <AtelierTimeline steps={order.steps} onPressTrack={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}
