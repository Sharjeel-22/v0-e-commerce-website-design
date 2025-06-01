import { type NextRequest, NextResponse } from "next/server"
import { getAllProducts, getActiveProducts, createProduct, initializeDatabase, testDatabaseConnection } from "@/lib/db"

// Initialize the database with sample data if needed
export async function GET(request: NextRequest) {
  try {
    // Test database connection first
    const isConnected = await testDatabaseConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: "Database connection failed. Please check your environment variables and database configuration." },
        { status: 500 },
      )
    }

    // Initialize database if needed
    await initializeDatabase().catch((error) => {
      console.error("Database initialization error:", error)
    })

    // Check if we should only return active products
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get("activeOnly") === "true"

    // Get products from database
    const products = activeOnly ? await getActiveProducts() : await getAllProducts()

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error("Error in products API route:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.price || !data.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the product in database
    const newProduct = await createProduct({
      name: data.name,
      description: data.description || "",
      image: data.image || "https://via.placeholder.com/400",
      category: data.category,
      price: Number.parseFloat(data.price),
      originalPrice: data.originalPrice ? Number.parseFloat(data.originalPrice) : Number.parseFloat(data.price),
      discount: data.discount ? Number.parseInt(data.discount) : 0,
      stock: Number.parseInt(data.stock) || 0,
      status: data.status || "Active",
      rating: data.rating ? Number.parseFloat(data.rating) : 0,
      reviews: data.reviews ? Number.parseInt(data.reviews) : 0,
    })

    if (!newProduct) {
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    return NextResponse.json({ product: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      {
        error: "Failed to create product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
