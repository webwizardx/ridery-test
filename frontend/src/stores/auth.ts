import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/services/axios'
import { useRouter } from 'vue-router'
import type { LoginResponse, SignupResponse, User } from '@/types/auth'

const useAuthStore = defineStore('auth', () => {
  const localStorageUser = localStorage.getItem('user')
  const router = useRouter()
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(localStorageUser ? JSON.parse(localStorageUser) : { _id: '', email: '' })

  const login = async (payload: {
    email: string
    password: string
  }): Promise<[boolean, string]> => {
    const { data, status } = await axiosInstance.post<LoginResponse>('/login', payload, {
      validateStatus: () => true,
    })
    if (!data || status !== 201) {
      console.warn(`[useAuthStore - login] Error: ${JSON.stringify(data)} - Status: ${status}`)
      return [false, data?.message || 'Ocurrió un error al intentar iniciar sesión']
    }
    setToken(data.data.token)
    setUser(data.data.user)
    return [true, '']
  }

  const logout = () => {
    resetState()
    router.push('/login')
  }

  const resetState = () => {
    user.value = { _id: '', email: '' }
    token.value = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUser = (newUser: User) => {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const signUp = async (payload: {
    email: string
    password: string
  }): Promise<[boolean, string, string[]]> => {
    const { data, status } = await axiosInstance.post<SignupResponse>('/users', payload, {
      validateStatus: () => true,
    })

    if (!data || status !== 201) {
      console.warn(`[useAuthStore - signUp] Error: ${JSON.stringify(data)} - Status: ${status}`)
      let validationErrors: string[] = []
      if (Array.isArray(data?.data)) {
        validationErrors = data.data
          .map((error: Record<string, string>) => Object.values(error))
          .flat()
        console.log(validationErrors)
      }

      return [false, data?.message || 'Ocurrió un error al intentar registrarse', validationErrors]
    }
    return [true, '', []]
  }

  return {
    login,
    logout,
    resetState,
    setToken,
    setUser,
    signUp,
    token,
    user,
  }
})

export default useAuthStore
