import type { ResponseWithData } from './api'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = ResponseWithData<{ token: string; user: User }>
export type SignupResponse = ResponseWithData<{ user: User }>

export type User = {
  _id: string
  email: string
}
