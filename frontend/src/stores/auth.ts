import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/services/axios'

const useAuthStore = defineStore('auth', () => {
  const localStorageUser = localStorage.getItem('user')
  const user = ref(localStorageUser ? JSON.parse(localStorageUser) : { _id: '', email: '' })
  const token = ref(localStorage.getItem('token') || '')
  const setUser = (newUser: { _id: string; email: string }) => {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const resetState = () => {
    user.value = { _id: '', email: '' }
    token.value = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const login = async (payload: { email: string; password: string }) => {
    const { data, status } = await axiosInstance.post<{
      message: string
      data: {
        token: string
        user: {
          _id: string
          email: string
        }
      }
    }>('/login', payload, { validateStatus: () => true })

    if (!data || status !== 201) {
      console.warn(`[useAuthStore - login] Error: ${JSON.stringify(data)} - Status: ${status}`)
      resetState()
      return false
    }
    setToken(data.data.token)
    setUser(data.data.user)
    return true
  }

  return {
    login,
    resetState,
    setToken,
    setUser,
    token,
    user,
  }
})

export default useAuthStore
