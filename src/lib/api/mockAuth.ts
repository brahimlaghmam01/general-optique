import { mockUser } from '@/constants/mockData';
import type { RegisterPayload } from '@/types/auth';
import type { User } from '@/types/user';

const NETWORK_DELAY_MS = 900;
const OTP_DELAY_MS = 600;
const VALID_OTP_CODE = '123456';

export interface AuthResult {
  user: User;
  accessToken: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function issueToken(): string {
  return `mock_token_${Date.now()}`;
}

/** No backend yet: any password of 6+ characters succeeds. */
export async function login(email: string, password: string): Promise<AuthResult> {
  await delay(NETWORK_DELAY_MS);
  if (password.length < 6) {
    throw new Error('Mot de passe incorrect. Veuillez réessayer.');
  }
  return { user: { ...mockUser, email }, accessToken: issueToken() };
}

/** Only "123456" is accepted — everything else rejects. */
export async function verifyOtp(code: string): Promise<AuthResult> {
  await delay(OTP_DELAY_MS);
  if (code !== VALID_OTP_CODE) {
    throw new Error('Code incorrect.');
  }
  return { user: mockUser, accessToken: issueToken() };
}

export async function register(payload: RegisterPayload): Promise<AuthResult> {
  await delay(NETWORK_DELAY_MS);
  return {
    user: {
      ...mockUser,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
    },
    accessToken: issueToken(),
  };
}

export async function requestPasswordReset(email: string): Promise<void> {
  await delay(NETWORK_DELAY_MS);
  if (!email.includes('@')) {
    throw new Error('Adresse e-mail invalide.');
  }
}
