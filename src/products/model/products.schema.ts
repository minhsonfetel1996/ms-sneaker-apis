import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 *
 * @export
 * @class Products
 *
 * @author smpham
 */
@Schema()
export class Products {
  @Prop({ required: true, unique: true, trim: true })
  main_product_id: string;

  @Prop({ required: true, trim: true, minlength: 3, maxlength: 255 })
  title: string;

  @Prop()
  subTitle: string;

  @Prop({ required: true, trim: true, minlength: 3, maxlength: 255 })
  category: string;

  @Prop({ required: true, trim: true, minlength: 3 })
  description: string;

  @Prop()
  color_description: string;

  @Prop({ required: true })
  images: string[];

  @Prop({ type: Object, required: true })
  price: { currentPrice?: string; oldPrice?: string };

  @Prop({ type: Object, required: true })
  size: [{ size?: string; onStock?: boolean }];

  @Prop()
  color_ways: string[];

  @Prop({ required: true })
  onStock: boolean;

  @Prop({ required: true })
  updatedAt: Date;
}

const ProductsSchema = SchemaFactory.createForClass(Products);

ProductsSchema.index({ name: 'title' }, { weights: { name: 3 } });
ProductsSchema.index({ name: 'subTitle' }, { weights: { name: 3 } });
ProductsSchema.index({ name: 'description' }, { weights: { name: 3 } });
ProductsSchema.index({ name: 'colorDescription' }, { weights: { name: 3 } });
ProductsSchema.index({ name: 'category' }, { weights: { name: 3 } });

export { ProductsSchema };
