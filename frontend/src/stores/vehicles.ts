import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/services/axios'
import type {
  PaginatedVehiclesResponse,
  Vehicle,
  VehicleQuery,
  VehicleResponse,
} from '@/types/vehicle'
import { getURLSearchParamsByObject } from '@/utils'
import type { PaginatedQuery, Response } from '@/types/api'

const useVehicleStore = defineStore('vehicle', () => {
  const defaultQuery: PaginatedQuery = {
    page: 1,
    limit: 10,
    sort: -1,
    sortBy: 'createdAt',
  }
  const query = reactive<VehicleQuery>({
    ...defaultQuery,
    brand: '',
    model: '',
    status: '',
    search: '',
  })
  const isLoading = ref(false)
  const vehicle = ref<Vehicle | null>(null)
  const vehicles = ref<Vehicle[]>([])
  const totalCount = ref(0)

  const getVehicles = async (query?: VehicleQuery): Promise<PaginatedVehiclesResponse> => {
    isLoading.value = true
    const params = getURLSearchParamsByObject({ ...defaultQuery, ...query })
    const { data, status } = await axiosInstance.get<PaginatedVehiclesResponse>(
      `/vehicles?${params}`,
      {
        validateStatus: () => true,
      },
    )

    if (!data || status < 200 || status >= 300) {
      console.warn(
        `[useVehicleStore - getVehicles] Error: ${JSON.stringify(data)} - Status: ${status}`,
      )
      isLoading.value = false
      totalCount.value = 0
      return {
        data: [],
        limit: 0,
        page: 1,
        sort: -1,
        sortBy: 'createdAt',
        totalCount: 0,
      }
    }

    isLoading.value = false
    vehicles.value = data.data
    totalCount.value = data.totalCount
    return data
  }

  const getVehicle = async (_id: string): Promise<VehicleResponse | null> => {
    isLoading.value = true
    const { data, status } = await axiosInstance.get<VehicleResponse>(`/vehicles/${_id}`, {
      validateStatus: () => true,
    })

    if (!data || status < 200 || status >= 300) {
      console.warn(
        `[useVehicleStore - getVehicle] Error: ${JSON.stringify(data)} - Status: ${status}`,
      )
      isLoading.value = false
      return null
    }

    isLoading.value = false
    vehicle.value = data.data
    return data
  }

  const createVehicle = async (vehicle: Vehicle): Promise<[VehicleResponse, string | null]> => {
    isLoading.value = true
    const { data, status } = await axiosInstance.post<VehicleResponse>('/vehicles', vehicle, {
      validateStatus: () => true,
    })

    if (!data || status < 200 || status >= 300) {
      console.warn(
        `[useVehicleStore - createVehicle] Error: ${JSON.stringify(data)} - Status: ${status}`,
      )
      isLoading.value = false
      return [data, 'Ha ocurrido un error al crear el vehículo']
    }

    isLoading.value = false
    return [data, null]
  }

  const updateVehicle = async (
    _id: string,
    vehicle: Vehicle,
  ): Promise<[VehicleResponse, string | null]> => {
    isLoading.value = true
    const { data, status } = await axiosInstance.put<VehicleResponse>(`/vehicles/${_id}`, vehicle, {
      validateStatus: () => true,
    })

    if (!data || status < 200 || status >= 300) {
      console.warn(
        `[useVehicleStore - updateVehicle] Error: ${JSON.stringify(data)} - Status: ${status}`,
      )
      isLoading.value = false
      return [data, 'Ha ocurrido un error al actualizar el vehículo']
    }

    isLoading.value = false
    return [data, null]
  }

  const patchVehicle = async (
    _id: string,
    vehicle: Partial<Vehicle>,
  ): Promise<[VehicleResponse, string | null]> => {
    isLoading.value = true
    const { data, status } = await axiosInstance.patch<VehicleResponse>(
      `/vehicles/${_id}`,
      vehicle,
      {
        validateStatus: () => true,
      },
    )

    if (!data || status < 200 || status >= 300) {
      console.warn(
        `[useVehicleStore - patchVehicle] Error: ${JSON.stringify(data)} - Status: ${status}`,
      )
      isLoading.value = false
      return [data, 'Ha ocurrido un error al actualizar el vehículo']
    }

    isLoading.value = false
    return [data, null]
  }

  const deleteVehicle = async (_id: string): Promise<[Response, string | null]> => {
    isLoading.value = true
    const { data, status } = await axiosInstance.delete<Response>(`/vehicles/${_id}`, {
      validateStatus: () => true,
    })

    if (!data || status < 200 || status >= 300) {
      console.warn(
        `[useVehicleStore - deleteVehicle] Error: ${JSON.stringify(data)} - Status: ${status}`,
      )
      isLoading.value = false
      return [data, 'Ha ocurrido un error al eliminar el vehículo']
    }

    isLoading.value = false
    return [data, null]
  }

  return {
    createVehicle,
    deleteVehicle,
    getVehicle,
    getVehicles,
    updateVehicle,
    patchVehicle,
    isLoading,
    query,
    vehicles,
    totalCount,
  }
})

export default useVehicleStore
