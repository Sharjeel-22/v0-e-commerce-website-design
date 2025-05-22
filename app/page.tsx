import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import CategorySection from "@/components/category-section"
import ProductCard from "@/components/product-card"
import CountdownTimer from "@/components/countdown-timer"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { getActiveProducts, initializeDatabase } from "@/lib/db"

export default async function Home() {
  // Initialize database if needed
  await initializeDatabase().catch(console.error)

  // Fetch products from database
  let products = []
  try {
    products = await getActiveProducts()
  } catch (error) {
    console.error("Error fetching products:", error)
    // Fallback to empty array, we'll use fallback products below
  }

  // Create fallback products
  const fallbackProducts = [
    {
      id: "fallback-1",
      name: "Havic HV G-92 Gamepad",
      image:
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      price: 192.0,
      originalPrice: 192.0,
      discount: 0,
      rating: 4.5,
      reviews: 70,
    },
    {
      id: "fallback-2",
      name: "AK-900 Wired Keyboard",
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      price: 960.0,
      originalPrice: 1160.0,
      discount: 17,
      rating: 4.5,
      reviews: 49,
    },
    {
      id: "fallback-3",
      name: "IPS LCD Gaming Monitor",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: 370.0,
      originalPrice: 400.0,
      discount: 8,
      rating: 4.7,
      reviews: 99,
    },
    {
      id: "fallback-4",
      name: "RGB liquid CPU Cooler",
      image:
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: 160.0,
      originalPrice: 170.0,
      discount: 6,
      rating: 4.9,
      reviews: 65,
    },
    {
      id: "fallback-5",
      name: "Wireless Gaming Headset",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      price: 135.0,
      originalPrice: 150.0,
      discount: 10,
      rating: 4.6,
      reviews: 55,
    },
  ]

  // Use fallback products if API fetch failed
  if (products.length === 0) {
    products = fallbackProducts
  }

  // Filter products for different sections
  const flashSaleProducts = products.filter((product) => product.discount && product.discount > 0).slice(0, 5)
  const bestSellingProducts = products.slice(0, 4) // In a real app, you'd sort by sales
  const exploreProducts = products.slice(0, 8)

  // If any section is empty, use fallback products
  if (flashSaleProducts.length === 0) {
    flashSaleProducts.push(...fallbackProducts.filter((p) => p.discount > 0))
  }
  if (bestSellingProducts.length === 0) {
    bestSellingProducts.push(...fallbackProducts.slice(0, 4))
  }
  if (exploreProducts.length === 0) {
    exploreProducts.push(...fallbackProducts)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full bg-black text-white">
        <div className="container mx-auto px-4 py-8 flex items-center">
          <div className="w-1/2 z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                <Image
                  src="https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg"
                  alt="Apple logo"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <span className="text-sm">iPhone 14 Series</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Up to 10% off Voucher</h2>
            <Link
              href="/shop"
              className="inline-flex items-center text-sm font-medium underline underline-offset-4 mt-2"
            >
              Shop Now
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="w-1/2 flex justify-end">
            <Image
              src="https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
              alt="iPhone 14"
              width={400}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Flash Sales */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-red-500"></div>
            <h2 className="text-2xl font-bold">Flash Sales</h2>
          </div>
          <div className="flex items-center gap-6">
            <CountdownTimer days={2} hours={23} minutes={18} seconds={50} />
            <div className="flex gap-2">
              <button className="p-2 border rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="p-2 border rounded-full hover:bg-gray-100">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {flashSaleProducts.map((product) => (
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
              isNew={false}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/flash-sales" className="px-12 py-4 bg-red-500 text-white font-medium rounded">
            View All Products
          </Link>
        </div>
      </section>

      {/* Browse By Category */}
      <CategorySection />

      {/* Best Selling Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-red-500"></div>
            <h2 className="text-2xl font-bold">Best Selling Products</h2>
          </div>
          <Link href="/best-selling" className="text-red-500 font-medium">
            View All
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

      {/* Music Experience Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-black text-white rounded-lg p-8 flex items-center">
          <div className="w-1/2">
            <h2 className="text-3xl font-bold mb-4">Enhance Your Music Experience</h2>
            <div className="flex gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">1</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">2</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">3</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">4</span>
              </div>
            </div>
            <button className="px-8 py-3 bg-green-500 text-white font-medium rounded">Buy Now</button>
          </div>
          <div className="w-1/2 flex justify-end">
            <Image
              src="https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
              alt="Speaker"
              width={400}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Explore Our Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-red-500"></div>
            <h2 className="text-2xl font-bold">Explore Our Products</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exploreProducts.slice(0, 4).map((product) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {exploreProducts.slice(4, 8).map((product) => (
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

        <div className="flex justify-center mt-8">
          <Link href="/products" className="px-12 py-4 bg-red-500 text-white font-medium rounded">
            View All Products
          </Link>
        </div>
      </section>

      {/* New Arrival */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-red-500"></div>
          <h2 className="text-2xl font-bold">New Arrival</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-[400px] bg-black text-white rounded-lg overflow-hidden">
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <h3 className="text-2xl font-bold mb-2">PlayStation 5</h3>
              <p className="mb-4">Black and White version of the PS5 coming out on sale.</p>
              <Link href="/shop" className="text-sm font-medium underline underline-offset-4">
                Shop Now
              </Link>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80"
              alt="PlayStation 5"
              fill
              className="object-cover opacity-70"
            />
          </div>
          <div className="relative h-[400px] bg-black text-white rounded-lg overflow-hidden">
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <h3 className="text-2xl font-bold mb-2">Women's Collection</h3>
              <p className="mb-4">Featured woman collections that give you another vibe.</p>
              <Link href="/shop" className="text-sm font-medium underline underline-offset-4">
                Shop Now
              </Link>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Women's Collection"
              fill
              className="object-cover opacity-70"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-12 border-t mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2769/2769339.png"
                alt="Delivery"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h3 className="font-bold">FREE AND FAST DELIVERY</h3>
              <p className="text-sm text-gray-500">Free delivery for all orders over $100</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/4185/4185148.png"
                alt="Support"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h3 className="font-bold">24/7 CUSTOMER SERVICE</h3>
              <p className="text-sm text-gray-500">Friendly 24/7 customer support</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/1584/1584892.png"
                alt="Guarantee"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h3 className="font-bold">MONEY BACK GUARANTEE</h3>
              <p className="text-sm text-gray-500">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
