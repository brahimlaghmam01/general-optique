import { useEffect, useRef, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import GorhomBottomSheet from '@gorhom/bottom-sheet';

import { AccountSection } from '@/components/features/profile/AccountSection';
import { HealthSection } from '@/components/features/profile/HealthSection';
import { LogoutButton } from '@/components/features/profile/LogoutButton';
import { PreferencesSection } from '@/components/features/profile/PreferencesSection';
import { ProfileIdentityCard } from '@/components/features/profile/ProfileIdentityCard';
import { ProfileLegalFooter } from '@/components/features/profile/ProfileLegalFooter';
import { ProgramSection } from '@/components/features/profile/ProgramSection';
import { SecuritySection } from '@/components/features/profile/SecuritySection';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { mockSecuritySettings, mockUser } from '@/constants/mockData';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/theme/colors';

const REFRESH_DURATION_MS = 1000;

export default function ProfileScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [isBiometricHardwareAvailable, setIsBiometricHardwareAvailable] = useState(false);
  const logoutSheetRef = useRef<GorhomBottomSheet>(null);

  const user = useAuthStore((state) => state.user) ?? mockUser;
  const isBiometricEnabled = useAuthStore((state) => state.isBiometricEnabled);
  const setBiometricEnabled = useAuthStore((state) => state.setBiometricEnabled);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then(setIsBiometricHardwareAvailable);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), REFRESH_DURATION_MS);
  };

  const handleToggleBiometric = (enabled: boolean) => {
    void setBiometricEnabled(enabled);
  };

  const handleConfirmLogout = async () => {
    logoutSheetRef.current?.close();
    await logout();
    router.replace('/welcome');
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background-primary">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6 pb-36 pt-6"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary[500]}
          />
        }
      >
        <Animated.View entering={FadeInDown.delay(50).springify()}>
          <ProfileIdentityCard
            user={user}
            onPressEdit={() => Alert.alert('Modifier le profil', 'Ouverture du formulaire.')}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <AccountSection
            user={user}
            onPressPersonalInfo={() => Alert.alert('Informations personnelles')}
            onPressContactInfo={() => Alert.alert('Coordonnées', 'Modifier mes coordonnées.')}
            onPressCallOptician={() =>
              Alert.alert('Appel', `Appel de ${user.referringOptician.name}...`)
            }
            onPressHousehold={() => Alert.alert('Mon foyer & rattachés')}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <HealthSection />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <PreferencesSection
            onPressAccessibility={() => Alert.alert('Confort visuel & typographie')}
            onPressLanguage={() => Alert.alert('Langue', "Français")}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(250).springify()}>
          <SecuritySection
            settings={{ ...mockSecuritySettings, biometricEnabled: isBiometricEnabled }}
            isBiometricHardwareAvailable={isBiometricHardwareAvailable}
            onToggleBiometric={handleToggleBiometric}
            onPressAccountSecurity={() => router.push('/profile/security')}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <ProgramSection />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(350).springify()} className="gap-6">
          <LogoutButton onPress={() => logoutSheetRef.current?.expand()} />
          <ProfileLegalFooter onPressLink={(link) => Alert.alert('Lien légal', link)} />
        </Animated.View>
      </ScrollView>

      <BottomSheet ref={logoutSheetRef} snapPoints={['40%']}>
        <View className="gap-5">
          <Text
            className="text-text-primary text-2xl"
            style={{ fontFamily: 'InstrumentSerif_400Regular' }}
          >
            Se déconnecter ?
          </Text>
          <Text className="text-text-secondary text-sm">
            Vous devrez vous reconnecter pour accéder à votre compte.
          </Text>

          <View className="gap-3">
            <Button
              label="Conserver ma session"
              fullWidth
              onPress={() => logoutSheetRef.current?.close()}
            />
            <Button label="Déconnexion" variant="danger" fullWidth onPress={handleConfirmLogout} />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
