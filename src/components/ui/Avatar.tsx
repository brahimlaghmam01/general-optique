import { useState } from 'react';
import { Image, Text, View } from 'react-native';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  /** Initials shown when there is no `src`, or the image fails to load. */
  fallback: string;
  size?: AvatarSize;
}

const DIMENSION: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 56, xl: 88 };
const FONT_SIZE: Record<AvatarSize, number> = { sm: 12, md: 14, lg: 18, xl: 28 };

/** Circular user/contact avatar with an initials fallback for missing or broken images. */
export function Avatar({ src, fallback, size = 'md' }: AvatarProps) {
  const [failedToLoad, setFailedToLoad] = useState(false);
  const dimension = DIMENSION[size];
  const showImage = Boolean(src) && !failedToLoad;
  const initials = fallback.trim().slice(0, 2).toUpperCase();

  if (showImage) {
    return (
      <Image
        source={{ uri: src }}
        accessibilityLabel={fallback}
        style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }}
        onError={() => setFailedToLoad(true)}
      />
    );
  }

  return (
    <View
      className="items-center justify-center rounded-full bg-primary-100"
      accessibilityRole="image"
      accessibilityLabel={fallback}
      style={{ width: dimension, height: dimension }}
    >
      <Text className="font-semibold text-primary-900" style={{ fontSize: FONT_SIZE[size] }}>
        {initials}
      </Text>
    </View>
  );
}
