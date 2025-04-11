import ShippingAddressForm from "@/components/ShippingAddressForm"
import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import { Separator } from "@/components/ui/separator"
import { Truck, CreditCard, ShoppingBag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import CartItem from "@/components/CartItem"

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value)

  // Calculate cart totals
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  if (cart.length === 0) {
    return <Navigate to="/" />
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-6 w-6 text-emerald-600" />
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="hidden md:flex items-center gap-2 text-sm">
          <Link to="/shop/cart" className="text-emerald-600 hover:text-emerald-700">
            Cart
          </Link>
          <span className="text-gray-400">→</span>
          <span className="font-medium">Shipping</span>
          <span className="text-gray-400">→</span>
          <span className="text-gray-400">Payment</span>
          <span className="text-gray-400">→</span>
          <span className="text-gray-400">Confirmation</span>
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg p-6 border mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-semibold">Shipping Information</h2>
            </div>
            <ShippingAddressForm cart={cart} />
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24 border">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>

            <div className="max-h-80 overflow-y-auto mb-6 pr-2 space-y-4">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-emerald-700">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CheckoutPage
