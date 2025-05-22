import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center text-sm ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
          {index === items.length - 1 ? (
            <span className="text-gray-500">{item.label}</span>
          ) : (
            <Link href={item.href} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
