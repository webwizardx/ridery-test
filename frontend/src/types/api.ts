export type Response = {
  message: string
}

export type ResponseWithData<T> = {
  data: T
  message: string
}

export type PaginatedQuery = {
  page: number
  limit: number
  sort: 1 | -1
  sortBy: string
}

export type PaginatedResponse<T> = {
  data: T[]
  totalCount: number
} & PaginatedQuery
