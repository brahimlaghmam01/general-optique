import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import { ArrowLeft, Calendar, Lock, Mail, Phone, User as UserIcon } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { IconButton } from '@/components/ui/IconButton';
import { TextField } from '@/components/ui/TextField';
import {
  REGISTER_STEP_FIELDS,
  registerSchema,
  type RegisterFormValues,
} from '@/lib/utils/validation';
import { useAuthStore } from '@/stores/authStore';

const STEP_TITLES = ['Identité', 'Contact', 'Consentements'];
const LAST_STEP = STEP_TITLES.length - 1;

type Direction = 'forward' | 'back';

export default function RegisterScreen() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<Direction>('forward');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
      phone: '',
      password: '',
      acceptsTerms: false,
      acceptsHealthDataProcessing: false,
      acceptsMarketing: false,
    },
  });

  const handleBack = () => {
    if (step === 0) {
      Alert.alert("Quitter l'inscription ?", 'Les informations saisies seront perdues.', [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Quitter', style: 'destructive', onPress: () => router.back() },
      ]);
      return;
    }
    setDirection('back');
    setStep((current) => current - 1);
  };

  const handleContinue = async () => {
    const stepKey = Object.keys(REGISTER_STEP_FIELDS)[step] as keyof typeof REGISTER_STEP_FIELDS;
    const isStepValid = await trigger(REGISTER_STEP_FIELDS[stepKey]);
    if (!isStepValid) return;

    if (step < LAST_STEP) {
      setDirection('forward');
      setStep((current) => current + 1);
    }
  };

  const onSubmit = async (values: RegisterFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await register(values);
      router.push('/otp');
    } catch (error) {
      Alert.alert('Inscription impossible', error instanceof Error ? error.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background-primary">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View className="gap-6 px-6 pt-4">
          <IconButton icon={ArrowLeft} variant="ghost" onPress={handleBack} accessibilityLabel="Retour" />

          <View className="flex-row gap-2">
            {STEP_TITLES.map((title, index) => (
              <ProgressSegment key={title} isFilled={index <= step} />
            ))}
          </View>
        </View>

        <ScrollView
          contentContainerClassName="flex-grow gap-8 px-6 pb-8 pt-6"
          keyboardShouldPersistTaps="handled"
        >
          {step === 0 && (
            <Animated.View
              key="step-0"
              entering={direction === 'forward' ? SlideInRight : SlideInLeft}
              exiting={direction === 'forward' ? SlideOutLeft : SlideOutRight}
              className="gap-6"
            >
              <StepHeading title="Identité" subtitle="Faisons connaissance." />
              <Controller
                control={control}
                name="firstName"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label="Prénom"
                    placeholder="Stevan"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.firstName?.message}
                    leftIcon={UserIcon}
                    autoComplete="given-name"
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label="Nom"
                    placeholder="Doe"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.lastName?.message}
                    leftIcon={UserIcon}
                    autoComplete="family-name"
                  />
                )}
              />
              <Controller
                control={control}
                name="birthDate"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label="Date de naissance"
                    placeholder="JJ/MM/AAAA"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.birthDate?.message}
                    leftIcon={Calendar}
                    keyboardType="number-pad"
                  />
                )}
              />
            </Animated.View>
          )}

          {step === 1 && (
            <Animated.View
              key="step-1"
              entering={direction === 'forward' ? SlideInRight : SlideInLeft}
              exiting={direction === 'forward' ? SlideOutLeft : SlideOutRight}
              className="gap-6"
            >
              <StepHeading title="Contact" subtitle="Comment vous joindre et vous connecter." />
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
                name="phone"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label="Téléphone"
                    placeholder="+33 6 12 34 56 78"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.phone?.message}
                    leftIcon={Phone}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <View className="gap-2">
                    <TextField
                      label="Mot de passe"
                      placeholder="••••••••"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.password?.message}
                      leftIcon={Lock}
                      secureTextEntry
                      autoComplete="password-new"
                    />
                    <PasswordStrengthBar password={value} />
                  </View>
                )}
              />
            </Animated.View>
          )}

          {step === 2 && (
            <Animated.View
              key="step-2"
              entering={direction === 'forward' ? SlideInRight : SlideInLeft}
              exiting={direction === 'forward' ? SlideOutLeft : SlideOutRight}
              className="gap-6"
            >
              <StepHeading
                title="Consentements"
                subtitle="Nécessaires pour ouvrir votre espace de santé visuelle."
              />
              <Controller
                control={control}
                name="acceptsTerms"
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    onCheckedChange={onChange}
                    error={!!errors.acceptsTerms}
                    accessibilityLabel="J'accepte les Conditions Générales d'Utilisation"
                  >
                    <Text className="text-text-primary text-sm">
                      J&apos;accepte les{' '}
                      <Text className="font-semibold text-primary-500">
                        Conditions Générales d&apos;Utilisation
                      </Text>
                    </Text>
                  </Checkbox>
                )}
              />
              <Controller
                control={control}
                name="acceptsHealthDataProcessing"
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    onCheckedChange={onChange}
                    error={!!errors.acceptsHealthDataProcessing}
                    accessibilityLabel="Je consens au traitement de mes données de santé"
                  >
                    <Text className="text-text-primary text-sm">
                      Je consens au traitement de mes données de santé (hébergement HDS certifié)
                    </Text>
                  </Checkbox>
                )}
              />
              <Controller
                control={control}
                name="acceptsMarketing"
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    onCheckedChange={onChange}
                    accessibilityLabel="Je souhaite recevoir les offres et rappels Générale d'Optique"
                  >
                    <Text className="text-text-secondary text-sm">
                      Je souhaite recevoir les offres et rappels Générale d&apos;Optique
                    </Text>
                  </Checkbox>
                )}
              />
            </Animated.View>
          )}
        </ScrollView>

        <View className="gap-3 px-6 pb-6 pt-2">
          {step < LAST_STEP ? (
            <Button label="Continuer" onPress={handleContinue} fullWidth />
          ) : (
            <Button
              label="Créer mon compte"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              fullWidth
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View className="gap-1">
      <Text className="text-text-primary text-2xl" style={{ fontFamily: 'InstrumentSerif_400Regular' }}>
        {title}
      </Text>
      <Text className="text-text-secondary text-sm">{subtitle}</Text>
    </View>
  );
}

