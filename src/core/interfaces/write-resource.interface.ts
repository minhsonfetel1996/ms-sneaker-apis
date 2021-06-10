/* eslint-disable @typescript-eslint/ban-types */
import {
  UpdateInput,
  UpdateManyInput,
  FindByIdAndUpdateInput,
  FindOneAndUpdateInput,
} from './input.interface';

export interface WriteResourceInterface<T> {
  createOne(item: Partial<T>): Promise<T>;

  create(items: Partial<T>[]): Promise<T[]>;

  insertMany(items: T[]): Promise<T[]>;

  updateMany({ filter, update, options }: UpdateManyInput): Promise<any>;

  findByIdAndUpdate({
    id,
    update,
    options,
  }: FindByIdAndUpdateInput): Promise<any>;

  findOneAndUpdate({
    conditions,
    update,
    options,
  }: FindOneAndUpdateInput): Promise<any>;
}
