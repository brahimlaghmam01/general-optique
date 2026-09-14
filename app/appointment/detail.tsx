import { useRef } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, MessageCircle, RefreshCw, Store as StoreIcon, XCircle } from 'lucide-react-native';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import GorhomBottomSheet from '@gorhom/bottom-sheet';

import { CancelAppointmentSheet } from '@/components/features/appointments/CancelAppointmentSheet';
import { Badge } from '@/components/ui/Badge';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { IconButton } from '@/components/ui/IconButton';
import { ListRow } from '@/components/ui/ListRow';
import { mockStores } from '@/constants/mockData';
import { getAppointmentStatusMeta } from '@/lib/utils/appointmentStatus';
import { useAppointmentStore } from '@/stores/appointmentStore';

/** Full progressive-disclosure detail for the upcoming appointment — reached from its card on Rendez-vous. */
export default function AppointmentDetailScreen() {
  const router = useRouter();
  const appointment = useAppointmentStore((state) => state.appointment);
  const storeId = useAppointmentStore((state) => state.storeId);
  const cancelAppointment = useAppointmentStore((state) => state.cancelAppointment);
  const cancelSheetRef = useRef<GorhomBottomSheet>(null);

  const store = mockStores.find((item) => item.id === storeId) ?? mockStores[0];

  if (!appointment) {
    router.back();
    return null;
  }

  const date = parseISO(appointment.date);
  const statusMeta = getAppointmentStatusMeta(appointment.status);

  const handleConfirmCancel = () => {
    cancelAppointment();
    cancelSheetRef.current?.close();
    router.back();
  };

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
              Détail du rendez-vous
            </Text>
            <Badge label={statusMeta.label} variant={statusMeta.variant} size="sm" />
          </View>
          <Text
            className="text-text-primary text-3xl"
            style={{ fontFamily: 'InstrumentSerif_400Regular' }}
          >
            {format(date, 'EEEE d MMMM', { locale: fr })}
          </Text>
          <Text className="text-text-secondary text-sm">
            {format(date, "HH'h'mm", { locale: fr })} · {appointment.practitioner} · {appointment.motif}
          </Text>
        </View>

        <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
          <ListRow
            icon={StoreIcon}
            title={store.fullName}
            subtitle={`${store.addressLine} · À ${store.distanceLabel}`}
          />
          <Divider />
          <ListRow
            icon={MessageCircle}
            title="Contacter le magasin"
            onPress={() =>
              Alert.alert('Message à la boutique', `Échangez en direct avec ${appointment.practitioner}.`)
            }
            showChevron
          />
        </View>

        <View className="gap-3">
          <Button
            label="Ajouter au calendrier"
            icon={Calendar}
            variant="secondary"
            fullWidth
            onPress={() =>
              Alert.alert('Ajouté au calendrier', 'Ce rendez-vous a été ajouté à votre calendrier.')
            }
          />
          <Button
            label="Modifier ce rendez-vous"
            icon={RefreshCw}
            variant="secondary"
            fullWidth
            onPress={() =>
              router.push({ pathname: '/appointment/book', params: { mode: 'reschedule', storeId } })
            }
          />
          <Button
            label="Annuler ce rendez-vous"
            icon={XCircle}
            variant="danger"
            fullWidth
            onPress={() => cancelSheetRef.current?.expand()}
          />
        </View>
      </ScrollView>

      <BottomSheet ref={cancelSheetRef} snapPoints={['45%']}>
        <CancelAppointmentSheet
          appointment={appointment}
          onKeep={() => cancelSheetRef.current?.close()}
          onConfirmCancel={handleConfirmCancel}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}
