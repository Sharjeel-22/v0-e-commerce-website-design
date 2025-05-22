import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Contact Header */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-gray-600">
              We love hearing from you, our Shop customers. Please contact us and we&apos;ll make sure to get back to
              you as soon as we possibly can.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1 space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Visit Us</h3>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-gray-500 mt-1" />
                  <div>
                    <p>111 Bijoy sarani, Dhaka,</p>
                    <p>DH 1515, Bangladesh.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Call Us</h3>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-gray-500" />
                  <p>+88015-88888-9999</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Email Us</h3>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-gray-500" />
                  <p>exclusive@gmail.com</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Working Hours</h3>
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 10:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2 bg-white p-8 rounded-lg border">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Your Name *" required className="p-3 border rounded-md" />
                  <Input placeholder="Your Email *" required type="email" className="p-3 border rounded-md" />
                  <Input placeholder="Your Phone *" required className="p-3 border rounded-md" />
                </div>
                <Textarea placeholder="Your Message" className="w-full p-3 border rounded-md min-h-[150px]" required />
                <div className="flex justify-end">
                  <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12 h-[400px] bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9038268521493!2d90.38426491498136!3d23.750858084589126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd5c2e8559%3A0x3e33392dc21f14af!2sBijoy%20Sarani%2C%20Dhaka%201000%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
