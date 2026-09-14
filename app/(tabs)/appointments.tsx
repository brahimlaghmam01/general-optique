import { useRef } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { CalendarDays } from 'lucide-react-native';
import GorhomBottomSheet from '@gorhom/bottom-sheet';

import { AppointmentsHeader } from '@/components/features/appointments/AppointmentsHeader';
import { CancelAppointmentSheet } from '@/components/features/appointments/CancelAppointmentSheet';
import { UpcomingAppointmentCard } from '@/components/features/appointments/UpcomingAppointmentCard';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { mockStores } from '@/constants/mockData';
import { useAppointmentStore } from '@/stores/appointmentStore';

export default function RendezVousScreen() {
  const router = useRouter();
  const appointment = useAppointmentStore((state) => state.appointment);
  const storeId = useAppointmentStore((state) => state.storeId);
  const cancelAppointment = useAppointmentStore((state) => state.cancelAppointment);
  const cancelSheetRef = useRef<GorhomBottomSheet>(null);

  const store = mockStores.find((item) => item.id === storeId) ?? mockStores[0];

  const handleConfirmCancel = () => {
    cancelAppointment();
    cancelSheetRef.current?.close();
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background-primary">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6 pb-36 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <AppointmentsHeader />

        {appointment ? (
          <>
            <Animated.View entering={FadeInDown.delay(50).springify()}>
              <UpcomingAppointmentCard
                appointment={appointment}
                store={store}
                onPressDetail={() => router.push('/appointment/detail')}
                onPressAddToCalendar={() =>
                  Alert.alert('Ajouté au calendrier', 'Ce rendez-vous a été ajouté à votre calendrier.')
                }
                onPressModify={() =>
                  router.push({
                    pathname: '/appointment/book',
                    params: { mode: 'reschedule', storeId },
                  })
                }
                onPressCancel={() => cancelSheetRef.current?.expand()}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(100).springify()}>
              <Button
                label="Prendre un rendez-vous"
                size="lg"
                fullWidth
                onPress={() => router.push('/appointment/book')}
              />
            </Animated.View>
          </>
        ) : (
          <EmptyState
            icon={CalendarDays}
            title="Aucun rendez-vous à venir"
            description="Réservez votre prochain contrôle de vue ou une visite en atelier en quelques étapes."
            actionLabel="Prendre un rendez-vous"
            onPressAction={() => router.push('/appointment/book')}
          />
        )}
      </ScrollView>

      <BottomSheet ref={cancelSheetRef} snapPoints={['45%']}>
        {appointment && (
          <CancelAppointmentSheet
            appointment={appointment}
            onKeep={() => cancelSheetRef.current?.close()}
            onConfirmCancel={handleConfirmCancel}
          />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}
