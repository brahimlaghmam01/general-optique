import { useCallback } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

const HAPTICS_SUPPORTED = Platform.OS !== 'web';

/**
 * Centralizes haptic feedback so every interactive element in the app calls
 * a consistent, named vocabulary instead of raw expo-haptics enums. expo-haptics
 * has no web implementation and rejects every call there, so this is a no-op
 * on web rather than a per-callsite platform check.
 */
export function useHaptics() {
  const light = useCallback(() => {
    if (!HAPTICS_SUPPORTED) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const medium = useCallback(() => {
    if (!HAPTICS_SUPPORTED) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const heavy = useCallback(() => {
    if (!HAPTICS_SUPPORTED) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, []);

  const success = useCallback(() => {
    if (!HAPTICS_SUPPORTED) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const warning = useCallback(() => {
    if (!HAPTICS_SUPPORTED) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }, []);

  const error = useCallback(() => {
    if (!HAPTICS_SUPPORTED) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);

  const selection = useCallback(() => {
    if (!HAPTICS_SUPPORTED) return;
    void Haptics.selectionAsync();
  }, []);

  return { light, medium, heavy, success, warning, error, selection };
}
