import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { IconButton } from '@/components/ui/IconButton';
import { OtpInput } from '@/components/ui/OtpInput';
import { mockUser } from '@/constants/mockData';
import { useHaptics } from '@/hooks/useHaptics';
import { maskPhone } from '@/lib/utils/format';
import { useAuthStore } from '@/stores/authStore';

const RESEND_SECONDS = 42;
const MAX_ATTEMPTS = 3;

function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

export default function OtpScreen() {
  const router = useRouter();
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const haptics = useHaptics();

  const [attemptKey, setAttemptKey] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS - 1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleComplete = async (code: string) => {
    if (isVerifying) return;
    setIsVerifying(true);
    setHasError(false);
    try {
      await verifyOtp(code);
      haptics.success();
    } catch {
      haptics.error();
      setHasError(true);
      setAttemptsLeft((remaining) => Math.max(remaining - 1, 0));
      setAttemptKey((key) => key + 1);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    haptics.light();
    setSecondsLeft(RESEND_SECONDS);
    Alert.alert('Code envoyé', 'Un nouveau code vous a été envoyé par SMS.');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background-primary">
      <View className="flex-1 gap-8 px-6 pt-4">
        <IconButton
          icon={ArrowLeft}
          variant="ghost"
          onPress={() => router.back()}
          accessibilityLabel="Retour"
        />

        <View className="gap-2">
          <Text
            className="text-text-primary text-3xl"
            style={{ fontFamily: 'InstrumentSerif_400Regular' }}
          >
            Vérification
          </Text>
          <Text className="text-text-secondary text-sm">
            Code envoyé au {maskPhone(mockUser.phone)}
          </Text>
        </View>

        <View className="gap-3">
          <OtpInput key={attemptKey} onComplete={handleComplete} hasError={hasError} />

          {hasError && (
            <Text className="text-error text-sm">
              Code incorrect. Il vous reste {attemptsLeft} tentative{attemptsLeft > 1 ? 's' : ''}.
            </Text>
          )}

          {isVerifying && <Text className="text-text-tertiary text-xs">Vérification...</Text>}
        </View>

        <View className="items-center">
          {secondsLeft > 0 ? (
            <Text className="text-text-tertiary text-sm">
              Renvoyer le code dans {formatCountdown(secondsLeft)}
            </Text>
          ) : (
            <Text
              className="text-sm font-semibold text-primary-500"
              onPress={handleResend}
              accessibilityRole="button"
            >
              Renvoyer le code
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
