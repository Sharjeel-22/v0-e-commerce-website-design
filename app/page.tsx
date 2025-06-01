"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import CategorySection from "@/components/category-section"
import type { Product } from "@/lib/db"
import CountdownTimer from "@/components/countdown-timer"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([])

  // Fetch all products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`)
        }

        const data = await response.json()
        const allProducts = data.products || []

        setProducts(allProducts)

        // Only set sections if we have real products from database
        if (allProducts.length > 0) {
          // Set featured products (products with discounts > 0)
          const discountedProducts = allProducts.filter((product) => product.discount && product.discount > 0)
          setFeaturedProducts(discountedProducts.slice(0, 8))

          // Set best selling products (products with rating > 4.0)
          const bestSelling = allProducts
            .filter((product) => product.rating && product.rating >= 4.0)
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 4)
          setBestSellingProducts(bestSelling)
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        setError(err instanceof Error ? err.message : "Failed to load products")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="flex flex-col items-center justify-center h-96">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Products</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600">
              Try Again
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Show message if no products exist
  if (products.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="flex flex-col items-center justify-center h-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products Available</h2>
            <p className="text-gray-600 mb-6">Please add some products to your store to get started.</p>
            <Link href="/admin/products/add">
              <Button className="bg-red-500 hover:bg-red-600">Add Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main>
        {/* Dynamic Hero Section - Only show if we have products */}
        {products.length > 0 && (
          <section className="bg-black text-white">
            <div className="container mx-auto px-4 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome to Our Store</h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Discover amazing products with great deals and fast delivery
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-white border-b border-gray-300 pb-1 hover:border-white transition-colors"
                  >
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative">
                  {products[0]?.image && (
                    <Image
                      src={products[0].image || "/placeholder.svg"}
                      alt={products[0].name}
                      width={496}
                      height={352}
                      className="w-full h-auto rounded-lg"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Flash Sales Section - Only show if we have discounted products from database */}
        {featuredProducts.length > 0 && (
          <section className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-5 h-10 bg-red-500"></div>
              <h2 className="text-red-500 font-semibold">Today's</h2>
            </div>

            <div className="flex items-end gap-8 mb-8">
              <h3 className="text-3xl font-bold">Flash Sales</h3>
              <CountdownTimer />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.name}
                  originalPrice={product.originalPrice || product.price}
                  discountedPrice={product.price}
                  discount={product.discount || 0}
                  rating={product.rating || 0}
                  reviews={product.reviews || 0}
                />
              ))}
            </div>

            <div className="text-center">
              <Link href="/products">
                <Button className="bg-red-500 hover:bg-red-600 px-8 py-3">View All Products</Button>
              </Link>
            </div>
          </section>
        )}

        {/* Categories Section */}
        <CategorySection />

        {/* Best Selling Products - Only show if we have highly rated products from database */}
        {bestSellingProducts.length > 0 && (
          <section className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-5 h-10 bg-red-500"></div>
              <h2 className="text-red-500 font-semibold">This Month</h2>
            </div>

            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold">Best Selling Products</h3>
              <Link href="/products">
                <Button className="bg-red-500 hover:bg-red-600">View All</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.name}
                  originalPrice={product.originalPrice || product.price}
                  discountedPrice={product.price}
                  discount={product.discount || 0}
                  rating={product.rating || 0}
                  reviews={product.reviews || 0}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products Section - Show all products from database */}
        {products.length > 0 && (
          <section className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-5 h-10 bg-red-500"></div>
              <h2 className="text-red-500 font-semibold">Our Products</h2>
            </div>

            <h3 className="text-3xl font-bold mb-8">All Products</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.name}
                  originalPrice={product.originalPrice || product.price}
                  discountedPrice={product.price}
                  discount={product.discount || 0}
                  rating={product.rating || 0}
                  reviews={product.reviews || 0}
                />
              ))}
            </div>

            {products.length > 8 && (
              <div className="text-center">
                <Link href="/products">
                  <Button className="bg-red-500 hover:bg-red-600 px-8 py-3">View All Products</Button>
                </Link>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
