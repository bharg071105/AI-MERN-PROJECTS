import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { User } from '../types'
import { authService } from '../services/auth'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await authService.me()
          setUser(userData)
        } catch (error) {
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setIsLoading(false)
    }
    initAuth()
  }, [token])

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    localStorage.setItem('token', response.token)
    setToken(response.token)
    setUser(response.user)
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const response = await authService.signup({ name, email, password })
    localStorage.setItem('token', response.token)
    setToken(response.token)
    setUser(response.user)
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
