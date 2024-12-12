import type { PaginatedQuery, PaginatedResponse, ResponseWithData } from './api'

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

export enum VehicleStatus {
  AVAILABLE = 'Disponible',
  IN_MAINTENANCE = 'En mantenimiento',
  IN_SERVICE = 'En servicio',
}

export type VehicleQuery = PaginatedQuery &
  Partial<Pick<Vehicle, 'brand' | 'model' | 'status'>> & { search?: string }

export type VehicleResponse = ResponseWithData<Vehicle>
