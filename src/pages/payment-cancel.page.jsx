import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { XCircle, ShoppingBag, ArrowLeft } from "lucide-react"

function PaymentCancelPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 mb-6">
          <XCircle className="h-12 w-12 text-emerald-600" />
        </div>

        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Your payment process was cancelled. No charges have been made to your account.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            size="lg"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </Button>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" size="lg" asChild>
            <Link to="/shop">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8">
        <div className="text-center">
          <h2 className="text-lg font-medium mb-2">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or concerns about your order or payment, please contact our customer support.
          </p>
          <Button variant="link" className="text-emerald-600 hover:text-emerald-700" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default PaymentCancelPage
