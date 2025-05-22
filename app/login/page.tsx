"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check for admin credentials (in a real app, this would be a server-side check)
    if (email === "admin@example.com" && password === "admin123") {
      // Simulate storing auth token
      localStorage.setItem("isAdmin", "true")
      // Redirect to admin dashboard
      router.push("/admin/dashboard")
    } else {
      // For demo purposes, also allow any login to succeed but go to home page
      if (email && password) {
        localStorage.setItem("isLoggedIn", "true")
        router.push("/")
      } else {
        setError("Please enter both email and password")
      }
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Image */}
            <div className="bg-blue-50 rounded-lg p-8 flex items-center justify-center h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1611174743420-3d7df880ce32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                alt="Shopping cart with smartphone"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>

            {/* Right Side - Login Form */}
            <div className="max-w-md mx-auto md:mx-0">
              <h1 className="text-3xl font-bold mb-6">Log in to Exclusive</h1>
              <p className="text-gray-600 mb-8">Enter your details below</p>

              {error && <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">{error}</div>}

              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <Input
                    type="text"
                    placeholder="Email or Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-8 py-2">
                    Log In
                  </Button>
                  <Link href="/forgot-password" className="text-red-500 hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <div className="text-sm text-gray-500 mt-4">
                  <p>For admin access use:</p>
                  <p>Email: admin@example.com</p>
                  <p>Password: admin123</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
