import { create } from 'zustand';

interface TabBarGeometryState {
  /**
   * Real distance from the screen's bottom edge to the top of the floating
   * GlassTabBar, as measured by the bar's own onLayout — not assumed from
   * constants. Null until the bar has rendered at least once.
   */
  occlusionHeight: number | null;
  /** Raw onLayout height of the bar itself — debug-only, kept alongside occlusionHeight. */
  measuredBarHeight: number | null;
  /** bottom offset used to position the bar (insets.bottom + gap, or the floor) — debug-only. */
  measuredBottomOffset: number | null;
  setGeometry: (measuredBarHeight: number, bottomOffset: number) => void;
}

/**
 * The floating GlassTabBar is position:'absolute', so it never occupies
 * normal layout space and React Navigation's own tab-bar-height context
 * doesn't reflect it (GlassTabBar never feeds BottomTabBarHeightCallbackContext).
 * This store is the single source of truth instead: the bar reports what it
 * actually rendered at, and every tab screen's content inset reads that
 * measurement back, so the two can never disagree about the bar's real size.
 */
export const useTabBarGeometryStore = create<TabBarGeometryState>((set, get) => ({
  occlusionHeight: null,
  measuredBarHeight: null,
  measuredBottomOffset: null,
  setGeometry: (measuredBarHeight, bottomOffset) => {
    const occlusionHeight = measuredBarHeight + bottomOffset;
    if (
      get().occlusionHeight !== occlusionHeight ||
      get().measuredBarHeight !== measuredBarHeight ||
      get().measuredBottomOffset !== bottomOffset
    ) {
      set({ occlusionHeight, measuredBarHeight, measuredBottomOffset: bottomOffset });
    }
  },
}));
