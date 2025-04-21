
import { Button } from "@/components/ui/button"
import { useGetOrderQuery } from "@/lib/api"
import { Link, useSearchParams } from "react-router"
import { CheckCircle, Package, MapPin, ShoppingBag, Loader2 } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import CartItem from "@/components/CartItem"

function CompletePage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get("orderId")
  const { data, isLoading } = useGetOrderQuery(orderId)

  if (isLoading) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-emerald-600" />
        <h2 className="mt-4 text-xl font-medium text-gray-600">Loading your order details...</h2>
      </main>
    )
  }

  // Calculate order total
  const total = data.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 mb-6">
          <CheckCircle className="h-12 w-12 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </div>

      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-semibold">Order Details</h2>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
            {data.paymentStatus}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Order ID</span>
            <p className="font-medium">{data._id}</p>
          </div>
          <div>
            <span className="text-gray-500">Order Date</span>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4 mb-6">
          {data.items.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-end">
          <div className="w-1/2 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">$10.00</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-emerald-700">${(total + 10).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-emerald-600" />
          <h2 className="text-xl font-semibold">Shipping Address</h2>
        </div>

        <div className="text-gray-700">
          <p className="font-medium">{data.addressId.line_1}</p>
          {data.addressId.line_2 && <p>{data.addressId.line_2}</p>}
          <p>
            {data.addressId.city}, {data.addressId.state} {data.addressId.zip_code}
          </p>
          <p className="mt-2">Phone: {data.addressId.phone}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-emerald-600 hover:bg-emerald-700" size="lg" asChild>
          <Link to="/shop">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <Button variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50" size="lg" asChild>
          <Link to="/account">View All Orders</Link>
        </Button>
      </div>
    </main>
  )
}

export default CompletePage
