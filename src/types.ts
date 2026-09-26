/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BrandType =
  | 'Yamaha' | 'Suzuki' | 'Honda' | 'Mercury' | 'Tohatsu'
  | 'Torqeedo' | 'ePropulsion' | 'Minn Kota' | 'TEMO France'
  | 'Haswing' | 'Blade Electric' | 'Solas' | 'Universal';

export type CategoryType =
  | 'portable'
  | 'mid-range'
  | 'high-horsepower'
  | 'two-stroke'
  | 'four-stroke'
  | 'electric'
  | 'trolling'
  | 'parts';

export interface Product {
  id: string;
  name: string;
  brand: BrandType;
  slug: string;
  sku?: string;
  badge?: string;
  category: CategoryType[];
  subcategories?: string[];
  powerHp: number; // Horsepower equivalent
  powerKw?: number; // For electric motors
  engineType: '4-Stroke' | '2-Stroke' | 'Electric';
  priceGbp: number;
  weightKg: number;
  shaftLengths: string[]; // e.g. ["Short (S)", "Long (L)"]
  starter: 'Manual' | 'Electric' | 'Electric/Manual';
  control: 'Tiller' | 'Remote' | 'Tiller/Remote';
  fuelSystem: 'Carburettor' | 'Electronic Fuel Injection (EFI)' | 'Battery Direct' | 'External Tank';
  stockStatus: 'In Stock' | '2-3 Days Delivery' | 'Special Order' | 'Out of Stock';
  isFeatured: boolean;
  imageUrl: string;
  images?: string[];
  description: string;
  features: string[];
  applications: string[];
  specs: {
    displacementHex?: string; // e.g., "139 cc"
    cylinders?: string; // e.g., "1 Cylinder"
    fullThrottleRange?: string; // e.g., "4500-5500 RPM"
    alternatorOutput?: string; // e.g., "12V 6A"
    fuelCapacityLitres?: string; // e.g., "1.1L Integrated or External"
    propellerIncluded?: boolean;
    noiseDb?: string;
    warrantyYears: number; // UK Warranty
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  category?: 'delivery' | 'international' | 'service' | 'quality' | 'post-purchase' | 'general';
  location?: string;
  purchasedItem?: string;
  merchantReply?: {
    date: string;
    message: string;
    author: string;
  };
  helpfulCount?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  funnelPosition: 'Top' | 'Middle' | 'Bottom';
  contentType: string;
  publishDate: string;
  bodyHtml: string;
  relatedCategorySlugs: string[];
  relatedPostSlugs?: string[];
  faq?: { question: string; answer: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShaft: string;
}

export interface SearchFilters {
  searchQuery: string;
  brands: BrandType[];
  categories: CategoryType[];
  engineTypes: ('4-Stroke' | '2-Stroke' | 'Electric')[];
  minPrice: number;
  maxPrice: number;
  minPowerHp: number;
  maxPowerHp: number;
  shaftLengths: string[];
  stockOnly: boolean;
}

export interface CompareList {
  products: Product[];
}

export interface FinancePlan {
  productPrice: number;
  depositGbp: number;
  termMonths: 12 | 24 | 36 | 48 | 60;
  aprPercent: number; // e.g., 9.9
  monthlyPaymentGbp: number;
  totalPayableGbp: number;
  totalInterestGbp: number;
}
