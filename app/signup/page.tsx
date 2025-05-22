import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SignupPage() {
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

            {/* Right Side - Signup Form */}
            <div className="max-w-md mx-auto md:mx-0">
              <h1 className="text-3xl font-bold mb-6">Create an account</h1>
              <p className="text-gray-600 mb-8">Enter your details below</p>

              <form className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Email or Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3">
                  Create Account
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border border-gray-300 py-3 flex items-center justify-center gap-2"
                >
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Sign up with Google
                </Button>

                <div className="text-center">
                  <span className="text-gray-600">Already have account?</span>{" "}
                  <Link href="/login" className="text-black font-medium hover:underline">
                    Log in
                  </Link>
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
