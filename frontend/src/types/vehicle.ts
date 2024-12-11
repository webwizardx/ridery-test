import type { PaginatedQuery, PaginatedResponse } from './api'

export type PaginatedVehiclesResponse = PaginatedResponse<Vehicle>

export type Vehicle = {
  _id?: string
  createdBy?: string
  brand: string
  model: string
  status: string
  year: number
  createdAt?: string
  updatedAt?: string
}

export type VehicleQuery = PaginatedQuery &
  Partial<Pick<Vehicle, 'brand' | 'model' | 'status'>> & { search?: string }
