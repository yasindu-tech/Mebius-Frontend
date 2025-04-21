import { Button } from "@/components/ui/button";
import { useGetOrderQuery, useGetCheckoutSessionStatusQuery } from "@/lib/api";
import { Link, useSearchParams, Navigate } from "react-router";
import { CheckCircle, Loader2, AlertCircle, Home, Mail, Package, CreditCard, Clock } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function CompletePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } =
    useGetCheckoutSessionStatusQuery(sessionId);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-4" />
        <h2 className="text-xl font-medium text-gray-700">Processing your order...</h2>
        <p className="text-gray-500 mt-2">Please wait while we confirm your payment.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-medium text-gray-700">Something went wrong</h2>
        <p className="text-gray-500 mt-2 mb-6">We couldn't retrieve your order information.</p>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link to="/shop/cart">Return to Cart</Link>
        </Button>
      </div>
    );
  }

  if (data?.status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (data?.status === "complete") {
    return (
      <section className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md my-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 mb-4">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            Order Completed Successfully!
          </h2>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. We're preparing your order for shipment.
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-medium">Confirmation Email</h3>
          </div>
          <p className="text-gray-600 ml-7">
            A confirmation email has been sent to{" "}
            <span className="font-semibold">{data.customer_email}</span>
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-medium">Order Details</h3>
          </div>
          
          <div className="space-y-3 ml-7">
            <div className="flex items-center">
              <span className="text-gray-500 w-32">Order ID:</span>
              <span className="font-medium">{data.orderId}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 w-32">Order Status:</span>
              <span className="font-medium flex items-center gap-1">
                <Clock className="h-4 w-4 text-emerald-600" />
                {data.orderStatus}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 w-32">Payment Status:</span>
              <span className="font-medium flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-emerald-600" />
                {data.paymentStatus}
              </span>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            If you have any questions, please email{" "}
            <a href="mailto:orders@example.com" className="text-emerald-600 hover:underline font-medium">
              orders@example.com
            </a>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

export default CompletePage;