function ProgressSegment({ isFilled }: { isFilled: boolean }) {
  return (
    <Animated.View
      layout={LinearTransition.duration(200)}
      className={isFilled ? 'h-1.5 flex-1 rounded-full bg-primary-500' : 'h-1.5 flex-1 rounded-full bg-border-light'}
    />
  );
}

const STRENGTH_LABELS = ['Très faible', 'Faible', 'Moyen', 'Bon', 'Excellent'];
const STRENGTH_COLORS = ['#EF4444', '#EF4444', '#F59E0B', '#10B981', '#004D38'];

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  const clamped = Math.min(score, STRENGTH_LABELS.length - 1);
  return { score: clamped, label: STRENGTH_LABELS[clamped], color: STRENGTH_COLORS[clamped] };
}

function PasswordStrengthBar({ password }: { password: string }) {
  if (!password) return null;
  const strength = getPasswordStrength(password);
  const percentage = (strength.score / (STRENGTH_LABELS.length - 1)) * 100;

  return (
    <View className="gap-1">
      <View className="h-1.5 overflow-hidden rounded-full bg-border-light">
        <Animated.View
          layout={LinearTransition.duration(200)}
          style={{ width: `${percentage}%`, backgroundColor: strength.color }}
          className="h-1.5 rounded-full"
        />
      </View>
      <Text className="text-text-tertiary text-xs">{strength.label}</Text>
    </View>
  );
}
