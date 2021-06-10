/* eslint-disable @typescript-eslint/ban-types */
import { Document, Model } from 'mongoose';
import {
  AggregateInput,
  FindAllInput,
  FindByIdAndUpdateInput,
  FindByIdInput,
  FindOneAndUpdateInput,
  FindOneInput,
  Pagination,
  PaginationInput,
  ReadResourceInterface,
  UpdateManyInput,
  WriteResourceInterface,
} from '../interfaces';

export class BaseRepository<T extends Document>
  implements ReadResourceInterface<T>, WriteResourceInterface<T>
{
  private model: Model<T>;
  private readonly PAGINATION_MAX = 20;

  constructor(schemaModel: Model<T>) {
    this.model = schemaModel;
  }
  findOne({
    conditions,
    projection,
    options,
    populate,
  }: FindOneInput): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.model
        .findOne(conditions, projection, options)
        .populate(populate || '')
        .then((data) => resolve(data as T))
        .catch((e) => reject(e));
    });
  }

  findAll({
    conditions,
    projection,
    options,
    populate,
    sort,
  }: FindAllInput): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.model
        .find(conditions, projection, options)
        .populate(populate || '')
        .sort(sort)
        .then((data) => resolve(data as T[]))
        .catch((e) => reject(e));
    });
  }
  findById({ id, projection, options, populate }: FindByIdInput): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model
        .findById(id, projection, options)
        .populate(populate || '')
        .then((data) => resolve(data as T))
        .catch((e) => reject(e));
    });
  }
  paginate({
    conditions,
    projection,
    options,
    populate,
    sort,
    limit,
    page,
  }: PaginationInput): Promise<Pagination<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const limitPaginate: number =
          limit && !isNaN(limit) && Number(limit) >= 0
            ? limit > this.PAGINATION_MAX
              ? this.PAGINATION_MAX
              : Number(limit)
            : this.PAGINATION_MAX;

        const pagePaginate: number =
          page && isNaN(limit) && Number(page) > 0 ? Number(page) : 1;

        const promises = await Promise.all([
          this.model.countDocuments(conditions),
          this.model
            .find(conditions, projection, options)
            .populate(populate || '')
            .sort(sort)
            .skip((pagePaginate - 1) * limitPaginate)
            .limit(limitPaginate)
            .lean(),
        ]);

        const total: number = promises[0];
        const pages: number = Math.ceil(Number(total) / limitPaginate);

        const paginate: Pagination<T> = {
          data: promises[1] as unknown as T[],
          limit: limitPaginate,
          total,
          page: pagePaginate,
          pages,
        };
        resolve(paginate);
      } catch (e) {
        reject(e);
      }
    });
  }

  aggregate({ aggregate }: AggregateInput): Promise<any> {
    return new Promise((resolve, reject) => {
      this.model
        .aggregate(Array.isArray(aggregate) ? aggregate : [aggregate])
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    });
  }

  // write
  createOne(item: Partial<T>): Promise<T> {
    return this.model.create(item);
  }

  create(items: Partial<T>[]): Promise<T[]> {
    return this.model.create(items);
  }

  insertMany(items?: T[], options?: object): Promise<T[]> {
    return this.model.insertMany(items, options);
  }

  updateMany({ filter, update, options }: UpdateManyInput): Promise<any> {
    return new Promise((resolve, reject) => {
      this.model
        .update(filter, update, options)
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    });
  }

  findByIdAndUpdate({
    id,
    update,
    options,
  }: FindByIdAndUpdateInput): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndUpdate(id, update, options, (err, doc) => {
        if (err) {
          return reject(err);
        }
        return resolve(doc as T);
      });
    });
  }

  findOneAndUpdate({
    conditions,
    update,
    options,
  }: FindOneAndUpdateInput): Promise<any> {
    return new Promise((resolve, reject) => {
      this.model
        .update(conditions, update, options)
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    });
  }
}
