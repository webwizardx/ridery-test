import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/services/axios'
import type { PaginatedVehiclesResponse, Vehicle, VehicleQuery } from '@/types/vehicle'
import { getURLSearchParamsByObject } from '@/utils'
import type { PaginatedQuery } from '@/types/api'

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

  return {
    isLoading,
    getVehicles,
    query,
    vehicles,
    totalCount,
  }
})

export default useVehicleStore
