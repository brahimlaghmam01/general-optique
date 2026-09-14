import { forwardRef, useMemo } from 'react';
import { Pressable, View, type GestureResponderEvent, type ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { useHaptics } from '@/hooks/useHaptics';
import { shadow } from '@/theme/shadows';

export type CardVariant = 'default' | 'elevated' | 'bordered';

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  onPress?: (event: GestureResponderEvent) => void;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: 'bg-background-secondary rounded-2xl',
  elevated: 'bg-background-secondary rounded-2xl',
  bordered: 'bg-background-secondary rounded-2xl border border-border-light',
};

function joinClasses(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Root card surface. Renders as a plain View unless `onPress` is given, in
 * which case it becomes a pressable with the standard scale-down + haptic
 * micro-interaction. Compose with Card.Header / Card.Content / Card.Footer.
 */
export const Card = forwardRef<View, CardProps>(function Card(
  { variant = 'default', onPress, className, children, ...viewProps },
  ref
) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress(0.98);
  const haptics = useHaptics();

  const containerClassName = useMemo(
    () => joinClasses(VARIANT_CLASSES[variant], className),
    [variant, className]
  );

  const elevatedStyle = variant === 'elevated' ? shadow.card : undefined;

  if (!onPress) {
    return (
      <View ref={ref} className={containerClassName} style={elevatedStyle} {...viewProps}>
        {children}
      </View>
    );
  }

  const handlePress = (event: GestureResponderEvent) => {
    haptics.light();
    onPress(event);
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      {...viewProps}
    >
      <Animated.View style={[elevatedStyle, animatedStyle]} className={containerClassName}>
        {children}
      </Animated.View>
    </Pressable>
  );
}) as CardComponent;

const CardHeader = ({ className, children, ...viewProps }: ViewProps) => (
  <View className={joinClasses('gap-1 p-5 pb-3', className)} {...viewProps}>
    {children}
  </View>
);
CardHeader.displayName = 'Card.Header';

const CardContent = ({ className, children, ...viewProps }: ViewProps) => (
  <View className={joinClasses('px-5 pb-5', className)} {...viewProps}>
    {children}
  </View>
);
CardContent.displayName = 'Card.Content';

const CardFooter = ({ className, children, ...viewProps }: ViewProps) => (
  <View
    className={joinClasses(
      'flex-row items-center gap-3 border-t border-border-light px-5 py-4',
      className
    )}
    {...viewProps}
  >
    {children}
  </View>
);
CardFooter.displayName = 'Card.Footer';

interface CardComponent
  extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<View>> {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
}

(Card as CardComponent).Header = CardHeader;
(Card as CardComponent).Content = CardContent;
(Card as CardComponent).Footer = CardFooter;
