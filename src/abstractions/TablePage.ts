import { CancelTokenSource } from "axios";

export interface PagerReq {
  readonly page: number;
  readonly pageSize: number;
}

export interface PagerRes<T> {
  readonly results: T[];
  readonly totalResults: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export interface PageModel {
  readonly page: number;
  readonly pageSize: number;
}

export interface PageState<T, G> {
  readonly res: PagerRes<T>;
  readonly pageModel: PageModel;
  readonly loading: boolean;
  readonly source?: CancelTokenSource;
  readonly updatePageModel: (pageModel: PageModel) => void;
  readonly update: (req: G) => Promise<PagerRes<T>>;
}