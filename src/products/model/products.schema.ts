import { Schema } from 'mongoose';

const ProductsSchema = new Schema(
  {
    main_product_id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    subTitle: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    color_description: {
      type: String,
      trim: true,
    },
    images: {
      type: Array,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    color_ways: {
      type: Array,
    },
    onStock: {
      type: Boolean,
      required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true },
);

ProductsSchema.index({ name: 'title' }, { weights: { name: 3 } });
ProductsSchema.index({ name: 'subTitle' }, { weights: { name: 3 } });
ProductsSchema.index({ name: 'description' }, { weights: { name: 3 } });
ProductsSchema.index({ name: 'colorDescription' }, { weights: { name: 3 } });
ProductsSchema.index({ name: 'category' }, { weights: { name: 3 } });

export { ProductsSchema };
