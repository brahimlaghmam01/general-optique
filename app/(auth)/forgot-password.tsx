import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail, MailCheck } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { TextField } from '@/components/ui/TextField';
import * as mockAuth from '@/lib/api/mockAuth';
import { colors } from '@/theme/colors';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/utils/validation';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await mockAuth.requestPasswordReset(values.email);
      setIsSent(true);
    } catch (error) {
      Alert.alert('Erreur', error instanceof Error ? error.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
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

          {isSent ? (
            <View className="flex-1 items-center justify-center gap-4">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-primary-50">
                <MailCheck size={28} color={colors.primary[500]} />
              </View>
              <Text
                className="text-text-primary text-center text-2xl"
                style={{ fontFamily: 'InstrumentSerif_400Regular' }}
              >
                Consultez votre boîte mail
              </Text>
              <Text className="text-text-secondary text-center text-sm">
                Un lien de réinitialisation vous a été envoyé. Il expire dans 30 minutes.
              </Text>
              <Button label="Retour à la connexion" variant="secondary" onPress={() => router.back()} />
            </View>
          ) : (
            <>
              <View className="gap-2">
                <Text
                  className="text-text-primary text-3xl"
                  style={{ fontFamily: 'InstrumentSerif_400Regular' }}
                >
                  Mot de passe oublié
                </Text>
                <Text className="text-text-secondary text-sm">
                  Indiquez votre adresse e-mail pour recevoir un lien de réinitialisation.
                </Text>
              </View>

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

              <Button
                label="Envoyer le lien"
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
                disabled={!isValid}
                fullWidth
              />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
