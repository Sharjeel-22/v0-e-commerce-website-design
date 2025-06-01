"use client"

import { useState } from "react"
import { Search, Download, Eye, Edit, Truck, Package, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const orders = [
    {
      id: "#12547",
      customer: "John Doe",
      email: "john@example.com",
      date: "2024-01-15",
      status: "Delivered",
      total: 192.0,
      items: 2,
      paymentStatus: "Paid",
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "TRK123456789",
    },
    {
      id: "#12546",
      customer: "Jane Smith",
      email: "jane@example.com",
      date: "2024-01-15",
      status: "Processing",
      total: 960.0,
      items: 1,
      paymentStatus: "Paid",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
      trackingNumber: "TRK987654321",
    },
    {
      id: "#12545",
      customer: "Mike Johnson",
      email: "mike@example.com",
      date: "2024-01-14",
      status: "Pending",
      total: 370.0,
      items: 3,
      paymentStatus: "Pending",
      shippingAddress: "789 Pine St, Chicago, IL 60601",
      trackingNumber: null,
    },
    {
      id: "#12544",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      date: "2024-01-14",
      status: "Shipped",
      total: 160.0,
      items: 1,
      paymentStatus: "Paid",
      shippingAddress: "321 Elm St, Houston, TX 77001",
      trackingNumber: "TRK456789123",
    },
    {
      id: "#12543",
      customer: "David Brown",
      email: "david@example.com",
      date: "2024-01-13",
      status: "Returned",
      total: 135.0,
      items: 2,
      paymentStatus: "Refunded",
      shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
      trackingNumber: "TRK789123456",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Processing":
        return <Package className="h-4 w-4" />
      case "Shipped":
        return <Truck className="h-4 w-4" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />
      case "Returned":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Returned":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-red-500 hover:bg-red-600">Create Manual Order</Button>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">1,247</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">23</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Processing</p>
              <p className="text-2xl font-bold text-blue-600">45</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Shipped</p>
              <p className="text-2xl font-bold text-purple-600">89</p>
            </div>
            <Truck className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-bold text-green-600">1,090</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders, customers, or emails..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    {order.trackingNumber && <div className="text-xs text-gray-500">Track: {order.trackingNumber}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={`inline-flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={order.paymentStatus === "Paid" ? "default" : "secondary"}>
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.items} items</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Truck className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order Actions Panel */}
      <div className="mt-6">
        <Tabs defaultValue="fulfillment" className="w-full">
          <TabsList>
            <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
            <TabsTrigger value="returns">Returns & Refunds</TabsTrigger>
            <TabsTrigger value="tracking">Shipping Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="fulfillment" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Order Fulfillment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Assign to Fulfillment</h4>
                  <p className="text-sm text-gray-500 mb-3">Assign orders to fulfillment centers</p>
                  <Button size="sm">Assign Orders</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Generate Packing Slips</h4>
                  <p className="text-sm text-gray-500 mb-3">Create packing slips for selected orders</p>
                  <Button size="sm">Generate Slips</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Bulk Status Update</h4>
                  <p className="text-sm text-gray-500 mb-3">Update multiple order statuses</p>
                  <Button size="sm">Update Status</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="returns" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Returns & Refunds</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Return Request #RET001</h4>
                    <p className="text-sm text-gray-500">Order #12543 - Havic HV G-92 Gamepad</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Approve
                    </Button>
                    <Button variant="outline" size="sm">
                      Reject
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Refund Request #REF002</h4>
                    <p className="text-sm text-gray-500">Order #12542 - AK-900 Wired Keyboard</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Process Refund
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Customer
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Shipping Tracking</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Order #12546</h4>
                      <p className="text-sm text-gray-500">Tracking: TRK987654321</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
                  </div>
                  <div className="text-sm text-gray-600">Last Update: Package arrived at Los Angeles facility</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Order #12544</h4>
                      <p className="text-sm text-gray-500">Tracking: TRK456789123</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                  </div>
                  <div className="text-sm text-gray-600">Delivered to customer on Jan 14, 2024 at 2:30 PM</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
