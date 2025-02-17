import { Package, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function OrderCard({ order }) {
  const totalAmount = order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Package className="w-8 h-8 text-gray-500 mr-3" />
          <div>
            <h4 className="text-lg font-semibold">Order #{order._id}</h4>
            <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
            {order.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus}
          </span>
          <span onClick={() => setShowDetails(!showDetails)} className="cursor-pointer">
            {showDetails ? <ChevronUp className="w-6 h-6 text-gray-500" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
          </span>
        </div>
      </div>
      {showDetails && (
        <div className="border-t pt-4">
          <ul className="space-y-2">
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  {item.product.name} (x{item.quantity})
                </span>
                <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-lg">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <div>
              <span className="font-semibold">Address:</span>
              <span>{order.addressId.line_1 + " " + order.addressId.line_2 + " "}</span>
              <span>{order.addressId.city + " " + order.addressId.state + " "}</span>
            </div>
            <div>
              <span className="font-semibold">Phone:</span>
              <span>{order.addressId.phone}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

