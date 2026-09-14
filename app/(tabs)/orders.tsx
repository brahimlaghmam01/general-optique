import { useCallback, useState } from 'react';
import { Alert, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { PackageSearch } from 'lucide-react-native';

import { ActiveOrderCard } from '@/components/features/orders/ActiveOrderCard';
import { AtelierTimeline } from '@/components/features/orders/AtelierTimeline';
import { LensRenewalCard } from '@/components/features/orders/LensRenewalCard';
import { OrderHistoryCard } from '@/components/features/orders/OrderHistoryCard';
import { OrdersHeader } from '@/components/features/orders/OrdersHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { mockActiveOrder, mockLensRenewal, mockPastOrders } from '@/constants/mockData';
import { useTabBarContentInset } from '@/hooks/useTabBarContentInset';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import type { Order } from '@/types/order';
import type { PastOrder } from '@/types/orderHistory';

const REFRESH_DURATION_MS = 1000;

/** Single source of truth for the active order — same constant Home reads, no separate copy. */
const activeOrder: Order | null = mockActiveOrder;

export default function CommandesScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const tabBarInset = useTabBarContentInset();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), REFRESH_DURATION_MS);
  }, []);

  const handlePastOrderAction = (order: PastOrder) => {
    Alert.alert(
      order.action === 'invoice' ? 'Facture téléchargée' : 'Renouvellement',
      order.action === 'invoice'
        ? `La facture de ${order.productName} a été téléchargée.`
        : `Renouvellement de la monture ${order.productName} en cours.`
    );
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          gap: spacing['3xl'],
          paddingHorizontal: spacing['2xl'],
          paddingTop: spacing['2xl'],
          paddingBottom: tabBarInset,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary[500]}
          />
        }
      >
        <OrdersHeader />

        {activeOrder ? (
          <>
            <Animated.View entering={FadeInDown.delay(50).springify()}>
              <ActiveOrderCard order={activeOrder} onPressDetail={() => router.push('/order/detail')} />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(100).springify()}>
              <AtelierTimeline
                steps={activeOrder.steps}
                onPressTrack={() => router.push('/order/detail')}
              />
            </Animated.View>
          </>
        ) : (
          <EmptyState
            icon={PackageSearch}
            title="Aucune commande en cours"
            description="Vos prochaines commandes et suivis d'atelier apparaîtront ici."
          />
        )}

        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <LensRenewalCard lensRenewal={mockLensRenewal} />
        </Animated.View>

        {mockPastOrders.length > 0 && (
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <OrderHistoryCard
              pastOrders={mockPastOrders}
              onPressArchives={() => {}}
              onPressAction={handlePastOrderAction}
            />
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
