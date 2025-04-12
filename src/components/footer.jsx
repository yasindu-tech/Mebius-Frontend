import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function Footer() {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 px-8 md:px-16 lg:px-24">
      <div className="max-w-screen mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-emerald-700">Mebius</h3>
            <p className="text-gray-600">
              Premium quality products for your everyday needs. Discover the difference with Mebius.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-emerald-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Commerce St, Shopping City, SC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-emerald-600 flex-shrink-0" />
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-emerald-600 flex-shrink-0" />
                <span className="text-gray-600">support@mebius.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Mebius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
