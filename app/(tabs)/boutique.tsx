import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';

import { BoutiqueHeader } from '@/components/features/boutique/BoutiqueHeader';
import { CategorySelector } from '@/components/features/boutique/CategorySelector';
import { ProductCard } from '@/components/features/boutique/ProductCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { mockProductCategories, mockProducts } from '@/constants/mockProducts';
import type { ProductCategory } from '@/types/product';

/**
 * Discovery, not a catalog: one editorial banner, compact category chips,
 * and a small curated pick (one product per category) — never a dense grid.
 * Not wired into the tab bar yet; reachable directly while the MVP is evaluated.
 */
export default function BoutiqueScreen() {
  const router = useRouter();

  const curatedProducts = useMemo(() => {
    const seenCategories = new Set<ProductCategory>();
    return mockProducts.filter((product) => {
      if (seenCategories.has(product.category)) return false;
      seenCategories.add(product.category);
      return true;
    });
  }, []);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background-primary">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6 pb-36 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <BoutiqueHeader />

        <Animated.View
          entering={FadeInDown.delay(50).springify()}
          className="gap-3 rounded-2xl bg-primary-500 p-6"
        >
          <View className="flex-row items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1">
            <Sparkles size={12} color="#FFFFFF" />
            <Text className="text-[10px] font-semibold uppercase tracking-wider text-white">
              À découvrir
            </Text>
          </View>
          <Text
            className="text-2xl text-white"
            style={{ fontFamily: 'InstrumentSerif_400Regular' }}
          >
            Nouvelle collection été
          </Text>
          <Text className="text-sm text-white/85">
            Montures solaires et lunettes de vue à découvrir en boutique.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).springify()} className="gap-3">
          <SectionHeader title="Catégories" />
          <CategorySelector
            categories={mockProductCategories}
            onSelect={(id) => router.push(`/boutique/${id}`)}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).springify()} className="gap-3">
          <SectionHeader title="Notre sélection" />
          <View className="gap-3">
            {curatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => router.push(`/boutique/product/${product.id}`)}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
