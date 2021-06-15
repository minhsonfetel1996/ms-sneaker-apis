import { Document, Schema } from 'mongoose';

export interface ProductPrice {
  currentPrice?: string;
  oldPrice?: string;
}

export interface ProductSize {
  size?: string;
  onStock?: boolean;
}

export interface ProductsDocument extends Document {
  id?: string | Schema.Types.ObjectId;
  main_product_id?: string;
  title?: string;
  subTitle?: string;
  category?: string;
  description?: string;
  color_description?: string;
  images?: string[];
  price?: ProductPrice;
  sizes?: ProductSize[];
  color_ways?: string[];
  onStock?: boolean;
}
