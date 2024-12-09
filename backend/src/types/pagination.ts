export type PaginationQuery = {
  page: number;
  limit: number;
  sort: 1 | -1;
  sortBy: string;
};

export type PaginationResponse<T> = {
  data: T[];
  totalCount: number;
} & PaginationQuery;
