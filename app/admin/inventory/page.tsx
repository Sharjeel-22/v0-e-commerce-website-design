"use client"

import { useState } from "react"
import { Search, AlertTriangle, Package, TrendingDown, TrendingUp, Download, Upload, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")

  const inventoryItems = [
    {
      id: "SKU001",
      name: "Havic HV G-92 Gamepad",
      category: "Gaming",
      sku: "HVG-92-001",
      currentStock: 45,
      minStock: 10,
      maxStock: 100,
      reorderPoint: 15,
      unitCost: 85.0,
      sellingPrice: 192.0,
      supplier: "Gaming Tech Co.",
      lastRestocked: "2024-01-10",
      status: "In Stock",
    },
    {
      id: "SKU002",
      name: "AK-900 Wired Keyboard",
      category: "Electronics",
      sku: "AK-900-002",
      currentStock: 8,
      minStock: 15,
      maxStock: 80,
      reorderPoint: 20,
      unitCost: 420.0,
      sellingPrice: 960.0,
      supplier: "Keyboard Solutions",
      lastRestocked: "2024-01-05",
      status: "Low Stock",
    },
    {
      id: "SKU003",
      name: "IPS LCD Gaming Monitor",
      category: "Electronics",
      sku: "IPS-LCD-003",
      currentStock: 0,
      minStock: 5,
      maxStock: 50,
      reorderPoint: 8,
      unitCost: 180.0,
      sellingPrice: 370.0,
      supplier: "Display Tech Inc.",
      lastRestocked: "2023-12-28",
      status: "Out of Stock",
    },
    {
      id: "SKU004",
      name: "RGB liquid CPU Cooler",
      category: "Electronics",
      sku: "RGB-CPU-004",
      currentStock: 25,
      minStock: 8,
      maxStock: 60,
      reorderPoint: 12,
      unitCost: 75.0,
      sellingPrice: 160.0,
      supplier: "Cooling Systems Ltd.",
      lastRestocked: "2024-01-12",
      status: "In Stock",
    },
    {
      id: "SKU005",
      name: "Wireless Gaming Headset",
      category: "Gaming",
      sku: "WGH-005",
      currentStock: 3,
      minStock: 10,
      maxStock: 40,
      reorderPoint: 15,
      unitCost: 65.0,
      sellingPrice: 135.0,
      supplier: "Audio Gear Pro",
      lastRestocked: "2024-01-08",
      status: "Low Stock",
    },
  ]

  const getStockStatus = (item: any) => {
    if (item.currentStock === 0) return "Out of Stock"
    if (item.currentStock <= item.reorderPoint) return "Low Stock"
    return "In Stock"
  }

  const getStockColor = (status: string) => {
    switch (status) {
      case "Out of Stock":
        return "bg-red-100 text-red-800"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800"
      case "In Stock":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesStock =
      stockFilter === "all" || getStockStatus(item).toLowerCase().replace(" ", "") === stockFilter.toLowerCase()
    return matchesSearch && matchesCategory && matchesStock
  })

  const lowStockItems = inventoryItems.filter((item) => item.currentStock <= item.reorderPoint && item.currentStock > 0)
  const outOfStockItems = inventoryItems.filter((item) => item.currentStock === 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Inventory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold">152</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockItems.length}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold">$45,670</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by product name or SKU..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="toys">Toys</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="instock">In Stock</SelectItem>
                <SelectItem value="lowstock">Low Stock</SelectItem>
                <SelectItem value="outofstock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reorder Point
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Selling Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.currentStock}</div>
                    <div className="text-xs text-gray-500">Max: {item.maxStock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reorderPoint}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.unitCost.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${item.sellingPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStockColor(getStockStatus(item))}>{getStockStatus(item)}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Restock
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Inventory Management Tabs */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList>
          <TabsTrigger value="alerts">Stock Alerts</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Low Stock Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                          <p className="text-sm text-yellow-700">
                            Current: {item.currentStock} | Reorder at: {item.reorderPoint}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                  Out of Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {outOfStockItems.map((item) => (
                    <div key={item.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                          <p className="text-sm text-red-700">Last restocked: {item.lastRestocked}</p>
                        </div>
                        <Button size="sm" className="bg-red-500 hover:bg-red-600">
                          Urgent Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Gaming Tech Co.</h4>
                  <p className="text-sm text-gray-500 mb-2">Primary supplier for gaming accessories</p>
                  <div className="text-sm">
                    <p>Products: 15</p>
                    <p>Last Order: Jan 10, 2024</p>
                    <p>Rating: ⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Keyboard Solutions</h4>
                  <p className="text-sm text-gray-500 mb-2">Specialized keyboard supplier</p>
                  <div className="text-sm">
                    <p>Products: 8</p>
                    <p>Last Order: Jan 5, 2024</p>
                    <p>Rating: ⭐⭐⭐⭐</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Display Tech Inc.</h4>
                  <p className="text-sm text-gray-500 mb-2">Monitor and display supplier</p>
                  <div className="text-sm">
                    <p>Products: 12</p>
                    <p>Last Order: Dec 28, 2023</p>
                    <p>Rating: ⭐⭐⭐⭐</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Stock Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Havic HV G-92 Gamepad</h4>
                    <p className="text-sm text-gray-500">SKU: HVG-92-001</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">+20 units</p>
                    <p className="text-xs text-gray-500">Restocked - Jan 10</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">AK-900 Wired Keyboard</h4>
                    <p className="text-sm text-gray-500">SKU: AK-900-002</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">-5 units</p>
                    <p className="text-xs text-gray-500">Sale - Jan 15</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">RGB liquid CPU Cooler</h4>
                    <p className="text-sm text-gray-500">SKU: RGB-CPU-004</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">+15 units</p>
                    <p className="text-xs text-gray-500">Restocked - Jan 12</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
