import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use(async (config) => {
  const authStore = (await import('@/stores/auth')).default()

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      console.warn('[axiosInstance] 401 error', response)
      const authStore = (await import('@/stores/auth')).default()
      authStore.logout()
    }
    return response
  },
  async (error) => {
    console.warn('[axiosInstance] 401 error', error)
    if (error.response.status === 401) {
      const authStore = (await import('@/stores/auth')).default()
      authStore.logout()
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
