import { create } from 'zustand';
import * as LocalAuthentication from 'expo-local-authentication';

import { mockUser } from '@/constants/mockData';
import * as mockAuth from '@/lib/api/mockAuth';
import type { AuthResult } from '@/lib/api/mockAuth';
import { secureStorage } from '@/lib/storage/secureStorage';
import type { RegisterPayload } from '@/types/auth';
import type { User } from '@/types/user';

const ACCESS_TOKEN_KEY = 'go_access_token';
const BIOMETRIC_ENABLED_KEY = 'go_biometric_enabled';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  isBiometricEnabled: boolean;
  /** Set by register() and consumed by verifyOtp() — registration only
   *  finalizes into a real session once the OTP step succeeds. */
  pendingAuth: AuthResult | null;
  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  loginWithBiometrics: () => Promise<void>;
  logout: () => Promise<void>;
  setBiometricEnabled: (enabled: boolean) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  status: 'loading',
  isBiometricEnabled: false,
  pendingAuth: null,

  hydrate: async () => {
    const [token, biometricFlag] = await Promise.all([
      secureStorage.getItem(ACCESS_TOKEN_KEY),
      secureStorage.getItem(BIOMETRIC_ENABLED_KEY),
    ]);
    const isBiometricEnabled = biometricFlag === 'true';

    if (token) {
      // No backend session-restore endpoint exists yet, so a persisted token
      // resolves back to the mock user rather than being decoded/validated.
      set({ accessToken: token, user: mockUser, status: 'authenticated', isBiometricEnabled });
    } else {
      set({ status: 'unauthenticated', isBiometricEnabled });
    }
  },

  login: async (email, password) => {
    const result = await mockAuth.login(email, password);
    await secureStorage.setItem(ACCESS_TOKEN_KEY, result.accessToken);
    set({ user: result.user, accessToken: result.accessToken, status: 'authenticated' });
  },

  verifyOtp: async (code) => {
    // The code itself is always validated against the mock OTP endpoint. If
    // this verification is completing a registration, finalize using that
    // pending account instead of the generic mock result.
    const otpResult = await mockAuth.verifyOtp(code);
    const pending = get().pendingAuth;
    const finalResult = pending ?? otpResult;
    await secureStorage.setItem(ACCESS_TOKEN_KEY, finalResult.accessToken);
    set({
      user: finalResult.user,
      accessToken: finalResult.accessToken,
      status: 'authenticated',
      pendingAuth: null,
    });
  },

  register: async (payload) => {
    // Does not authenticate yet — the (auth) route guard would otherwise
    // redirect away before the caller can navigate to the OTP screen.
    const result = await mockAuth.register(payload);
    set({ pendingAuth: result });
  },

  loginWithBiometrics: async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = hasHardware ? await LocalAuthentication.isEnrolledAsync() : false;
    if (!hasHardware || !isEnrolled) {
      throw new Error("L'authentification biométrique n'est pas disponible sur cet appareil.");
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authentification requise',
      cancelLabel: 'Annuler',
    });
    if (!result.success) {
      throw new Error('Authentification biométrique annulée.');
    }

    const token = await secureStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      throw new Error('Aucune session enregistrée. Veuillez vous reconnecter.');
    }
    set({ accessToken: token, user: mockUser, status: 'authenticated' });
  },

  logout: async () => {
    await secureStorage.removeItem(ACCESS_TOKEN_KEY);
    set({ user: null, accessToken: null, status: 'unauthenticated' });
  },

  setBiometricEnabled: async (enabled) => {
    await secureStorage.setItem(BIOMETRIC_ENABLED_KEY, enabled ? 'true' : 'false');
    set({ isBiometricEnabled: enabled });
  },
}));
