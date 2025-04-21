import { useGetOrdersQuery, useGetUserMutation,useUpdateOrderStatusMutation } from "@/lib/api"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronDown, ChevronUp, Package, MapPin } from "lucide-react"
import { toast } from "sonner"
const AdminOrders = () => {
  const { data: orders = [], error, isLoading } = useGetOrdersQuery()
  const [getUserDetails] = useGetUserMutation()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" })
  const [expandedOrder, setExpandedOrder] = useState(null)

  const [updateOrderStatus] = useUpdateOrderStatusMutation()
  const handleUpdateOrderStatus = async (orderId, orderStatus) => {
    try {

      await updateOrderStatus({  id: orderId, 
        orderStatus}).unwrap()
      toast.success("Order status updated successfully")
    } catch (error) {
      toast.error("Failed to update order status")
      console.error("Update error:", error)
    }
  }

  const requestSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Filter and sort orders
  const getFilteredAndSortedOrders = () => {
    const filtered = orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        order._id.toLowerCase().includes(searchLower) ||
        order.orderStatus.toLowerCase().includes(searchLower) ||
        order.paymentStatus.toLowerCase().includes(searchLower)
      )
    })

    return [...filtered].sort((a, b) => {
      if (sortConfig.key === "createdAt") {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Calculate order total
  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Error loading orders</h2>
          <p className="mb-4">{error.message || "Failed to fetch orders"}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const filteredOrders = getFilteredAndSortedOrders()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search orders by ID or status..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders table */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle>Orders</CardTitle>
          <CardDescription>{filteredOrders.length} orders found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort("_id")}>
                  Order ID
                  {sortConfig.key === "_id" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="inline h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="inline h-4 w-4 ml-1" />
                    ))}
                </TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort("createdAt")}>
                  Date
                  {sortConfig.key === "createdAt" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="inline h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="inline h-4 w-4 ml-1" />
                    ))}
                </TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort("orderStatus")}>
                  Status
                  {sortConfig.key === "orderStatus" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="inline h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="inline h-4 w-4 ml-1" />
                    ))}
                </TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => {
                  const isExpanded = expandedOrder === order._id
                  const total = calculateOrderTotal(order.items)

                  return (
                    <>
                      <TableRow key={order._id} className="hover:bg-gray-50">
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{order._id.substring(order._id.length - 8)}</TableCell>
                        <TableCell>
                          <span className="text-gray-600">{order.userId}</span>
                        </TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </TableCell>
                        <TableCell>${total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Select defaultValue={order.orderStatus} onValueChange={(value) => handleUpdateOrderStatus(order._id, value)}>
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">PENDING</SelectItem>
                              <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                              <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                              <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                              <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.paymentStatus}</Badge>
                        </TableCell>
                      </TableRow>

                      {/* Expanded row */}
                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={8} className="p-0 border-t-0">
                            <div className="bg-gray-50 p-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Order Items */}
                                <div className="md:col-span-2">
                                  <h4 className="font-medium mb-2 flex items-center gap-1">
                                    <Package className="h-4 w-4" /> Items
                                  </h4>
                                  <div className="space-y-2">
                                    {order.items.map((item) => (
                                      <div
                                        key={item._id}
                                        className="flex items-center gap-3 bg-white p-2 rounded border"
                                      >
                                        <div className="h-12 w-12 bg-gray-100 rounded">
                                          <img
                                            src={item.product.image || "/placeholder.svg"}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover rounded"
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium">{item.product.name}</div>
                                          <div className="text-xs text-gray-500">
                                            {item.quantity} × $ {item.product.price} .00
                                          </div>
                                        </div>
                                        <div className="font-medium">
                                          $ {(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Shipping Address */}
                                <div>
                                  <h4 className="font-medium mb-2 flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> Shipping Address
                                  </h4>
                                  <div className="bg-white p-3 rounded border text-sm">
                                    <p>{order.addressId.line_1}</p>
                                    <p>{order.addressId.line_2}</p>
                                    <p>
                                      {order.addressId.city}, {order.addressId.state} {order.addressId.zip_code}
                                    </p>
                                    <p>Phone: {order.addressId.phone}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminOrders
