import { Products } from './model/products.interface';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/BaseRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsRepository extends BaseRepository<Products> {
  constructor(@InjectModel('Products') readonly productsModel: Model<Products>) {
    super(productsModel);
  }
}
