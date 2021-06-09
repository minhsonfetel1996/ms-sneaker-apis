/* eslint-disable @typescript-eslint/ban-types */
import {
  UpdateInput,
  UpdateManyInput,
  FindByIdAndUpdateInput,
  FindOneAndUpdateInput,
} from './input.interface';

export interface WriteResourceInterface<T> {
  create(item: Partial<T>[], options?: object): Promise<T[]>;
  insertMany(items: T[]): Promise<T[]>;
  update({ conditions, update, options }: UpdateInput): Promise<any>;
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
