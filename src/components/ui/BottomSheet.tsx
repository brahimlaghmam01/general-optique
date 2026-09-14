import { forwardRef, useMemo, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
  type BottomSheetProps as GorhomBottomSheetProps,
} from '@gorhom/bottom-sheet';

import { GlassContainer } from '@/components/ui/GlassContainer';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/spacing';

export interface BottomSheetProps
  extends Pick<
    GorhomBottomSheetProps,
    'snapPoints' | 'index' | 'onChange' | 'enableDynamicSizing' | 'enablePanDownToClose'
  > {
  children: ReactNode;
  /** 'solid' (default — best for readable content like booking steps) or 'glass' (lighter, transient sheets). */
  variant?: 'solid' | 'glass';
}

function renderBackdrop(props: BottomSheetBackdropProps) {
  return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.4} />;
}

/**
 * Styled wrapper around @gorhom/bottom-sheet — the app's progressive-disclosure
 * primitive (booking-flow steps, reschedule, "see more" content). Ref-based
 * and non-modal (no root provider required) — the parent controls open/close
 * via the forwarded ref (`.expand()`, `.close()`, `.snapToIndex()`).
 */
export const BottomSheet = forwardRef<GorhomBottomSheet, BottomSheetProps>(function BottomSheet(
  {
    children,
    snapPoints,
    index = -1,
    onChange,
    enableDynamicSizing = snapPoints === undefined,
    enablePanDownToClose = true,
    variant = 'solid',
  },
  ref
) {
  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: variant === 'solid' ? colors.background.secondary : 'transparent',
      borderTopLeftRadius: radius['2xl'],
      borderTopRightRadius: radius['2xl'],
    }),
    [variant]
  );

  return (
    <GorhomBottomSheet
      ref={ref}
      index={index}
      snapPoints={snapPoints}
      enableDynamicSizing={enableDynamicSizing}
      enablePanDownToClose={enablePanDownToClose}
      onChange={onChange}
      backgroundStyle={backgroundStyle}
      handleIndicatorStyle={{ backgroundColor: colors.border.medium, width: 36 }}
      backdropComponent={renderBackdrop}
    >
      {variant === 'glass' && (
        <GlassContainer roundedClassName="rounded-t-3xl" style={StyleSheet.absoluteFill} />
      )}
      <BottomSheetView className="px-6 pb-8 pt-2">{children}</BottomSheetView>
    </GorhomBottomSheet>
  );
});
