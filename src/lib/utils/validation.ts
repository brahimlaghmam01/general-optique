import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Adresse e-mail requise')
  .email('Adresse e-mail invalide');

export const passwordSchema = z.string().min(6, '6 caractères minimum');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const registerSchema = z.object({
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  birthDate: z.string().min(1, 'Date de naissance requise'),
  email: emailSchema,
  phone: z.string().min(6, 'Numéro de téléphone invalide'),
  password: passwordSchema,
  acceptsTerms: z
    .boolean()
    .refine((value) => value === true, { message: 'Vous devez accepter les CGU.' }),
  acceptsHealthDataProcessing: z
    .boolean()
    .refine((value) => value === true, { message: 'Ce consentement est requis.' }),
  acceptsMarketing: z.boolean(),
});
export type RegisterFormValues = z.infer<typeof registerSchema>;

export const REGISTER_STEP_FIELDS = {
  identity: ['firstName', 'lastName', 'birthDate'],
  contact: ['email', 'phone', 'password'],
  consents: ['acceptsTerms', 'acceptsHealthDataProcessing', 'acceptsMarketing'],
} as const satisfies Record<string, Array<keyof RegisterFormValues>>;
