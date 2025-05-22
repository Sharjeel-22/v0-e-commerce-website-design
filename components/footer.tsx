import Link from "next/link"
import Image from "next/image"
import { Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-bold mb-6">Exclusive</h3>
            <h4 className="font-medium mb-4">Subscribe</h4>
            <p className="text-sm mb-4">Get 10% off your first order</p>
            <div className="flex">
              <Input
                placeholder="Enter your email"
                className="bg-transparent border-white rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button variant="outline" className="rounded-l-none border-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <p>111 Bijoy sarani, Dhaka,</p>
                <p>DH 1515, Bangladesh.</p>
              </li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-bold mb-6">Account</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/account" className="hover:underline">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:underline">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:underline">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:underline">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Link</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-xl font-bold mb-6">Download App</h3>
            <p className="text-sm text-gray-400 mb-4">Save $3 with App New User Only</p>
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111450.png"
                  alt="QR Code"
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="rounded"
                />
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="rounded"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-red-500">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-red-500">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-red-500">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-red-500">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; Copyright Rimel 2023. All right reserved</p>
        </div>
      </div>
    </footer>
  )
}
