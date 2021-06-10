import { Controller, Get } from '@nestjs/common';
import { Pagination } from 'src/core/interfaces';
import { Products } from './model/products.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  async getProducts(): Promise<Pagination<Products>> {
    const products = await this.productsService.getProducts(
      {},
      { limit: 20, sort: 'asc', page: 1 },
    );
    return products;
  }
}
