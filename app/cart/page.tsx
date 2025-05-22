import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CartPage() {
  // Sample cart items
  const cartItems = [
    {
      id: "1",
      name: "Havic HV G-92 Gamepad",
      image:
        "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      price: 192.0,
      quantity: 2,
    },
    {
      id: "2",
      name: "AK-900 Wired Keyboard",
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      price: 960.0,
      quantity: 1,
    },
    {
      id: "3",
      name: "IPS LCD Gaming Monitor",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: 370.0,
      quantity: 1,
    },
  ]

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 20
  const total = subtotal + shipping

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-gray-100 rounded-t-lg">
                <div className="col-span-2 font-medium">Product</div>
                <div className="font-medium">Price</div>
                <div className="font-medium">Quantity</div>
                <div className="font-medium text-right">Subtotal</div>
              </div>

              {/* Cart Items */}
              <div className="border rounded-lg md:rounded-t-none divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 items-center">
                    {/* Product */}
                    <div className="md:col-span-2 flex items-center gap-4">
                      <button className="text-gray-400 hover:text-red-500">
                        <X className="h-5 w-5" />
                      </button>
                      <div className="w-20 h-20 relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <h3 className="font-medium">{item.name}</h3>
                    </div>

                    {/* Price */}
                    <div className="md:hidden font-medium">Price:</div>
                    <div>${item.price.toFixed(2)}</div>

                    {/* Quantity */}
                    <div className="md:hidden font-medium">Quantity:</div>
                    <div className="flex items-center border rounded-md w-fit">
                      <button className="px-3 py-2 border-r">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2">{item.quantity}</span>
                      <button className="px-3 py-2 border-l">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="md:hidden font-medium">Subtotal:</div>
                    <div className="md:text-right">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
                <Link href="/" className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>

                <Button className="bg-red-500 hover:bg-red-600">Update Cart</Button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Cart Total</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between pb-4 border-b">
                    <span>Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b">
                    <span>Shipping:</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-red-500 hover:bg-red-600 py-3">Proceed to Checkout</Button>
              </div>

              {/* Coupon */}
              <div className="border rounded-lg p-6 mt-6">
                <h3 className="font-medium mb-4">Apply Coupon</h3>
                <div className="flex gap-2">
                  <Input placeholder="Coupon Code" className="flex-1" />
                  <Button className="bg-red-500 hover:bg-red-600">Apply</Button>
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
