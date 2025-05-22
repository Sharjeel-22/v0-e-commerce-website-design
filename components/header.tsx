"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, ShoppingCart, User, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="border-b">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
          </div>
          <div className="flex items-center">
            <Link href="/shop" className="font-semibold hover:underline">
              Shop Now
            </Link>
            <div className="ml-4 flex items-center">
              <span>English</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Exclusive
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-red-500 font-medium">
              Home
            </Link>
            <Link href="/contact" className="hover:text-red-500 font-medium">
              Contact
            </Link>
            <Link href="/about" className="hover:text-red-500 font-medium">
              About
            </Link>
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-md px-4 py-2">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent outline-none w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <Link href="/wishlist" className="hover:text-red-500">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="hover:text-red-500">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/login" className="hover:text-red-500 hidden md:block">
              <User className="h-6 w-6" />
            </Link>
            <Link href="/login" className="hidden md:block">
              <Button variant="outline" size="sm" className="ml-2">
                Login
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-6 py-6">
                  <div className="flex items-center bg-gray-100 rounded-md px-4 py-2">
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="bg-transparent outline-none flex-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <Link href="/" className="hover:text-red-500 font-medium">
                      Home
                    </Link>
                    <Link href="/contact" className="hover:text-red-500 font-medium">
                      Contact
                    </Link>
                    <Link href="/about" className="hover:text-red-500 font-medium">
                      About
                    </Link>
                    <Link href="/login" className="hover:text-red-500 font-medium">
                      Log In
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
