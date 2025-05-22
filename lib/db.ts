import { Pool } from "@neondatabase/serverless"
import { v4 as uuidv4 } from "uuid"

// Initialize the Neon PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

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

// CRUD operations for products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC")
    return result.rows
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id])
    return result.rows[0] || null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export const createProduct = async (
  productData: Omit<Product, "id" | "created_at" | "updated_at">,
): Promise<Product | null> => {
  try {
    const id = uuidv4()
    const now = new Date().toISOString()

    const result = await pool.query(
      `INSERT INTO products (
        id, name, description, image, category, price, 
        originalPrice, discount, stock, status, rating, reviews, 
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
      RETURNING *`,
      [
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
    )

    return result.rows[0]
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
    // Build the SET part of the query dynamically based on provided fields
    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    // Add each field that needs to be updated
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = $${paramIndex}`)
        values.push(value)
        paramIndex++
      }
    })

    // Add updated_at timestamp
    updates.push(`updated_at = $${paramIndex}`)
    values.push(new Date().toISOString())
    paramIndex++

    // Add id as the last parameter
    values.push(id)

    const query = `
      UPDATE products 
      SET ${updates.join(", ")} 
      WHERE id = $${paramIndex} 
      RETURNING *
    `

    const result = await pool.query(query, values)
    return result.rows[0] || null
  } catch (error) {
    console.error("Error updating product:", error)
    return null
  }
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING id", [id])
    return result.rowCount > 0
  } catch (error) {
    console.error("Error deleting product:", error)
    return false
  }
}

// Filter products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const result = await pool.query("SELECT * FROM products WHERE category = $1 ORDER BY created_at DESC", [category])
    return result.rows
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
}

// Get active products only (for client-side)
export const getActiveProducts = async (): Promise<Product[]> => {
  try {
    const result = await pool.query("SELECT * FROM products WHERE status = 'Active' ORDER BY created_at DESC")
    return result.rows
  } catch (error) {
    console.error("Error fetching active products:", error)
    return []
  }
}

// Initialize database with sample data if needed
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Check if products table exists
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'products'
      )
    `)

    // Create table if it doesn't exist
    if (!tableExists.rows[0].exists) {
      await pool.query(`
        CREATE TABLE products (
          id UUID PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          image TEXT,
          category VARCHAR(100),
          price DECIMAL(10, 2) NOT NULL,
          originalPrice DECIMAL(10, 2),
          discount INTEGER,
          stock INTEGER NOT NULL DEFAULT 0,
          status VARCHAR(50) NOT NULL DEFAULT 'Active',
          rating DECIMAL(3, 1),
          reviews INTEGER,
          created_at TIMESTAMP WITH TIME ZONE NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE NOT NULL
        )
      `)
    }

    // Check if we already have products
    const productCount = await pool.query("SELECT COUNT(*) FROM products")

    // If no products exist, add sample data
    if (Number.parseInt(productCount.rows[0].count) === 0) {
      const sampleProducts = [
        {
          id: uuidv4(),
          name: "Havic HV G-92 Gamepad",
          description:
            "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
          image:
            "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          category: "Gaming",
          price: 192.0,
          originalPrice: 192.0,
          stock: 45,
          status: "Active",
          rating: 4.5,
          reviews: 70,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "AK-900 Wired Keyboard",
          description:
            "High-performance gaming keyboard with mechanical switches for precise tactile feedback. RGB backlit keys with customizable lighting effects.",
          image:
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
          category: "Electronics",
          price: 960.0,
          originalPrice: 1160.0,
          discount: 17,
          stock: 32,
          status: "Active",
          rating: 4.5,
          reviews: 49,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "IPS LCD Gaming Monitor",
          description:
            "27-inch IPS LCD gaming monitor with 144Hz refresh rate and 1ms response time. HDR support for vibrant colors and deep blacks.",
          image:
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          category: "Electronics",
          price: 370.0,
          originalPrice: 400.0,
          discount: 8,
          stock: 18,
          status: "Active",
          rating: 4.7,
          reviews: 99,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]

      // Insert sample products
      for (const product of sampleProducts) {
        await pool.query(
          `
          INSERT INTO products (
            id, name, description, image, category, price, 
            originalPrice, discount, stock, status, rating, reviews, 
            created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        `,
          [
            product.id,
            product.name,
            product.description,
            product.image,
            product.category,
            product.price,
            product.originalPrice,
            product.discount,
            product.stock,
            product.status,
            product.rating,
            product.reviews,
            product.created_at,
            product.updated_at,
          ],
        )
      }
    }
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}
