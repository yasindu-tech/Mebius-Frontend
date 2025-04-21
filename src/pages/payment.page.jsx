"use client"

import CartItem from "@/components/CartItem"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import CheckoutForm from "@/components/CheckoutForm"
import { useSearchParams } from "react-router"
import { CreditCard, ShoppingBag, ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router"

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const orderId = searchParams.get("orderId")

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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
          Review Your Order
        </h1>
      </div>

      <div className="flex items-center mb-8">
        <Link to="/shop/cart" className="text-emerald-600 hover:text-emerald-700 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
      </div>

      <Separator className="mb-8" />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg p-6 border mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-semibold">Order Items</h2>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24 border">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

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

            <div className="mt-6">
              <CheckoutForm orderId={orderId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PaymentPage
