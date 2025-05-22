import Link from "next/link"
import Image from "next/image"

export default function CategorySection() {
  const categories = [
    {
      name: "Phones",
      icon: "https://cdn-icons-png.flaticon.com/512/545/545245.png",
    },
    {
      name: "Computers",
      icon: "https://cdn-icons-png.flaticon.com/512/3474/3474360.png",
    },
    {
      name: "SmartWatch",
      icon: "https://cdn-icons-png.flaticon.com/512/2972/2972531.png",
    },
    {
      name: "Camera",
      icon: "https://cdn-icons-png.flaticon.com/512/1042/1042390.png",
    },
    {
      name: "Gaming",
      icon: "https://cdn-icons-png.flaticon.com/512/686/686589.png",
    },
    {
      name: "Headphones",
      icon: "https://cdn-icons-png.flaticon.com/512/3659/3659784.png",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-5 h-10 bg-red-500"></div>
        <h2 className="text-2xl font-bold">Browse By Category</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/category/${category.name.toLowerCase()}`}
            className="flex flex-col items-center justify-center p-6 border rounded-lg hover:border-red-500 transition-colors"
          >
            <div className="mb-4">
              <Image src={category.icon || "/placeholder.svg"} alt={category.name} width={32} height={32} />
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
