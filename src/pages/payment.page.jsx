"use client"

import { Button } from "@/components/ui/button"
import { clearCart } from "@/lib/features/cartSlice"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { Navigate, useNavigate } from "react-router"
import { CreditCard, CheckCircle, Lock, ShoppingBag } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Link } from "react-router"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CartItem from "@/components/CartItem"

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate cart totals
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  if (cart.length === 0) {
    return <Navigate to="/" />
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      dispatch(clearCart())
      toast.success("Order placed successfully!", {
        description: "Thank you for your purchase!",
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      })
      navigate("/shop/complete?orderId=123456")
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-6 w-6 text-emerald-600" />
        <h1 className="text-3xl font-bold">Payment</h1>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="hidden md:flex items-center gap-2 text-sm">
          <Link to="/shop/cart" className="text-emerald-600 hover:text-emerald-700">
            Cart
          </Link>
          <span className="text-gray-400">→</span>
          <Link to="/shop/checkout" className="text-emerald-600 hover:text-emerald-700">
            Shipping
          </Link>
          <span className="text-gray-400">→</span>
          <span className="font-medium">Payment</span>
          <span className="text-gray-400">→</span>
          <span className="text-gray-400">Confirmation</span>
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg p-6 border mb-8">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-semibold">Payment Method</h2>
            </div>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
              <div className="flex items-center space-x-2 border p-4 rounded-md mb-3">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                  Credit Card
                </Label>
                <div className="flex gap-2">
                  <div className="h-8 w-12 bg-blue-600 rounded"></div>
                  <div className="h-8 w-12 bg-red-500 rounded"></div>
                  <div className="h-8 w-12 bg-gray-800 rounded"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 border p-4 rounded-md">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                  PayPal
                </Label>
                <div className="h-8 w-12 bg-blue-500 rounded"></div>
              </div>
            </RadioGroup>

            {paymentMethod === "credit-card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input id="card-name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="text-center p-6 bg-gray-50 rounded-md">
                <p className="text-gray-600 mb-4">You'll be redirected to PayPal to complete your purchase securely.</p>
                <div className="h-12 w-24 bg-blue-500 rounded mx-auto"></div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <p>Your payment information is secure and encrypted</p>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24 border">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>

            <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4">
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

            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PaymentPage
