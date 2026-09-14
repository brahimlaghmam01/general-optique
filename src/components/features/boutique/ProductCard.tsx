import { Text, View } from 'react-native';
import { Droplet, Glasses, Sun, type LucideIcon } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils/format';
import { colors } from '@/theme/colors';
import type { Product, ProductCategory } from '@/types/product';

const CATEGORY_ICONS: Record<ProductCategory, LucideIcon> = {
  'lunettes-de-vue': Glasses,
  'lunettes-de-soleil': Sun,
  lentilles: Droplet,
};

export interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

/** Editorial product row — icon placeholder (no photography asset exists yet), brand/name/price, one optional tag. */
export function ProductCard({ product, onPress }: ProductCardProps) {
  const Icon = CATEGORY_ICONS[product.category];

  return (
    <Card variant="bordered" onPress={onPress} className="flex-row gap-4 p-4">
      <View className="h-16 w-16 items-center justify-center rounded-xl bg-background-tertiary">
        <Icon size={26} color={colors.text.tertiary} />
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
            {product.brand}
          </Text>
          {product.tags?.[0] && <Badge label={product.tags[0]} variant="brand" size="sm" />}
        </View>
        <Text className="text-text-primary text-sm font-semibold" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-text-secondary text-xs" numberOfLines={2}>
          {product.description}
        </Text>
        <Text className="text-primary-500 pt-1 text-sm font-semibold">
          À partir de {formatPrice(product.indicativePrice)}
        </Text>
      </View>
    </Card>
  );
}
