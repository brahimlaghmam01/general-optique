import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/**
 * Typed wrapper over expo-secure-store (Keychain on iOS, Keystore on Android).
 * SecureStore has no web implementation, so web falls back to localStorage —
 * dev-only fallback, native builds always use Keychain/Keystore. Never treat
 * the web branch as a real security boundary; it exists so the app runs in
 * this project's browser-based preview flow.
 */
async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  return SecureStore.getItemAsync(key);
}

async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore write failures (e.g. private browsing) — falling back silently is fine for this dev-only path.
    }
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function removeItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem(key);
    } catch {
      // See setItem.
    }
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export const secureStorage = { getItem, setItem, removeItem };
