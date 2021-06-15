import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './model/products.schema';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

/**
 *
 * @export
 * @class Products
 *
 * @author smpham
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
  providers: [ProductsRepository, ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
