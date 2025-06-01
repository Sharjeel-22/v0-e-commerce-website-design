import { createClient } from "@libsql/client"
import { v4 as uuidv4 } from "uuid"

// Initialize the Turso client
let client: ReturnType<typeof createClient> | null = null

// Get a database client with better error handling
const getClient = () => {
  if (!client) {
    // Check if Turso credentials are available
    const dbUrl = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN

    if (!dbUrl || !authToken) {
      console.error("Missing Turso credentials:", {
        TURSO_DATABASE_URL: dbUrl ? "Present" : "Missing",
        TURSO_AUTH_TOKEN: authToken ? "Present" : "Missing",
      })
      throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables are required")
    }

    try {
      client = createClient({
        url: dbUrl,
        authToken: authToken,
      })
      console.log("Turso client initialized successfully")
    } catch (error) {
      console.error("Failed to create Turso client:", error)
      throw error
    }
  }
  return client
}

// Define Product type
export type Product = {
  id: string
  name: string
  description: string
  image: string
  category: string
  price: number
  originalPrice?: number
  discount?: number
  stock: number
  status: "Active" | "Draft" | "Out of Stock"
  rating?: number
  reviews?: number
  created_at: string
  updated_at: string
}

// Helper function to convert database row to Product type
const formatProduct = (row: any): Product => {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    image: row.image,
    category: row.category,
    price: typeof row.price === "string" ? Number.parseFloat(row.price) : row.price,
    originalPrice: row.original_price
      ? typeof row.original_price === "string"
        ? Number.parseFloat(row.original_price)
        : row.original_price
      : undefined,
    discount: row.discount
      ? typeof row.discount === "string"
        ? Number.parseInt(row.discount)
        : row.discount
      : undefined,
    stock: typeof row.stock === "string" ? Number.parseInt(row.stock) : row.stock,
    status: row.status,
    rating: row.rating ? (typeof row.rating === "string" ? Number.parseFloat(row.rating) : row.rating) : undefined,
    reviews: row.reviews ? (typeof row.reviews === "string" ? Number.parseInt(row.reviews) : row.reviews) : undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

// Helper function to execute database queries with proper error handling
export async function executeQuery<T>(queryFn: (client: ReturnType<typeof createClient>) => Promise<T>): Promise<T> {
  try {
    const dbClient = getClient()
    return await queryFn(dbClient)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// CRUD operations for products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await executeQuery(async (client) => {
      const result = await client.execute("SELECT * FROM products ORDER BY created_at DESC")
      return result.rows.map((row) => formatProduct(row))
    })
  } catch (error) {
    console.error("Error fetching all products:", error)
    return []
  }
}

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    return await executeQuery(async (client) => {
      const result = await client.execute({
        sql: "SELECT * FROM products WHERE id = ?",
        args: [id],
      })
      return result.rows.length > 0 ? formatProduct(result.rows[0]) : null
    })
  } catch (error) {
    console.error("Error fetching product by ID:", error)
    return null
  }
}

export const createProduct = async (
  productData: Omit<Product, "id" | "created_at" | "updated_at">,
): Promise<Product | null> => {
  try {
    return await executeQuery(async (client) => {
      const id = uuidv4()
      const now = new Date().toISOString()

      await client.execute({
        sql: `INSERT INTO products (
          id, name, description, image, category, price, 
          original_price, discount, stock, status, rating, reviews, 
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          productData.name,
          productData.description,
          productData.image,
          productData.category,
          productData.price,
          productData.originalPrice || productData.price,
          productData.discount || 0,
          productData.stock,
          productData.status,
          productData.rating || 0,
          productData.reviews || 0,
          now,
          now,
        ],
      })

      // Fetch the created product
      const result = await client.execute({
        sql: "SELECT * FROM products WHERE id = ?",
        args: [id],
      })

      return result.rows.length > 0 ? formatProduct(result.rows[0]) : null
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return null
  }
}

export const updateProduct = async (
  id: string,
  productData: Partial<Omit<Product, "id" | "created_at" | "updated_at">>,
): Promise<Product | null> => {
  try {
    return await executeQuery(async (client) => {
      // Build the SET part of the query dynamically based on provided fields
      const updates: string[] = []
      const values: any[] = []

      // Add each field that needs to be updated
      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined) {
          // Convert camelCase to snake_case for database columns
          const dbKey = key === "originalPrice" ? "original_price" : key.toLowerCase()
          updates.push(`${dbKey} = ?`)
          values.push(value)
        }
      })

      // Add updated_at timestamp
      updates.push("updated_at = ?")
      values.push(new Date().toISOString())

      // Add id as the last parameter
      values.push(id)

      const sql = `UPDATE products SET ${updates.join(", ")} WHERE id = ?`

      await client.execute({
        sql,
        args: values,
      })

      // Fetch the updated product
      const result = await client.execute({
        sql: "SELECT * FROM products WHERE id = ?",
        args: [id],
      })

      return result.rows.length > 0 ? formatProduct(result.rows[0]) : null
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return null
  }
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    return await executeQuery(async (client) => {
      const result = await client.execute({
        sql: "DELETE FROM products WHERE id = ?",
        args: [id],
      })
      return result.rowsAffected > 0
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    return false
  }
}

// Filter products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    return await executeQuery(async (client) => {
      const result = await client.execute({
        sql: "SELECT * FROM products WHERE category = ? ORDER BY created_at DESC",
        args: [category],
      })
      return result.rows.map((row) => formatProduct(row))
    })
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
}

// Get active products only (for client-side)
export const getActiveProducts = async (): Promise<Product[]> => {
  try {
    return await executeQuery(async (client) => {
      const result = await client.execute({
        sql: "SELECT * FROM products WHERE status = ? ORDER BY created_at DESC",
        args: ["Active"],
      })
      return result.rows.map((row) => formatProduct(row))
    })
  } catch (error) {
    console.error("Error fetching active products:", error)
    return []
  }
}

// Initialize database - ONLY creates the table structure, NO sample products
export const initializeDatabase = async (): Promise<void> => {
  try {
    await executeQuery(async (client) => {
      // Create products table if it doesn't exist
      await client.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          image TEXT,
          category TEXT,
          price REAL NOT NULL,
          original_price REAL,
          discount INTEGER,
          stock INTEGER NOT NULL DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'Active',
          rating REAL,
          reviews INTEGER,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
      `)

      console.log("Database table structure initialized successfully")
    })
  } catch (error) {
    console.error("Error initializing database:", error)
    throw error
  }
}

// Test database connection with detailed logging
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    console.log("Testing database connection...")
    await executeQuery(async (client) => {
      const result = await client.execute("SELECT 1 as test")
      console.log("Database connection test successful:", result.rows)
    })
    return true
  } catch (error) {
    console.error("Database connection test failed:", error)
    return false
  }
}

// Clear all products from database
export const clearAllProducts = async (): Promise<boolean> => {
  try {
    return await executeQuery(async (client) => {
      const result = await client.execute("DELETE FROM products")
      return result.rowsAffected > 0
    })
  } catch (error) {
    console.error("Error clearing products:", error)
    return false
  }
}
