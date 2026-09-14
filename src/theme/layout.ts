/**
 * Floating GlassTabBar geometry. Single source of truth: GlassTabBar uses
 * these to position itself, and useTabBarContentInset (src/hooks) uses the
 * same numbers to compute how much bottom padding a tab screen's scroll
 * content needs so its last item clears the bar. The two can never drift
 * out of sync because they read the same constants.
 */
export const FLOATING_TAB_BAR_HEIGHT = 64;
/** Floor for the bar's distance from the screen bottom on devices with no safe-area inset (e.g. older Android). */
export const FLOATING_TAB_BAR_MIN_BOTTOM_OFFSET = 24;
/** Extra gap added on top of the safe-area bottom inset on devices that do have one. */
export const FLOATING_TAB_BAR_SAFE_AREA_GAP = 12;
