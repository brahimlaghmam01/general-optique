/**
 * Générale d'Optique design tokens — color palette.
 * Mirrors tailwind.config.js so JS-side consumers (icons, charts, SVGs,
 * native driver values) stay in sync with the NativeWind utility classes.
 */
export const colors = {
  primary: {
    50: '#F0F5F2',
    100: '#DCE8E1',
    500: '#004D38',
    600: '#003D2C',
    900: '#001A13',
  },
  background: {
    primary: '#F5F3EE',
    secondary: '#FFFFFF',
    tertiary: '#EDEAE3',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
  },
} as const;

export type Colors = typeof colors;
