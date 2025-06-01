import { type NextRequest, NextResponse } from "next/server"
import { getProductsByCategory, getProductById } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // First get the current product to find its category
    const currentProduct = await getProductById(params.id)

    if (!currentProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get products from the same category
    const categoryProducts = await getProductsByCategory(currentProduct.category)

    // Filter out the current product and limit to 4 related products
    const relatedProducts = categoryProducts.filter((product) => product.id !== params.id).slice(0, 4)

    return NextResponse.json({ products: relatedProducts }, { status: 200 })
  } catch (error) {
    console.error("Error fetching related products:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch related products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
