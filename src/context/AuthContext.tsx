import React, { createContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { parseCookies, setCookie } from 'nookies'

import User from '../interfaces/users/User'
import { api } from '../services/api'
type SignInData = {
  email: string
  password: string
}

type SignInResponseData = {
  token: string
  user: User
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'glads-token': token } = parseCookies()

    if (token) {
      const fetchDataAsync = async () => {
        const { data } = await api.get<User>('/User/RecoverUserInformation')
        setUser(data)
      }
      fetchDataAsync()
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const {
      data: { token, user }
    } = await api.post<SignInResponseData>('Account/Login', {
      email: email,
      password: password
    })

    setCookie(undefined, 'glads-token', token, {
      maxAge: 60 * 60 * 1 // 1 hour
    })
    api.defaults.headers.Authorization = `Bearer ${token}`
    setUser(user)
    Router.push('/ranking')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
