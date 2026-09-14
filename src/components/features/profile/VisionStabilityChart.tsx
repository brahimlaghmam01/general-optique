import { useEffect, useMemo, useState } from 'react';
import { Text, View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { Eye } from 'lucide-react-native';

import { colors } from '@/theme/colors';
import type { VisionHistoryPoint } from '@/types/visionHistory';

export interface VisionStabilityChartProps {
  history: VisionHistoryPoint[];
}

const CHART_HEIGHT = 100;
const PADDING_X = 10;
const PADDING_Y = 12;
const DRAW_DURATION_MS = 1200;
const MONO_FONT = { fontFamily: 'JetBrainsMono_400Regular' };

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface PlottedPoint {
  x: number;
  odY: number;
  ogY: number;
}

function plotPoints(history: VisionHistoryPoint[], width: number): PlottedPoint[] {
  const usableWidth = width - PADDING_X * 2;
  const step = history.length > 1 ? usableWidth / (history.length - 1) : 0;
  const values = history.flatMap((point) => [point.od, point.og]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const usableHeight = CHART_HEIGHT - PADDING_Y * 2;

  const scaleY = (value: number) =>
    PADDING_Y + usableHeight - ((value - min) / range) * usableHeight;

  return history.map((point, index) => ({
    x: PADDING_X + index * step,
    odY: scaleY(point.od),
    ogY: scaleY(point.og),
  }));
}

function buildPath(points: PlottedPoint[], key: 'odY' | 'ogY'): string {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point[key]}`).join(' ');
}

/** Animated OD/OG refraction trend — draws on mount, responsive to measured width. */
export function VisionStabilityChart({ history }: VisionStabilityChartProps) {
  const [width, setWidth] = useState(0);
  const drawProgress = useSharedValue(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  useEffect(() => {
    if (width > 0) {
      drawProgress.value = 0;
      drawProgress.value = withTiming(1, {
        duration: DRAW_DURATION_MS,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [width, drawProgress]);

  const points = useMemo(() => (width > 0 ? plotPoints(history, width) : []), [history, width]);
  const ogPath = useMemo(() => buildPath(points, 'ogY'), [points]);
  const odPath = useMemo(() => buildPath(points, 'odY'), [points]);

  const revealAnimatedProps = useAnimatedProps(() => ({
    width: drawProgress.value * width,
  }));

  const latest = history[history.length - 1];

  return (
    <View className="gap-4 rounded-2xl border border-border-light bg-background-secondary p-5">
      <View className="flex-row flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <View className="flex-row items-center gap-1.5">
          <Eye size={14} color={colors.primary[500]} />
          <Text className="text-text-primary text-sm font-semibold">Stabilité visuelle (3 ans)</Text>
        </View>
        {latest && (
          <Text className="text-text-secondary text-xs" style={MONO_FONT}>
            OD: {latest.od.toFixed(2)} | OS: {latest.og.toFixed(2)}
          </Text>
        )}
      </View>

      <View onLayout={handleLayout} style={{ height: CHART_HEIGHT }}>
        {width > 0 && (
          <Svg width={width} height={CHART_HEIGHT}>
            <Defs>
              <ClipPath id="visionRevealClip">
                <AnimatedRect x={0} y={0} height={CHART_HEIGHT} animatedProps={revealAnimatedProps} />
              </ClipPath>
            </Defs>

            <G clipPath="url(#visionRevealClip)">
              <Path
                d={ogPath}
                stroke={colors.primary[500]}
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d={odPath}
                stroke={colors.primary[500]}
                strokeOpacity={0.65}
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeDasharray="6,4"
              />
            </G>

            {points.map((point, index) => (
              <ChartPoint
                key={`og-${history[index].year}`}
                cx={point.x}
                cy={point.ogY}
                index={index}
                total={points.length}
                drawProgress={drawProgress}
                color={colors.primary[500]}
              />
            ))}
            {points.map((point, index) => (
              <ChartPoint
                key={`od-${history[index].year}`}
                cx={point.x}
                cy={point.odY}
                index={index}
                total={points.length}
                drawProgress={drawProgress}
                color={colors.primary[500]}
              />
            ))}
          </Svg>
        )}
      </View>

      <View className="flex-row justify-between">
        {history.map((point, index) => (
          <Text
            key={point.year}
            className="text-text-tertiary text-[10px]"
            style={
              index === 0
                ? { textAlign: 'left' }
                : index === history.length - 1
                  ? { textAlign: 'right' }
                  : { flex: 1, textAlign: 'center' }
            }
          >
            {point.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

function ChartPoint({
  cx,
  cy,
  index,
  total,
  drawProgress,
  color,
}: {
  cx: number;
  cy: number;
  index: number;
  total: number;
  drawProgress: SharedValue<number>;
  color: string;
}) {
  const threshold = total > 1 ? index / (total - 1) : 0;

  const animatedProps = useAnimatedProps(() => ({
    opacity: interpolate(
      drawProgress.value,
      [Math.max(threshold - 0.15, 0), threshold],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return <AnimatedCircle cx={cx} cy={cy} r={4} fill={color} animatedProps={animatedProps} />;
}
