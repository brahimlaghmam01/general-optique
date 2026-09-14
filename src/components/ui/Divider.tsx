import { View } from 'react-native';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** 1px hairline separator. */
export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  return (
    <View
      className={joinClasses(
        'bg-border-light',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      accessible={false}
      importantForAccessibility="no"
    />
  );
}
