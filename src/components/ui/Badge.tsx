import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'brand';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
}

const CONTAINER_VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-background-tertiary',
  success: 'bg-success/10',
  warning: 'bg-warning/10',
  error: 'bg-error/10',
  brand: 'bg-primary-100',
};

const LABEL_VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'text-text-secondary',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  brand: 'text-primary-500',
};

const SIZE_CONTAINER_CLASSES: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 gap-1',
  md: 'px-2.5 py-1 gap-1.5',
};

const SIZE_LABEL_CLASSES: Record<BadgeSize, string> = {
  sm: 'text-[10px]',
  md: 'text-xs',
};

function joinClasses(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Small status/metadata pill — e.g. "Valide", "En cours", "Montage en atelier". */
export function Badge({ label, variant = 'default', size = 'md', icon }: BadgeProps) {
  return (
    <View
      className={joinClasses(
        'flex-row items-center self-start rounded-full',
        CONTAINER_VARIANT_CLASSES[variant],
        SIZE_CONTAINER_CLASSES[size]
      )}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      {icon}
      <Text
        className={joinClasses(
          'font-semibold uppercase tracking-wide',
          LABEL_VARIANT_CLASSES[variant],
          SIZE_LABEL_CLASSES[size]
        )}
      >
        {label}
      </Text>
    </View>
  );
}
