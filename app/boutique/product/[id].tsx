import { Fragment, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Droplet, Glasses, Sun, type LucideIcon } from 'lucide-react-native';

import { StoreAvailabilityRow } from '@/components/features/boutique/StoreAvailabilityRow';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { IconButton } from '@/components/ui/IconButton';
import { mockStores } from '@/constants/mockData';
import { mockProducts } from '@/constants/mockProducts';
import { formatPrice } from '@/lib/utils/format';
import { colors } from '@/theme/colors';
import { DURATION_SCREEN, useMotionPreset } from '@/theme/motion';
import type { ProductCategory } from '@/types/product';

const CATEGORY_ICONS: Record<ProductCategory, LucideIcon> = {
  'lunettes-de-vue': Glasses,
  'lunettes-de-soleil': Sun,
  lentilles: Droplet,
};

/** The one existing appointment motif Boutique connects into — "Essayage & Conseil style montures". */
const TRY_ON_MOTIF_ID = 'motif_frames';

/**
 * The bridge between discovery and real-world service. The primary action
 * pushes into the existing booking flow (pre-filled motif + selected store) —
 * there is no separate transaction/checkout implementation here.
 */
export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { reduced } = useMotionPreset();

  const product = mockProducts.find((item) => item.id === id);

  const availableStores = useMemo(
    () => mockStores.filter((store) => product?.availableStoreIds.includes(store.id)),
    [product]
  );

  const [selectedStoreId, setSelectedStoreId] = useState<string | undefined>(availableStores[0]?.id);

  if (!product) {
    router.back();
    return null;
  }

  const Icon = CATEGORY_ICONS[product.category];

  const handleBookFitting = () => {
    router.push({
      pathname: '/appointment/book',
      params: {
        motifId: TRY_ON_MOTIF_ID,
        ...(selectedStoreId ? { storeId: selectedStoreId } : {}),
      },
    });
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background-primary">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-6 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <IconButton
          icon={ArrowLeft}
          variant="ghost"
          onPress={() => router.back()}
          accessibilityLabel="Retour"
        />

        <Animated.View
          entering={reduced ? FadeIn.duration(DURATION_SCREEN) : FadeIn.springify()}
          className="h-56 items-center justify-center rounded-2xl bg-background-tertiary"
        >
          <Icon size={64} color={colors.text.tertiary} />
        </Animated.View>

        <View className="gap-2">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
              {product.brand}
            </Text>
            {product.tags?.[0] && <Badge label={product.tags[0]} variant="brand" size="sm" />}
          </View>
          <Text className="text-text-primary text-2xl font-semibold">{product.name}</Text>
          <Text className="text-text-secondary text-sm">{product.description}</Text>
          <Text className="text-primary-500 pt-1 text-lg font-semibold">
            À partir de {formatPrice(product.indicativePrice)}
          </Text>
          <Text className="text-text-tertiary text-xs">
            Prix indicatif, hors prise en charge mutuelle.
          </Text>
        </View>

        {availableStores.length > 0 && (
          <View className="gap-2">
            <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
              Disponible pour essayage
            </Text>
            <View className="rounded-2xl border border-border-light bg-background-secondary px-4">
              {availableStores.map((store, index) => (
                <Fragment key={store.id}>
                  {index > 0 && <Divider />}
                  <StoreAvailabilityRow
                    store={store}
                    selected={store.id === selectedStoreId}
                    onSelect={() => setSelectedStoreId(store.id)}
                  />
                </Fragment>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View className="gap-2 border-t border-border-light px-6 pb-6 pt-4">
        <Button
          label="Prendre rendez-vous pour essayer"
          size="lg"
          fullWidth
          onPress={handleBookFitting}
        />
      </View>
    </SafeAreaView>
  );
}
