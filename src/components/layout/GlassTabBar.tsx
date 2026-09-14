import { useEffect, useState } from 'react';
import { Pressable, Text, View, type LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// expo-router vendors its own react-navigation bottom-tabs fork; the
// standalone @react-navigation/bottom-tabs package's types no longer match
// what <Tabs tabBar> actually passes, so we source the type from here.
import type { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { Calendar, Home, Package, User, type LucideIcon } from 'lucide-react-native';

import { GlassContainer } from '@/components/ui/GlassContainer';
import { useHaptics } from '@/hooks/useHaptics';
import { useTabBarGeometryStore } from '@/stores/tabBarGeometryStore';
import { colors } from '@/theme/colors';
import {
  FLOATING_TAB_BAR_HEIGHT,
  FLOATING_TAB_BAR_MIN_BOTTOM_OFFSET,
  FLOATING_TAB_BAR_SAFE_AREA_GAP,
} from '@/theme/layout';
import { shadow } from '@/theme/shadows';
import { SPRING_PRESS, SPRING_TAB_INDICATOR } from '@/theme/motion';

const TAB_CONFIG: Record<string, { label: string; icon: LucideIcon }> = {
  index: { label: 'Accueil', icon: Home },
  appointments: { label: 'Rendez-vous', icon: Calendar },
  orders: { label: 'Commandes', icon: Package },
  profile: { label: 'Profil', icon: User },
};

const BAR_HEIGHT = FLOATING_TAB_BAR_HEIGHT;
const PILL_INSET = 6;

/**
 * Glass-material evolution of AnimatedTabBar — same indicator-slide, icon-scale,
 * and haptics logic, rendered through GlassContainer instead of a flat white
 * pill. The production tab bar for the 4-tab IA (Accueil/Rendez-vous/Commandes/
 * Profil); AnimatedTabBar itself is kept only for comparison on /design-system.
 */
export function GlassTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const [barWidth, setBarWidth] = useState(0);
  const tabWidth = barWidth / state.routes.length;
  const translateX = useSharedValue(0);
  const setGeometry = useTabBarGeometryStore((state) => state.setGeometry);

  const bottomOffset = Math.max(
    FLOATING_TAB_BAR_MIN_BOTTOM_OFFSET,
    insets.bottom + FLOATING_TAB_BAR_SAFE_AREA_GAP
  );

  useEffect(() => {
    if (barWidth > 0) {
      translateX.value = withSpring(state.index * tabWidth, SPRING_TAB_INDICATOR);
    }
  }, [state.index, barWidth, tabWidth, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleRowLayout = (event: LayoutChangeEvent) => {
    setBarWidth(event.nativeEvent.layout.width);
  };

  // Reports the bar's true rendered footprint (bottom offset + actual measured
  // height, not the assumed BAR_HEIGHT constant) so screen content can reserve
  // exactly that much space, regardless of any platform-specific rendering
  // quirk in GlassContainer/BlurView that might make it differ from 64px.
  const handleWrapperLayout = (event: LayoutChangeEvent) => {
    setGeometry(event.nativeEvent.layout.height, bottomOffset);
  };

  return (
    <View
      pointerEvents="box-none"
      onLayout={handleWrapperLayout}
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: bottomOffset,
      }}
    >
      <GlassContainer style={{ height: BAR_HEIGHT, ...shadow.floating }}>
        <View onLayout={handleRowLayout} className="flex-1 flex-row items-center">
          {barWidth > 0 && (
            <Animated.View
              pointerEvents="none"
              className="absolute rounded-full bg-primary-500/10"
              style={[
                {
                  top: PILL_INSET,
                  left: PILL_INSET,
                  width: tabWidth - PILL_INSET * 2,
                  height: BAR_HEIGHT - PILL_INSET * 2,
                },
                indicatorStyle,
              ]}
            />
          )}

          {state.routes.map((route, index) => {
            const config = TAB_CONFIG[route.name];
            if (!config) return null;
            const isFocused = state.index === index;

            const onPress = () => {
              haptics.light();
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({ type: 'tabLongPress', target: route.key });
            };

            return (
              <TabItem
                key={route.key}
                label={config.label}
                icon={config.icon}
                isFocused={isFocused}
                onPress={onPress}
                onLongPress={onLongPress}
              />
            );
          })}
        </View>
      </GlassContainer>
    </View>
  );
}

interface TabItemProps {
  label: string;
  icon: LucideIcon;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

function TabItem({ label, icon: Icon, isFocused, onPress, onLongPress }: TabItemProps) {
  const iconScale = useSharedValue(isFocused ? 1.1 : 1);

  useEffect(() => {
    iconScale.value = withSpring(isFocused ? 1.1 : 1, SPRING_PRESS);
  }, [isFocused, iconScale]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const tintColor = isFocused ? colors.primary[500] : colors.text.tertiary;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center gap-1"
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
    >
      <Animated.View style={iconStyle}>
        <Icon size={22} color={tintColor} />
      </Animated.View>
      <Text style={{ fontSize: 10, fontFamily: 'Inter_600SemiBold', color: tintColor }}>
        {label}
      </Text>
    </Pressable>
  );
}
