export type PaginationQuery = {
  page: number;
  limit: number;
  sort: 1 | -1;
  sortBy: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  totalCount: number;
} & PaginationQuery;
