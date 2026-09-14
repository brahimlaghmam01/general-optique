import { Fragment, useCallback, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, Glasses, MapPin, ShieldCheck, type LucideIcon } from 'lucide-react-native';

import { HomeHeader } from '@/components/features/home/HomeHeader';
import { PrimaryContextCard } from '@/components/features/home/PrimaryContextCard';
import { QuickActions, type QuickAction } from '@/components/features/home/QuickActions';
import { SearchSection } from '@/components/features/home/SearchSection';
import { Divider } from '@/components/ui/Divider';
import { ListRow } from '@/components/ui/ListRow';
import { mockActiveOrder, mockHealthAlert, mockUser } from '@/constants/mockData';
import { formatAppointmentDateTime } from '@/lib/utils/date';
import { getHealthAlertHref } from '@/lib/utils/healthAlertRoute';
import {
  getHomePrimaryContext,
  getHomeSecondaryContexts,
  type HomePrimaryContext,
} from '@/lib/utils/homeContext';
import { useTabBarContentInset } from '@/hooks/useTabBarContentInset';
import { useAppointmentStore } from '@/stores/appointmentStore';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

const REFRESH_DURATION_MS = 1000;

interface SecondaryRowContent {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onPress: () => void;
}

/** Maps a non-primary Home context to its compact row presentation — pure UI mapping, no state logic. */
function getSecondaryRowContent(
  context: HomePrimaryContext,
  router: ReturnType<typeof useRouter>
): SecondaryRowContent | null {
  switch (context.type) {
    case 'appointment':
      return {
        icon: Calendar,
        title: 'Prochain rendez-vous',
        subtitle: `${formatAppointmentDateTime(context.appointment.date)} · ${context.appointment.store}`,
        onPress: () => router.push('/appointments'),
      };
    case 'order':
      return {
        icon: Glasses,
        title: 'Commande en cours',
        subtitle: `${context.order.statusLabel} · ${context.order.productName}`,
        onPress: () => router.push('/orders'),
      };
    case 'health':
      return {
        icon: ShieldCheck,
        title: 'Rappel santé',
        subtitle: context.alert.title,
        onPress: () => router.push(getHealthAlertHref(context.alert.kind)),
      };
    default:
      return null;
  }
}

export default function AccueilScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const tabBarInset = useTabBarContentInset();
  const appointment = useAppointmentStore((state) => state.appointment);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), REFRESH_DURATION_MS);
  }, []);

  const homeInput = useMemo(
    () => ({
      appointment,
      order: mockActiveOrder,
      healthAlert: mockHealthAlert,
    }),
    [appointment]
  );

  const primaryContext = useMemo(() => getHomePrimaryContext(homeInput), [homeInput]);
  const secondaryContexts = useMemo(
    () => getHomeSecondaryContexts(homeInput, primaryContext),
    [homeInput, primaryContext]
  );

  const quickActions = useMemo<QuickAction[]>(
    () => [
      { key: 'find-store', label: 'Trouver un magasin', icon: MapPin, onPress: () => {} },
      {
        key: 'book-appointment',
        label: 'Prendre RDV',
        icon: Calendar,
        onPress: () => router.push('/appointments'),
      },
      { key: 'virtual-try-on', label: 'Essayer virtuellement', icon: Glasses, onPress: () => {} },
    ],
    [router]
  );

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
        <HomeHeader
          firstName={mockUser.firstName}
          avatarFallback={`${mockUser.firstName[0]}${mockUser.lastName[0]}`}
          onPressAvatar={() => router.push('/profile')}
        />

        <SearchSection onPressFilters={() => {}} />

        <PrimaryContextCard
          context={primaryContext}
          onPressAppointment={() => router.push('/appointments')}
          onPressOrder={() => router.push('/orders')}
          onPressHealth={(alert) => router.push(getHealthAlertHref(alert.kind))}
          onPressDiscover={() => {}}
        />

        <QuickActions actions={quickActions} />

        {secondaryContexts.length > 0 && (
          <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
            {secondaryContexts.map((context, index) => {
              const row = getSecondaryRowContent(context, router);
              if (!row) return null;
              return (
                <Fragment key={context.type}>
                  {index > 0 && <Divider />}
                  <ListRow
                    icon={row.icon}
                    title={row.title}
                    subtitle={row.subtitle}
                    onPress={row.onPress}
                    showChevron
                  />
                </Fragment>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
