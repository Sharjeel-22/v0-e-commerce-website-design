"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Minus, Plus, Truck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/breadcrumb"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/db"

export default function ProductDetail({ params }: { params: { id: string } }) {
  // State to track the currently selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingRelated, setIsLoadingRelated] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`)
        }

        const data = await response.json()
        setProduct(data.product)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError(err instanceof Error ? err.message : "Failed to load product")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}/related`)

        if (response.ok) {
          const data = await response.json()
          setRelatedProducts(data.products || [])
        }
      } catch (err) {
        console.error("Error fetching related products:", err)
        // Don't show error for related products, just show empty array
      } finally {
        setIsLoadingRelated(false)
      }
    }

    // Only fetch related products after we have the main product
    if (product) {
      fetchRelatedProducts()
    }
  }, [params.id, product])

  // Handle quantity changes
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Error state
  if (error || !product) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-96">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">{error || "The requested product could not be found."}</p>
            <Link href="/" className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Prepare product images array
  const productImages = [product.image]

  // If we only have one image, duplicate it for the gallery
  if (productImages.length === 1) {
    productImages.push(product.image, product.image, product.image)
  }

  return (
    <>
      <Header />

      {/* Banner */}
      <div className="w-full bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Image
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Gaming Products Banner"
            width={1200}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: product.category, href: `/category/${product.category.toLowerCase()}` },
            { label: product.name, href: "#" },
          ]}
          className="mb-8"
        />

        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 border rounded-md overflow-hidden cursor-pointer ${
                    selectedImageIndex === index ? "border-red-500 border-2" : "hover:border-red-500"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 border rounded-md overflow-hidden">
              <Image
                src={productImages[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews || 0} Reviews)</span>
              <span className="text-sm text-green-500 ml-2">{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold mb-4">
              ${product.price.toFixed(2)}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-gray-500 line-through text-lg ml-2">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.discount && product.discount > 0 && (
                <span className="text-red-500 text-sm ml-2">({product.discount}% off)</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Colors (placeholder) */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Colours:</h3>
              <div className="flex gap-2">
                <button
                  className="w-8 h-8 rounded-full border-2 bg-white border-gray-300"
                  aria-label="Select white color"
                />
                <button
                  className="w-8 h-8 rounded-full border-2 bg-red-500 border-red-500"
                  aria-label="Select red color"
                />
                <button
                  className="w-8 h-8 rounded-full border-2 bg-black border-black"
                  aria-label="Select black color"
                />
              </div>
            </div>

            {/* Sizes (placeholder) */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size:</h3>
              <div className="flex gap-2">
                {["xs", "s", "m", "l", "xl"].map((size) => (
                  <button
                    key={size}
                    className={`w-10 h-10 flex items-center justify-center border rounded-md uppercase ${
                      size === "m" ? "bg-red-500 text-white" : "bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Buy */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-md">
                <button className="px-3 py-2 border-r" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button className="px-3 py-2 border-l" onClick={increaseQuantity} disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button className="bg-red-500 hover:bg-red-600 px-8 py-2" disabled={product.stock === 0}>
                {product.stock === 0 ? "Out of Stock" : "Buy Now"}
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Stock Information */}
            <div className="mb-6 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Stock:</strong> {product.stock} units available
              </p>
              <p className="text-sm text-gray-600">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {product.status}
              </p>
            </div>

            {/* Delivery Info */}
            <div className="border rounded-md divide-y">
              <div className="p-4 flex items-center gap-4">
                <Truck className="h-6 w-6 text-gray-500" />
                <div>
                  <h4 className="font-medium">Free Delivery</h4>
                  <p className="text-sm text-gray-500">Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <RotateCcw className="h-6 w-6 text-gray-500" />
                <div>
                  <h4 className="font-medium">Return Delivery</h4>
                  <p className="text-sm text-gray-500">
                    Free 30 Days Delivery Returns. <span className="underline">Details</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-5 h-10 bg-red-500"></div>
              <h2 className="text-2xl font-bold">Related Items</h2>
            </div>

            {isLoadingRelated ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    id={relatedProduct.id}
                    image={relatedProduct.image}
                    title={relatedProduct.name}
                    originalPrice={relatedProduct.originalPrice || relatedProduct.price}
                    discountedPrice={relatedProduct.price}
                    discount={relatedProduct.discount || 0}
                    rating={relatedProduct.rating || 0}
                    reviews={relatedProduct.reviews || 0}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* No Related Products Message */}
        {!isLoadingRelated && relatedProducts.length === 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-5 h-10 bg-red-500"></div>
              <h2 className="text-2xl font-bold">Related Items</h2>
            </div>
            <div className="text-center py-8 text-gray-500">
              <p>No related products found in the {product.category} category.</p>
              <Link href="/" className="text-red-500 hover:underline mt-2 inline-block">
                Browse all products
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
