export type ProductCategory = 'lunettes-de-vue' | 'lunettes-de-soleil' | 'lentilles';

export interface ProductCategoryInfo {
  id: ProductCategory;
  label: string;
  description: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: ProductCategory;
  description: string;
  /** Placeholder for a future real product photo — mock UI renders a category icon instead. */
  image?: string;
  /** A "starting from" figure, never a guaranteed final price (mutuelle/coverage isn't modeled here). */
  indicativePrice: number;
  tags?: string[];
  /** References existing Store ids — no separate store data is kept here. */
  availableStoreIds: string[];
}
