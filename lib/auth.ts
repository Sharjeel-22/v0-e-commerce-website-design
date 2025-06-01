import { executeQuery } from "./db"

// User type
export type User = {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  created_at: string
  updated_at: string
}

// Login credentials type
export type LoginCredentials = {
  email: string
  password: string
}

// Authentication result type
export type AuthResult = {
  success: boolean
  user?: User
  error?: string
}

// Authenticate user with email and password
export const authenticateUser = async (credentials: LoginCredentials): Promise<AuthResult> => {
  try {
    const result = await executeQuery(async (client) => {
      const queryResult = await client.execute({
        sql: "SELECT id, email, name, role, created_at, updated_at FROM users WHERE email = ? AND password = ?",
        args: [credentials.email, credentials.password],
      })
      return queryResult.rows
    })

    if (result.length === 0) {
      return {
        success: false,
        error: "Invalid email or password",
      }
    }

    const userRow = result[0]
    const user: User = {
      id: userRow.id as string,
      email: userRow.email as string,
      name: userRow.name as string,
      role: userRow.role as "admin" | "user",
      created_at: userRow.created_at as string,
      updated_at: userRow.updated_at as string,
    }

    return {
      success: true,
      user,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return {
      success: false,
      error: "Authentication failed. Please try again.",
    }
  }
}

// Get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await executeQuery(async (client) => {
      const queryResult = await client.execute({
        sql: "SELECT id, email, name, role, created_at, updated_at FROM users WHERE email = ?",
        args: [email],
      })
      return queryResult.rows
    })

    if (result.length === 0) {
      return null
    }

    const userRow = result[0]
    return {
      id: userRow.id as string,
      email: userRow.email as string,
      name: userRow.name as string,
      role: userRow.role as "admin" | "user",
      created_at: userRow.created_at as string,
      updated_at: userRow.updated_at as string,
    }
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

// Create new user
export const createUser = async (userData: {
  email: string
  password: string
  name: string
  role?: "admin" | "user"
}): Promise<User | null> => {
  try {
    const id = `user-${Date.now()}`
    const now = new Date().toISOString()

    await executeQuery(async (client) => {
      await client.execute({
        sql: "INSERT INTO users (id, email, password, name, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [id, userData.email, userData.password, userData.name, userData.role || "user", now, now],
      })
    })

    return {
      id,
      email: userData.email,
      name: userData.name,
      role: userData.role || "user",
      created_at: now,
      updated_at: now,
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}
