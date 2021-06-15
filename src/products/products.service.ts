import { Schema } from 'mongoose';
import { ProductsRepository } from './products.repository';
import { Injectable } from '@nestjs/common';
import { ProductsDocument } from './model/products.interface';
import { Pagination } from 'src/core/interfaces';
/**
 *
 * @export
 * @class ProductsService
 *
 * @author smpham
 */
@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getById(id: string | Schema.Types.ObjectId): Promise<ProductsDocument> {
    return this.productsRepository.findById({ id: id });
  }

  getByIdAndOnStock(
    id: string | Schema.Types.ObjectId,
  ): Promise<ProductsDocument> {
    return this.productsRepository.findOne({
      conditions: { _id: id, onStock: true },
    });
  }

  getByIdsAndOnStock(
    ids: Array<string | Schema.Types.ObjectId>,
  ): Promise<ProductsDocument[]> {
    return this.productsRepository.findAll({
      conditions: { _id: { $in: [...ids] }, onStock: true },
    });
  }

  getProducts(
    filters,
    { limit, sort, page },
  ): Promise<Pagination<ProductsDocument>> {
    const customizePage = parseInt(page < 0 ? 0 : page);
    const customizeLimit = parseInt(limit < 0 ? 6 : limit);
    return this.productsRepository.paginate({
      conditions: filters ? { ...filters } : {},
      projection: undefined,
      options: undefined,
      populate: undefined,
      sort: sort,
      limit: customizeLimit,
      page: customizePage,
    });
  }
}
