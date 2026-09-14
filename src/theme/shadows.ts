import type { ViewStyle } from 'react-native';

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  } satisfies ViewStyle,
  cta: {
    shadowColor: '#004D38',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  } satisfies ViewStyle,
  /** Softer, larger-radius, lower-opacity — for glass surfaces (tab bar, sheets, floating controls). */
  floating: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  } satisfies ViewStyle,
} as const;

export type Shadow = typeof shadow;
