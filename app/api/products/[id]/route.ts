import { type NextRequest, NextResponse } from "next/server"
import { getProductById, updateProduct, deleteProduct } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await getProductById(params.id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    // Update the product
    const updatedProduct = await updateProduct(params.id, {
      name: data.name,
      description: data.description,
      image: data.image,
      category: data.category,
      price: data.price !== undefined ? Number.parseFloat(data.price) : undefined,
      originalPrice: data.originalPrice !== undefined ? Number.parseFloat(data.originalPrice) : undefined,
      discount: data.discount !== undefined ? Number.parseInt(data.discount) : undefined,
      stock: data.stock !== undefined ? Number.parseInt(data.stock) : undefined,
      status: data.status,
      rating: data.rating !== undefined ? Number.parseFloat(data.rating) : undefined,
      reviews: data.reviews !== undefined ? Number.parseInt(data.reviews) : undefined,
    })

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ product: updatedProduct }, { status: 200 })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      {
        error: "Failed to update product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteProduct(params.id)

    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      {
        error: "Failed to delete product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
