import type { TextStyle } from 'react-native';

/**
 * Font families loaded via @expo-google-fonts in app/_layout.tsx.
 * Headings use Instrument Serif for an elegant, medical feel;
 * body copy uses Inter; prescription data (OD/OG) uses JetBrains Mono.
 */
export const fontFamily = {
  serifRegular: 'InstrumentSerif_400Regular',
  sansRegular: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemiBold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
  mono: 'JetBrainsMono_400Regular',
} as const;

export const typography = {
  h1: { fontFamily: fontFamily.serifRegular, fontSize: 34, lineHeight: 40 } satisfies TextStyle,
  h2: { fontFamily: fontFamily.serifRegular, fontSize: 28, lineHeight: 34 } satisfies TextStyle,
  h3: { fontFamily: fontFamily.sansSemiBold, fontSize: 20, lineHeight: 26 } satisfies TextStyle,
  bodyLg: { fontFamily: fontFamily.sansRegular, fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  body: { fontFamily: fontFamily.sansRegular, fontSize: 14, lineHeight: 20 } satisfies TextStyle,
  caption: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  } satisfies TextStyle,
  overline: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  mono: { fontFamily: fontFamily.mono, fontSize: 13 } satisfies TextStyle,
} as const;

export type Typography = typeof typography;
