export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  image: string;
  gallery?: string[];
  price: number;
  variants?: ProductVariant[];
  tags: string[];
  printifyProductId?: string;
}

export interface CartLine {
  slug: string;
  variantId?: string;
  quantity: number;
}
