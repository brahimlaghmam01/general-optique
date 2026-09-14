import Animated from 'react-native-reanimated';
import { cssInterop } from 'nativewind';

/**
 * NativeWind's web runtime only converts `className` to styles for component
 * types explicitly registered via `cssInterop()`. Reanimated's `Animated.View`
 * is never in NativeWind's default list, so `className` on it is silently
 * dropped on web (the `style` prop for animated transforms still works fine).
 * Registering it here restores className support wherever Animated.View is used.
 */
cssInterop(Animated.View, { className: 'style' });
