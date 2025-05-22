"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    totalOrders: 0,
  })

  useEffect(() => {
    // Simulate fetching dashboard data
    setStats({
      totalProducts: 152,
      totalCustomers: 2420,
      totalRevenue: 45600,
      totalOrders: 580,
    })
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">Welcome back, Admin</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
              <div className="flex items-center mt-2 text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>12% from last month</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Customers</p>
              <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
              <div className="flex items-center mt-2 text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>18% from last month</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
              <div className="flex items-center mt-2 text-sm text-red-500">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>4% from last month</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
              <div className="flex items-center mt-2 text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>8% from last month</span>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/add"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-500 transition-colors"
          >
            <h3 className="font-medium mb-2">Add New Product</h3>
            <p className="text-sm text-gray-500">Create and publish a new product</p>
          </Link>

          <Link
            href="/admin/products"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-500 transition-colors"
          >
            <h3 className="font-medium mb-2">Manage Products</h3>
            <p className="text-sm text-gray-500">Edit, update or delete products</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-500 transition-colors"
          >
            <h3 className="font-medium mb-2">View Orders</h3>
            <p className="text-sm text-gray-500">Check recent orders and status</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <Card className="overflow-hidden">
          <div className="bg-white rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">New product added</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Order #12345 completed</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">System</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 hours ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">New customer registered</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 day ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Product "Gaming Keyboard" updated
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 days ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
