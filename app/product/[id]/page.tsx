"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Minus, Plus, Eye, Truck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/breadcrumb"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProductDetail({ params }: { params: { id: string } }) {
  // State to track the currently selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // This would normally come from a database or API
  const product = {
    id: params.id,
    name: "Havic HV G-92 Gamepad",
    price: 192.0,
    originalPrice: 192.0,
    rating: 5,
    reviews: 150,
    inStock: true,
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    colors: ["white", "red"],
    sizes: ["xs", "s", "m", "l", "xl"],
    images: [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1619&q=80",
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  }

  // Related products
  const relatedProducts = [
    {
      id: "1",
      title: "HAVIT HV-G92 Gamepad",
      image:
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      originalPrice: 160,
      discountedPrice: 120,
      discount: 40,
      rating: 4.8,
      reviews: 88,
    },
    {
      id: "2",
      title: "AK-900 Wired Keyboard",
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      originalPrice: 1160,
      discountedPrice: 960,
      discount: 35,
      rating: 4.5,
      reviews: 75,
    },
    {
      id: "3",
      title: "IPS LCD Gaming Monitor",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      originalPrice: 400,
      discountedPrice: 370,
      discount: 30,
      rating: 4.7,
      reviews: 99,
    },
    {
      id: "4",
      title: "RGB liquid CPU Cooler",
      image:
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      originalPrice: 170,
      discountedPrice: 160,
      discount: 0,
      rating: 4.9,
      reviews: 65,
    },
  ]

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
            { label: "Account", href: "/account" },
            { label: "Gaming", href: "/category/gaming" },
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
              {product.images.map((image, index) => (
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
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
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
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
              <span className="text-sm text-green-500 ml-2">{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Colors */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Colours:</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === "white" ? "bg-white border-gray-300" : `bg-${color}-500 border-${color}-500`
                    }`}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size:</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
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
                <button className="px-3 py-2 border-r">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2">2</span>
                <button className="px-3 py-2 border-l">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button className="bg-red-500 hover:bg-red-600 px-8 py-2">Buy Now</Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
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
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-5 h-10 bg-red-500"></div>
            <h2 className="text-2xl font-bold">Related Item</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="relative group">
                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                    -{product.discount}%
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 shadow-md">
                  <Heart className="h-4 w-4" />
                </button>

                {/* Product Image */}
                <div className="relative bg-gray-100 rounded-lg aspect-square overflow-hidden mb-4">
                  <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />

                  {/* Quick View */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white rounded-full p-2 shadow-md mx-1">
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-center text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform">
                    Add To Cart
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="font-medium mb-1">{product.title}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-500 font-medium">${product.discountedPrice}</span>
                  {product.discount > 0 && (
                    <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
