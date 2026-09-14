import '../global.css';
import '@/theme/nativewindInterop';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';

import { colors } from '@/theme/colors';
import { useAuthStore } from '@/stores/authStore';

void SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 60_000 },
  },
});

/**
 * Redirects between the (auth) and (tabs) groups based on auth status.
 * Waits for the root navigation state to exist before calling replace() —
 * expo-router throws if you navigate before the navigator has mounted.
 */
function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    if (!navigationState?.key) return;
    if (status === 'loading') return;

    const inAuthGroup = segments[0] === '(auth)';

    if (status === 'unauthenticated' && !inAuthGroup) {
      router.replace('/welcome');
    } else if (status === 'authenticated' && inAuthGroup) {
      router.replace('/');
    }
  }, [status, segments, navigationState?.key, router]);
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    InstrumentSerif_400Regular,
    JetBrainsMono_400Regular,
  });

  const hydrate = useAuthStore((state) => state.hydrate);
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useProtectedRoute();

  const isReady = (fontsLoaded || !!fontError) && status !== 'loading';

  useEffect(() => {
    if (isReady) {
      void SplashScreen.hideAsync();
    }
  }, [isReady]);

  // Splash stays up — never render a screen before we know where it should be.
  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
