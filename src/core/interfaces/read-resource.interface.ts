import {
  AggregateInput,
  FindAllInput,
  FindByIdInput,
  FindOneInput,
  PaginationInput,
} from './input.interface';
import { Pagination } from './pagination.interface';

export interface ReadResourceInterface<T> {
  findOne({
    conditions,
    projection,
    options,
    populate,
  }: FindOneInput): Promise<T>;

  findAll({
    conditions,
    projection,
    options,
    populate,
    sort,
  }: FindAllInput): Promise<T[]>;

  findById({ id, projection, options, populate }: FindByIdInput): Promise<T>;

  paginate({
    conditions,
    projection,
    options,
    populate,
    sort,
    limit,
    page,
  }: PaginationInput): Promise<Pagination<T>>;

  aggregate({ aggregate }: AggregateInput): Promise<any>;
}
