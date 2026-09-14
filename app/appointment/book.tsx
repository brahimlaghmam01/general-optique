import { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import GorhomBottomSheet from '@gorhom/bottom-sheet';

import { BookingProgress } from '@/components/features/appointments/BookingProgress';
import { MotifSelector } from '@/components/features/appointments/MotifSelector';
import { StoreSelector } from '@/components/features/appointments/StoreSelector';
import { TimeSlotPicker } from '@/components/features/appointments/TimeSlotPicker';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import {
  mockCoupeFileWaitlistCount,
  mockStores,
  mockTimeSlots,
  mockVisitMotifs,
} from '@/constants/mockData';
import { useAppointmentStore } from '@/stores/appointmentStore';
import { colors } from '@/theme/colors';
import { DURATION_SCREEN, useMotionPreset } from '@/theme/motion';

const STEP_LABELS = ['Motif', 'Magasin', 'Créneau', 'Confirmation'];

/** Best-effort match from the free-text appointment.motif back to a mock VisitMotif, for reschedule pre-fill. */
function guessMotifId(currentMotifText: string): string {
  const normalized = currentMotifText.toLowerCase();
  const match = mockVisitMotifs.find((motif) =>
    motif.label
      .toLowerCase()
      .split(/\s+/)
      .some((word) => word.length > 4 && normalized.includes(word))
  );
  return match?.id ?? mockVisitMotifs[0].id;
}

export default function BookAppointmentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string; storeId?: string; motifId?: string }>();
  const isReschedule = params.mode === 'reschedule';

  const currentAppointment = useAppointmentStore((state) => state.appointment);
  const confirmBooking = useAppointmentStore((state) => state.confirmBooking);
  const joinWaitlist = useAppointmentStore((state) => state.joinWaitlist);

  // Reschedule and a Boutique-style "I already know what I want" entry both
  // skip ahead past steps whose answer is already known — never reset choices
  // the caller already made.
  const [step, setStep] = useState(() => {
    if (isReschedule || params.storeId) return 2;
    if (params.motifId) return 1;
    return 0;
  });
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [motifId, setMotifId] = useState(() => {
    if (params.motifId) return params.motifId;
    if (isReschedule && currentAppointment) return guessMotifId(currentAppointment.motif);
    return mockVisitMotifs[0].id;
  });
  const [storeId, setStoreId] = useState(params.storeId ?? mockStores[0].id);
  const [slotId, setSlotId] = useState(mockTimeSlots[0].id);
  const [isWaitlisted, setIsWaitlisted] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const waitlistSheetRef = useRef<GorhomBottomSheet>(null);
  const { reduced } = useMotionPreset();

  const selectedStore = mockStores.find((store) => store.id === storeId) ?? mockStores[0];
  const selectedMotif = mockVisitMotifs.find((motif) => motif.id === motifId) ?? mockVisitMotifs[0];
  const selectedSlot = mockTimeSlots.find((slot) => slot.id === slotId) ?? mockTimeSlots[0];

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility?.(
      `Étape ${step + 1} sur ${STEP_LABELS.length} : ${STEP_LABELS[step]}`
    );
  }, [step]);

  const goToStep = (next: number) => {
    setDirection(next > step ? 'forward' : 'backward');
    setStep(next);
  };

  const handleNext = () => {
    if (step < STEP_LABELS.length - 1) goToStep(step + 1);
  };

  const handleBack = () => {
    if (step === 0) {
      router.back();
      return;
    }
    goToStep(step - 1);
  };

  const handleJoinWaitlist = () => {
    joinWaitlist({ storeId, motifId, peopleAhead: mockCoupeFileWaitlistCount });
    setIsWaitlisted(true);
    waitlistSheetRef.current?.close();
  };

  const handleConfirm = () => {
    if (!isWaitlisted) {
      confirmBooking({ motifId, storeId, slot: selectedSlot });
    }
    setIsBooked(true);
  };

  const entering = useMemo(() => {
    if (reduced) return FadeIn.duration(DURATION_SCREEN);
    return direction === 'forward'
      ? SlideInRight.duration(DURATION_SCREEN)
      : SlideInLeft.duration(DURATION_SCREEN);
  }, [direction, reduced]);

  const exiting = useMemo(() => {
    if (reduced) return FadeOut.duration(DURATION_SCREEN);
    return direction === 'forward'
      ? SlideOutLeft.duration(DURATION_SCREEN)
      : SlideOutRight.duration(DURATION_SCREEN);
  }, [direction, reduced]);

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background-primary">
      <View className="gap-4 px-6 pt-4">
        <IconButton icon={ArrowLeft} variant="ghost" onPress={handleBack} accessibilityLabel="Retour" />
        {!isBooked && <BookingProgress currentStep={step} labels={STEP_LABELS} />}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-6 pb-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {isBooked ? (
          <Animated.View
            entering={reduced ? FadeIn.duration(DURATION_SCREEN) : FadeIn.springify()}
            className="items-center gap-4 py-10"
          >
            <View className="h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 size={32} color={colors.success} />
            </View>
            <Text
              className="text-text-primary text-center text-2xl"
              style={{ fontFamily: 'InstrumentSerif_400Regular' }}
            >
              {isWaitlisted
                ? "Vous êtes sur la liste d'attente"
                : isReschedule
                  ? 'Rendez-vous modifié'
                  : 'Rendez-vous confirmé'}
            </Text>
            <Text className="text-text-secondary text-center text-sm">
              {isWaitlisted
                ? `Nous vous préviendrons dès qu'un créneau se libère à ${selectedStore.shortName}.`
                : `${selectedMotif.label} · ${selectedStore.shortName} · ${selectedSlot.dayLabel} à ${selectedSlot.time}`}
            </Text>
            <Button label="Retour à mes rendez-vous" fullWidth onPress={() => router.back()} />
          </Animated.View>
        ) : (
          <Animated.View key={step} entering={entering} exiting={exiting}>
            {step === 0 && (
              <MotifSelector motifs={mockVisitMotifs} selectedId={motifId} onSelect={setMotifId} />
            )}

            {step === 1 && (
              <StoreSelector
                stores={mockStores}
                selectedId={storeId}
                onSelect={setStoreId}
                onPressOtherCity={() => {}}
              />
            )}

            {step === 2 && (
              <View className="gap-4">
                <TimeSlotPicker
                  slots={mockTimeSlots}
                  selectedId={slotId}
                  onSelect={(id) => {
                    setSlotId(id);
                    setIsWaitlisted(false);
                  }}
                  storeName={selectedStore.shortName}
                  onPressFullCalendar={() => {}}
                />

                {isWaitlisted ? (
                  <View className="rounded-xl bg-primary-50 px-4 py-3">
                    <Text className="text-primary-500 text-sm font-medium">
                      En liste d&apos;attente · {mockCoupeFileWaitlistCount} personnes devant vous
                    </Text>
                  </View>
                ) : (
                  <Text
                    className="text-text-secondary text-center text-xs"
                    onPress={() => waitlistSheetRef.current?.expand()}
                    accessibilityRole="button"
                  >
                    Aucun créneau ne vous convient ?{' '}
                    <Text className="font-semibold text-primary-500">
                      Rejoindre la liste d&apos;attente
                    </Text>
                  </Text>
                )}
              </View>
            )}

            {step === 3 && (
              <View className="gap-4">
                <Text className="text-text-primary text-xl font-semibold">
                  Confirmer votre rendez-vous
                </Text>
                <View className="gap-3 rounded-2xl border border-border-light bg-background-secondary p-4">
                  <SummaryRow label="Motif" value={selectedMotif.label} />
                  <SummaryRow label="Magasin" value={selectedStore.shortName} />
                  <SummaryRow
                    label={isWaitlisted ? "Liste d'attente" : 'Créneau'}
                    value={
                      isWaitlisted
                        ? `${mockCoupeFileWaitlistCount} personnes devant vous`
                        : `${selectedSlot.dayLabel} à ${selectedSlot.time}`
                    }
                  />
                </View>
              </View>
            )}
          </Animated.View>
        )}
      </ScrollView>

      {!isBooked && (
        <View className="gap-2 border-t border-border-light px-6 pb-6 pt-4">
          <Button
            label={step === STEP_LABELS.length - 1 ? 'Confirmer' : 'Continuer'}
            size="lg"
            fullWidth
            onPress={step === STEP_LABELS.length - 1 ? handleConfirm : handleNext}
          />
        </View>
      )}

      <BottomSheet ref={waitlistSheetRef} snapPoints={['50%']}>
        <View className="gap-5">
          <Text
            className="text-text-primary text-2xl"
            style={{ fontFamily: 'InstrumentSerif_400Regular' }}
          >
            Rejoindre la liste d&apos;attente
          </Text>
          <Text className="text-text-secondary text-sm">
            Recevez une notification instantanée si un créneau se libère plus tôt à{' '}
            {selectedStore.shortName}.
          </Text>
          <View className="gap-2 rounded-xl bg-background-tertiary p-4">
            <SummaryRow label="Magasin" value={selectedStore.shortName} />
            <SummaryRow label="Motif" value={selectedMotif.label} />
            <SummaryRow label="Personnes en attente" value={String(mockCoupeFileWaitlistCount)} />
          </View>
          <Button label="Rejoindre la liste d'attente" fullWidth onPress={handleJoinWaitlist} />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between gap-2">
      <Text className="text-text-tertiary text-xs">{label}</Text>
      <Text className="text-text-primary text-sm font-medium">{value}</Text>
    </View>
  );
}
