import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, PackageSearch } from 'lucide-react-native';

import { CategorySelector } from '@/components/features/boutique/CategorySelector';
import { ProductCard } from '@/components/features/boutique/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { IconButton } from '@/components/ui/IconButton';
import { mockProductCategories, mockProducts } from '@/constants/mockProducts';
import type { ProductCategory } from '@/types/product';

/** Full listing for one category — "progressive exploration" past the curated teaser on Boutique's main screen. */
export default function CategoryScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const categoryId = category as ProductCategory;

  const categoryInfo = mockProductCategories.find((item) => item.id === categoryId);
  const products = useMemo(
    () => mockProducts.filter((product) => product.category === categoryId),
    [categoryId]
  );

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

        <View className="gap-1">
          <Text
            className="text-text-primary text-3xl"
            style={{ fontFamily: 'InstrumentSerif_400Regular' }}
          >
            {categoryInfo?.label ?? 'Boutique'}
          </Text>
          {categoryInfo?.description && (
            <Text className="text-text-secondary text-sm">{categoryInfo.description}</Text>
          )}
        </View>

        <CategorySelector
          categories={mockProductCategories}
          selectedId={categoryId}
          onSelect={(id) => router.replace(`/boutique/${id}`)}
        />

        {products.length > 0 ? (
          <View className="gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => router.push(`/boutique/product/${product.id}`)}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            icon={PackageSearch}
            title="Aucun produit pour le moment"
            description="De nouvelles références seront ajoutées prochainement."
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
