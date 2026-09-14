import { ScrollView } from 'react-native';

import { Chip } from '@/components/ui/Chip';
import type { ProductCategory, ProductCategoryInfo } from '@/types/product';

export interface CategorySelectorProps {
  categories: ProductCategoryInfo[];
  selectedId?: ProductCategory;
  onSelect: (id: ProductCategory) => void;
}

/** Compact horizontal category navigation — same Chip-row idiom as Home's QuickActions. */
export function CategorySelector({ categories, selectedId, onSelect }: CategorySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 pr-1"
    >
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={category.label}
          active={category.id === selectedId}
          onPress={() => onSelect(category.id)}
        />
      ))}
    </ScrollView>
  );
}
