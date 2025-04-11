import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { Link } from "react-router"
import CartItem from "@/components/CartItem"
import { ShoppingCart, ArrowRight, ShoppingBag } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

function CartPage() {
  const cart = useSelector((state) => state.cart.value)

  // Calculate cart totals
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingCart className="h-6 w-6 text-emerald-600" />
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
      </div>

      <Separator className="mb-8" />

      {cart.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
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

              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 mb-4"
                size="lg"
                asChild
                disabled={cart.length === 0}
              >
                <Link to="/shop/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                asChild
              >
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <ShoppingBag className="h-24 w-24 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. Browse our collection and find something you'll
            love!
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 mt-4" size="lg" asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </main>
  )
}

export default CartPage
