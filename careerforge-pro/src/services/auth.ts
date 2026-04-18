import type { User } from '../types'

const USERS_STORAGE_KEY = 'careerforge-users'
const TOKENS_STORAGE_KEY = 'careerforge-auth-tokens'

interface LoginData {
  email: string
  password: string
}

interface SignupData {
  name: string
  email: string
  password: string
}

interface AuthResponse {
  user: User
  token: string
}

interface StoredUser extends User {
  password: string
}

function generateId() {
  return crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function generateToken() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

function simulateNetwork<T>(value: T, delay = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay))
}

function getUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return []
  }
}

function setUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function getTokenMap(): Record<string, string> {
  const raw = localStorage.getItem(TOKENS_STORAGE_KEY)
  if (!raw) return {}
  try {
    return JSON.parse(raw) as Record<string, string>
  } catch {
    return {}
  }
}

function setTokenMap(map: Record<string, string>) {
  localStorage.setItem(TOKENS_STORAGE_KEY, JSON.stringify(map))
}

function stripPassword(user: StoredUser): User {
  const { password, ...safeUser } = user
  return safeUser
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const users = getUsers()
    const user = users.find((item) => item.email === data.email && item.password === data.password)

    if (!user) {
      return new Promise<AuthResponse>((_, reject) =>
        setTimeout(() => reject(new Error('Invalid email or password')), 600)
      )
    }

    const token = generateToken()
    const tokenMap = getTokenMap()
    tokenMap[token] = user.id
    setTokenMap(tokenMap)

    return simulateNetwork({ user: stripPassword(user), token })
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    const users = getUsers()
    const existingUser = users.some((item) => item.email === data.email)

    if (existingUser) {
      return new Promise<AuthResponse>((_, reject) =>
        setTimeout(() => reject(new Error('Email already in use')), 600)
      )
    }

    const newUser: StoredUser = {
      id: generateId(),
      name: data.name,
      email: data.email,
      password: data.password,
      plan: 'free',
    }

    users.push(newUser)
    setUsers(users)

    const token = generateToken()
    const tokenMap = getTokenMap()
    tokenMap[token] = newUser.id
    setTokenMap(tokenMap)

    return simulateNetwork({ user: stripPassword(newUser), token })
  },

  async me(): Promise<User> {
    const token = localStorage.getItem('token')
    if (!token) {
      return new Promise<User>((_, reject) =>
        setTimeout(() => reject(new Error('No token found')), 600)
      )
    }

    const tokenMap = getTokenMap()
    const userId = tokenMap[token]
    if (!userId) {
      return new Promise<User>((_, reject) =>
        setTimeout(() => reject(new Error('Invalid auth token')), 600)
      )
    }

    const users = getUsers()
    const user = users.find((item) => item.id === userId)
    if (!user) {
      return new Promise<User>((_, reject) =>
        setTimeout(() => reject(new Error('User not found')), 600)
      )
    }

    return simulateNetwork(stripPassword(user))
  },

  logout(): void {
    localStorage.removeItem('token')
  },
}
