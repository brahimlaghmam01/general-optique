import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Fingerprint, Lock, Mail } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { IconButton } from '@/components/ui/IconButton';
import { TextField } from '@/components/ui/TextField';
import { loginSchema, type LoginFormValues } from '@/lib/utils/validation';
import { useAuthStore } from '@/stores/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const loginWithBiometrics = useAuthStore((state) => state.loginWithBiometrics);
  const isBiometricEnabled = useAuthStore((state) => state.isBiometricEnabled);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBiometricSubmitting, setIsBiometricSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
    } catch (error) {
      Alert.alert(
        'Connexion impossible',
        error instanceof Error ? error.message : 'Une erreur est survenue.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (isBiometricSubmitting) return;
    setIsBiometricSubmitting(true);
    try {
      await loginWithBiometrics();
    } catch (error) {
      Alert.alert('Face ID', error instanceof Error ? error.message : 'Une erreur est survenue.');
    } finally {
      setIsBiometricSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background-primary">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerClassName="flex-grow gap-8 px-6 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
        >
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
              Content de vous revoir
            </Text>
            <Text className="text-text-secondary text-sm">
              Connectez-vous à votre espace santé visuelle.
            </Text>
          </View>

          <View className="gap-4">
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  label="Adresse e-mail"
                  placeholder="vous@email.fr"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  leftIcon={Mail}
                  keyboardType="email-address"
                  autoComplete="email"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  label="Mot de passe"
                  placeholder="••••••••"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  leftIcon={Lock}
                  secureTextEntry
                  autoComplete="password"
                />
              )}
            />
            <Text
              className="self-end text-sm font-medium text-primary-500"
              onPress={() => router.push('/forgot-password')}
              accessibilityRole="button"
            >
              Mot de passe oublié ?
            </Text>
          </View>

          <View className="gap-4">
            <Button
              label="Se connecter"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              disabled={!isValid}
              fullWidth
            />

            {isBiometricEnabled && (
              <Button
                label="Se connecter avec Face ID"
                icon={Fingerprint}
                variant="secondary"
                onPress={handleBiometricLogin}
                loading={isBiometricSubmitting}
                fullWidth
              />
            )}

            <View className="flex-row items-center gap-3">
              <Divider className="flex-1" />
              <Text className="text-text-tertiary text-xs">ou</Text>
              <Divider className="flex-1" />
            </View>

            <Button
              label="Continuer avec mon numéro"
              variant="ghost"
              onPress={() => router.push('/otp')}
              fullWidth
            />
          </View>

          <View className="flex-1 items-center justify-end">
            <Text className="text-text-secondary text-sm">
              Pas encore de compte ?{' '}
              <Text
                className="font-semibold text-primary-500"
                onPress={() => router.push('/register')}
              >
                Créer un compte
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
