"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye } from "lucide-react"

interface ProductCardProps {
  image: string
  title: string
  originalPrice: number | string
  discountedPrice: number | string
  discount: number
  rating: number
  reviews: number
  isNew?: boolean
  colors?: string[]
  id?: string
}

export default function ProductCard({
  image,
  title,
  originalPrice,
  discountedPrice,
  discount,
  rating,
  reviews,
  isNew = false,
  colors = [],
  id = "1",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Ensure prices are numbers before using toFixed
  const originalPriceNum = typeof originalPrice === "string" ? Number.parseFloat(originalPrice) : originalPrice
  const discountedPriceNum = typeof discountedPrice === "string" ? Number.parseFloat(discountedPrice) : discountedPrice

  return (
    <Link href={`/product/${id}`} className="block">
      <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
            -{discount}%
          </div>
        )}

        {/* New Badge */}
        {isNew && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
            NEW
          </div>
        )}

        {/* Product Image */}
        <div className="relative bg-gray-100 rounded-lg aspect-square overflow-hidden mb-4">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain p-4" />

          {/* Quick Actions */}
          <div
            className={`absolute inset-0 bg-black/5 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsFavorite(!isFavorite)
              }}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-center text-sm font-medium transition-transform duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.preventDefault()}
          >
            Add to Cart
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-500 font-medium">${discountedPriceNum.toFixed(2)}</span>
            {discount > 0 && <span className="text-gray-500 line-through text-sm">${originalPriceNum.toFixed(2)}</span>}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>

          {/* Color Options */}
          {colors.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {colors.map((color) => (
                <div key={color} className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
