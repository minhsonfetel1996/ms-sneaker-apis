import { QueryOptions, Schema } from 'mongoose';

export interface PaginationInput {
  readonly conditions?: object;
  readonly projection?: object | string;
  readonly options?: QueryOptions;
  readonly populate?: string | object;
  readonly sort?: string | object;
  readonly limit?: number;
  readonly page?: number;
}

export interface FindOneInput {
  readonly conditions?: object;
  readonly projection?: object | string;
  readonly options?: QueryOptions;
  readonly populate?: string | object;
}

export interface FindAllInput {
  readonly conditions?: object;
  readonly projection?: object | string;
  readonly options?: QueryOptions;
  readonly populate?: string | object;
  readonly sort?: string | object;
}

export interface FindByIdInput {
  readonly id: string | Schema.Types.ObjectId;
  readonly projection?: object | string;
  readonly options?: QueryOptions;
  readonly populate?: string | object;
}

export interface AggregateInput {
  readonly aggregate: any[] | object;
}

export interface FindByIdAndUpdateInput {
  readonly id: string | Schema.Types.ObjectId;
  readonly update: object;
  readonly options?: object;
}

export interface FindOneAndUpdateInput {
  readonly conditions?: object;
  readonly update: object;
  readonly options?: QueryOptions;
}

export interface UpdateManyInput {
  readonly filter?: object;
  readonly update: object;
  readonly options?: QueryOptions;
}

export interface UpdateInput {
  readonly conditions?: object;
  readonly update: object;
  readonly options?: QueryOptions;
}
