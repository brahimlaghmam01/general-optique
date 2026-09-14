import { useEffect, useState } from 'react';
import { Pressable, Text, View, type LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// expo-router vendors its own react-navigation bottom-tabs fork; the
// standalone @react-navigation/bottom-tabs package's types no longer match
// what <Tabs tabBar> actually passes, so we source the type from here.
import type { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { Calendar, Home, Package, User, type LucideIcon } from 'lucide-react-native';

import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/theme/colors';
import { shadow } from '@/theme/shadows';

const TAB_CONFIG: Record<string, { label: string; icon: LucideIcon }> = {
  index: { label: 'Accueil', icon: Home },
  appointments: { label: 'Rendez-vous', icon: Calendar },
  orders: { label: 'Commandes', icon: Package },
  profile: { label: 'Profil', icon: User },
};

const BAR_HEIGHT = 64;
const PILL_INSET = 6;
const INDICATOR_SPRING = { damping: 18, stiffness: 200 };

/** Floating pill tab bar with an animated active indicator. Passed to `<Tabs tabBar={...}>`. */
export function AnimatedTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const [barWidth, setBarWidth] = useState(0);
  const tabWidth = barWidth / state.routes.length;
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (barWidth > 0) {
      translateX.value = withSpring(state.index * tabWidth, INDICATOR_SPRING);
    }
  }, [state.index, barWidth, tabWidth, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setBarWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: Math.max(24, insets.bottom + 12),
      }}
    >
      <View
        onLayout={handleLayout}
        className="flex-row items-center rounded-full border border-border-light/60 bg-background-secondary"
        style={[{ height: BAR_HEIGHT }, shadow.card, { elevation: 6 }]}
      >
        {barWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            className="absolute rounded-full bg-primary-50"
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
    iconScale.value = withSpring(isFocused ? 1.1 : 1, { damping: 15, stiffness: 400 });
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
