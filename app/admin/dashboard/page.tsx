"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DollarSign, TrendingUp, Package, AlertTriangle, ShoppingCart, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DashboardStats {
  totalProducts: number
  lowStockProducts: number
  outOfStockProducts: number
  totalValue: number
  averagePrice: number
  highestPricedProduct: any
  lowestPricedProduct: any
  categoriesCount: number
  productsWithDiscount: number
  averageRating: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    totalValue: 0,
    averagePrice: 0,
    highestPricedProduct: null,
    lowestPricedProduct: null,
    categoriesCount: 0,
    productsWithDiscount: 0,
    averageRating: 0,
  })
  const [recentProducts, setRecentProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        const products = data.products || []

        // Calculate real statistics from database
        const totalProducts = products.length
        const lowStockProducts = products.filter((p: any) => p.stock > 0 && p.stock <= 10).length
        const outOfStockProducts = products.filter((p: any) => p.stock === 0).length
        const totalValue = products.reduce((sum: number, p: any) => sum + p.price * p.stock, 0)
        const averagePrice =
          totalProducts > 0 ? products.reduce((sum: number, p: any) => sum + p.price, 0) / totalProducts : 0

        const sortedByPrice = [...products].sort((a: any, b: any) => b.price - a.price)
        const highestPricedProduct = sortedByPrice[0] || null
        const lowestPricedProduct = sortedByPrice[sortedByPrice.length - 1] || null

        const categories = new Set(products.map((p: any) => p.category).filter(Boolean))
        const categoriesCount = categories.size

        const productsWithDiscount = products.filter((p: any) => p.discount && p.discount > 0).length

        const ratingsSum = products.reduce((sum: number, p: any) => sum + (p.rating || 0), 0)
        const averageRating = totalProducts > 0 ? ratingsSum / totalProducts : 0

        setStats({
          totalProducts,
          lowStockProducts,
          outOfStockProducts,
          totalValue,
          averagePrice,
          highestPricedProduct,
          lowestPricedProduct,
          categoriesCount,
          productsWithDiscount,
          averageRating,
        })

        // Get recent products (last 5 added)
        setRecentProducts(products.slice(-5).reverse())
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError(err instanceof Error ? err.message : "Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Dashboard</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>

      {/* Product Statistics */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Product Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Products</p>
                  <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
                  <p className="text-sm text-blue-500 mt-2">Active inventory</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Low Stock Alert</p>
                  <h3 className="text-2xl font-bold">{stats.lowStockProducts}</h3>
                  <p className="text-sm text-yellow-500 mt-2">≤ 10 items left</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
                  <h3 className="text-2xl font-bold">{stats.outOfStockProducts}</h3>
                  <p className="text-sm text-red-500 mt-2">Needs restocking</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Inventory Value</p>
                  <h3 className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</h3>
                  <p className="text-sm text-green-500 mt-2">Current worth</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Insights */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Product Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Average Price</p>
                  <h3 className="text-2xl font-bold">${stats.averagePrice.toFixed(2)}</h3>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Categories</p>
                  <h3 className="text-2xl font-bold">{stats.categoriesCount}</h3>
                </div>
                <Package className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Products on Sale</p>
                  <h3 className="text-2xl font-bold">{stats.productsWithDiscount}</h3>
                </div>
                <ShoppingCart className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Highest Priced Product */}
        {stats.highestPricedProduct && (
          <Card>
            <CardHeader>
              <CardTitle>Highest Priced Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={stats.highestPricedProduct.image || "/placeholder.svg"}
                  alt={stats.highestPricedProduct.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{stats.highestPricedProduct.name}</h4>
                  <p className="text-2xl font-bold text-green-600">${stats.highestPricedProduct.price}</p>
                  <p className="text-sm text-gray-500">Stock: {stats.highestPricedProduct.stock}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.length > 0 ? (
                recentProducts.slice(0, 3).map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${product.price}</p>
                      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No products added yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/admin/products/add"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-500 transition-colors"
          >
            <h3 className="font-medium mb-2">Add New Product</h3>
            <p className="text-sm text-gray-500">Create and publish a new product</p>
          </Link>

          <Link
            href="/admin/products"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-500 transition-colors"
          >
            <h3 className="font-medium mb-2">Manage Products</h3>
            <p className="text-sm text-gray-500">Edit existing products</p>
          </Link>

          <Link
            href="/admin/inventory"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-500 transition-colors"
          >
            <h3 className="font-medium mb-2">Check Inventory</h3>
            <p className="text-sm text-gray-500">Monitor stock levels</p>
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-500 transition-colors"
          >
            <h3 className="font-medium mb-2">View Analytics</h3>
            <p className="text-sm text-gray-500">Product performance data</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
