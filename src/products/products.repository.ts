import { ProductsDocument } from './model/products.interface';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/BaseRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
/**
 *
 * @export
 * @class ProductsRepository
 *
 * @author smpham
 */
@Injectable()
export class ProductsRepository extends BaseRepository<ProductsDocument> {
  constructor(
    @InjectModel('Products') readonly productsModel: Model<ProductsDocument>,
  ) {
    super(productsModel);
  }
}
