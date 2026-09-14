import { colors } from './colors';
import { typography, fontFamily } from './typography';
import { spacing, radius } from './spacing';
import { shadow } from './shadows';
import { motion } from './motion';

export const theme = {
  colors,
  typography,
  fontFamily,
  spacing,
  radius,
  shadow,
  motion,
} as const;

export type Theme = typeof theme;

export { colors, typography, fontFamily, spacing, radius, shadow, motion };
export { useMotionPreset, type MotionPreset } from './motion';
