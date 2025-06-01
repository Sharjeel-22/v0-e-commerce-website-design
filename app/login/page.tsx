"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const clothingImages = [
  {
    src: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Women's Fashion Collection",
    title: "Women's Collection",
    description: "Elegant dresses and stylish outfits",
  },
  {
    src: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Men's Fashion Collection",
    title: "Men's Collection",
    description: "Casual wear and formal attire",
  },
  {
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Fashion Accessories",
    title: "Accessories",
    description: "Bags, shoes, and jewelry",
  },
  {
    src: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Kids Fashion Collection",
    title: "Kids Collection",
    description: "Colorful children's fashion",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Summer Collection",
    title: "Summer Collection",
    description: "Light and breezy summer wear",
  },
  {
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Winter Collection",
    title: "Winter Collection",
    description: "Cozy sweaters and warm jackets",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-change carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === clothingImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === clothingImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? clothingImages.length - 1 : prevIndex - 1))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("isLoggedIn", "true")

        // Check if user is admin
        if (data.user.role === "admin") {
          localStorage.setItem("isAdmin", "true")
          router.push("/admin/dashboard")
        } else {
          router.push("/")
        }
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const currentImage = clothingImages[currentImageIndex]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Clothing Carousel */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 flex items-center justify-center h-[500px] relative overflow-hidden">
              <div className="relative w-full h-full">
                {/* Main Carousel Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={currentImage.src || "/placeholder.svg"}
                      alt={currentImage.alt}
                      fill
                      className="object-cover transition-all duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                    {/* Image Info Overlay */}
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{currentImage.title}</h3>
                      <p className="text-sm opacity-90">{currentImage.description}</p>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {clothingImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50 hover:bg-opacity-75"
                      }`}
                    />
                  ))}
                </div>

                {/* Floating Fashion Elements */}
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="max-w-md mx-auto md:mx-0">
              <h1 className="text-3xl font-bold mb-6">Welcome to Fashion Hub</h1>
              <p className="text-gray-600 mb-8">Discover your style, login to explore our latest collections</p>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </Button>
                  <Link href="/forgot-password" className="text-red-500 hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <div className="text-center">
                  <span className="text-gray-600">Don't have an account?</span>{" "}
                  <Link href="/signup" className="text-red-500 font-medium hover:underline">
                    Sign up
                  </Link>
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Demo Credentials:</h3>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Admin:</strong> admin@example.com / admin123
                  </p>
                  <p>
                    <strong>User:</strong> user@example.com / user123
                  </p>
                  <p>
                    <strong>User:</strong> john@example.com / password123
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
