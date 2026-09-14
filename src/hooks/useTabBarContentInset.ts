import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTabBarGeometryStore } from '@/stores/tabBarGeometryStore';
import { spacing } from '@/theme/spacing';
import {
  FLOATING_TAB_BAR_HEIGHT,
  FLOATING_TAB_BAR_MIN_BOTTOM_OFFSET,
  FLOATING_TAB_BAR_SAFE_AREA_GAP,
} from '@/theme/layout';

/**
 * Bottom padding a tab screen's scrollable content needs so its last item
 * can always clear the floating GlassTabBar. The floating bar is
 * position:'absolute' — it occupies no normal layout space, so this has to
 * be computed explicitly rather than relying on flex flow.
 *
 * Primary source: the bar's own onLayout measurement (see GlassTabBar,
 * tabBarGeometryStore) — the bar's REAL rendered footprint on this device,
 * not an assumed constant. Falls back to the constants-based calculation
 * only for the brief window before the bar has measured itself once (first
 * paint), so content never renders with zero bottom padding.
 */
export function useTabBarContentInset(breathingSpace: number = spacing['2xl']): number {
  const insets = useSafeAreaInsets();
  const measuredOcclusion = useTabBarGeometryStore((state) => state.occlusionHeight);

  const fallbackOcclusion =
    Math.max(FLOATING_TAB_BAR_MIN_BOTTOM_OFFSET, insets.bottom + FLOATING_TAB_BAR_SAFE_AREA_GAP) +
    FLOATING_TAB_BAR_HEIGHT;

  return (measuredOcclusion ?? fallbackOcclusion) + breathingSpace;
}
