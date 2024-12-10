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

export default axiosInstance
