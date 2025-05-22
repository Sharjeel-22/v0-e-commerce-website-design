import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type for our products table
export type Product = {
  id: string
  name: string
  description: string
  image: string
  category: string
  price: number
  originalPrice?: number
  discount?: number
  stock: number
  status: "Active" | "Draft" | "Out of Stock"
  rating?: number
  reviews?: number
  created_at: string
  updated_at: string
}
