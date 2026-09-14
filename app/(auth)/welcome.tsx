import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Glasses, Lock } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { colors } from '@/theme/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.primary[900], colors.primary[500]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 px-6" edges={['top', 'bottom']}>
        <View className="items-center pt-6">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Glasses size={22} color="#FFFFFF" />
          </View>
        </View>

        <View className="flex-1 justify-end gap-8 pb-4">
          <View className="gap-3">
            <Text
              className="text-4xl text-white"
              style={{ fontFamily: 'InstrumentSerif_400Regular' }}
            >
              Votre santé visuelle, toujours avec vous.
            </Text>
            <Text className="text-base text-white/80">
              Ordonnances, rendez-vous et suivi de commandes en un seul endroit.
            </Text>
          </View>

          <View className="gap-3">
            <Button
              label="Se connecter"
              variant="inverse"
              fullWidth
              onPress={() => router.push('/login')}
            />
            <Button
              label="Créer un compte"
              variant="outlineInverse"
              fullWidth
              onPress={() => router.push('/register')}
            />
          </View>

          <View className="flex-row items-center justify-center gap-1.5">
            <Lock size={12} color="rgba(255,255,255,0.7)" />
            <Text className="text-xs text-white/70">
              Données de santé hébergées en France (HDS)
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
