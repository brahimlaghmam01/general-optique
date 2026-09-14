import type { Product, ProductCategoryInfo } from '@/types/product';

export const mockProductCategories: ProductCategoryInfo[] = [
  {
    id: 'lunettes-de-vue',
    label: 'Lunettes de vue',
    description: 'Montures et verres correcteurs',
  },
  {
    id: 'lunettes-de-soleil',
    label: 'Lunettes de soleil',
    description: 'Protection solaire & style',
  },
  {
    id: 'lentilles',
    label: 'Lentilles',
    description: 'Confort quotidien & renouvellement',
  },
];

/** Curated, not exhaustive — Boutique is an editorial selection, not a full catalog. */
export const mockProducts: Product[] = [
  {
    id: 'prod_rayban_rx5154',
    brand: 'Ray-Ban',
    name: 'RX5154 Clubmaster Optics',
    category: 'lunettes-de-vue',
    description: 'Monture acétate intemporelle, verres correcteurs sur mesure.',
    indicativePrice: 179,
    tags: ['Nouveau'],
    availableStoreIds: ['store_nice_massena', 'store_nice_jean_medecin'],
  },
  {
    id: 'prod_persol_po3007v',
    brand: 'Persol',
    name: 'PO3007V',
    category: 'lunettes-de-vue',
    description: 'Charnières flex Meflecto, fabrication italienne artisanale.',
    indicativePrice: 219,
    availableStoreIds: ['store_nice_massena'],
  },
  {
    id: 'prod_rayban_rb2140',
    brand: 'Ray-Ban',
    name: 'RB2140 Wayfarer Classic',
    category: 'lunettes-de-soleil',
    description: "L'icône intemporelle, verres polarisés en option.",
    indicativePrice: 149,
    availableStoreIds: ['store_nice_massena', 'store_nice_jean_medecin'],
  },
  {
    id: 'prod_persol_po0714',
    brand: 'Persol',
    name: 'PO0714 Steve McQueen',
    category: 'lunettes-de-soleil',
    description: 'Monture pliable culte, verres polarisés Persol.',
    indicativePrice: 259,
    tags: ['Nouveau'],
    availableStoreIds: ['store_nice_massena'],
  },
  {
    id: 'prod_oakley_holbrook',
    brand: 'Oakley',
    name: 'Holbrook',
    category: 'lunettes-de-soleil',
    description: 'Verres Prizm haute définition, monture sport premium.',
    indicativePrice: 139,
    availableStoreIds: ['store_nice_jean_medecin'],
  },
  {
    id: 'prod_acuvue_oasys_bimensuelles',
    brand: 'Acuvue',
    name: 'Oasys Bimensuelles',
    category: 'lentilles',
    description: 'Technologie Hydraclear Plus, confort longue durée.',
    indicativePrice: 33,
    availableStoreIds: ['store_nice_massena', 'store_nice_jean_medecin'],
  },
  {
    id: 'prod_biofinity_mensuelles',
    brand: 'Biofinity',
    name: 'Mensuelles',
    category: 'lentilles',
    description: 'Silicone hydrogel, oxygénation optimale de la cornée.',
    indicativePrice: 30,
    availableStoreIds: ['store_nice_massena'],
  },
];
