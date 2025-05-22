"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Users } from "lucide-react"

// Mock data for charts
const generateSalesData = (days: number, baseValue: number, variance: number) => {
  return Array.from({ length: days }, (_, i) => {
    const randomFactor = Math.random() * variance - variance / 2
    return {
      value: Math.max(0, Math.round(baseValue + randomFactor)),
      day: i + 1,
    }
  })
}

const generateMonthlyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return months.map((month, index) => {
    // Higher sales in Q4, lower in Q1
    let baseValue = 5000
    if (index < 3) baseValue = 3000
    else if (index > 8) baseValue = 7000

    const variance = baseValue * 0.3
    const randomFactor = Math.random() * variance - variance / 2

    return {
      month,
      value: Math.max(0, Math.round(baseValue + randomFactor)),
    }
  })
}

const generateYearlyData = () => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => {
    const year = currentYear - 4 + i
    // Simulate growth trend
    const baseValue = 50000 + i * 10000
    const variance = baseValue * 0.15
    const randomFactor = Math.random() * variance - variance / 2

    return {
      year,
      value: Math.max(0, Math.round(baseValue + randomFactor)),
    }
  })
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("weekly")
  const [weeklyData, setWeeklyData] = useState<any[]>([])
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [yearlyData, setYearlyData] = useState<any[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("current")

  // Stats
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    growth: 0,
  })

  useEffect(() => {
    // Generate mock data
    setWeeklyData(generateSalesData(7, 1000, 500))
    setMonthlyData(generateMonthlyData())
    setYearlyData(generateYearlyData())

    // Set mock stats
    setStats({
      totalRevenue: 45600,
      totalOrders: 580,
      totalCustomers: 2420,
      growth: 12.5,
    })
  }, [])

  // Find max value for scaling the chart
  const getMaxValue = (data: any[]) => {
    if (!data.length) return 100
    return Math.max(...data.map((item) => item.value)) * 1.2
  }

  const weeklyMax = getMaxValue(weeklyData)
  const monthlyMax = getMaxValue(monthlyData)
  const yearlyMax = getMaxValue(yearlyData)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Period</SelectItem>
            <SelectItem value="previous">Previous Period</SelectItem>
            <SelectItem value="year">Year to Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
              <div className="flex items-center mt-2 text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>{stats.growth}% from last period</span>
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
                <span>8% from last period</span>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Customers</p>
              <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
              <div className="flex items-center mt-2 text-sm text-red-500">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>3% from last period</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Sales Charts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-0">
            <div className="h-80 w-full">
              <div className="flex h-full items-end">
                {weeklyData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full max-w-[50px] bg-red-500 rounded-t-md mx-1"
                      style={{
                        height: `${(item.value / weeklyMax) * 100}%`,
                        opacity: 0.7 + (index / weeklyData.length) * 0.3,
                      }}
                    ></div>
                    <div className="text-xs mt-2">Day {item.day}</div>
                    <div className="text-xs font-medium">${item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center">Sales data for the past week</div>
          </TabsContent>

          <TabsContent value="monthly" className="mt-0">
            <div className="h-80 w-full">
              <div className="flex h-full items-end">
                {monthlyData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full max-w-[40px] bg-blue-500 rounded-t-md mx-1"
                      style={{
                        height: `${(item.value / monthlyMax) * 100}%`,
                        opacity: 0.7 + (index / monthlyData.length) * 0.3,
                      }}
                    ></div>
                    <div className="text-xs mt-2">{item.month}</div>
                    <div className="text-xs font-medium">${item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center">Monthly sales data for the current year</div>
          </TabsContent>

          <TabsContent value="yearly" className="mt-0">
            <div className="h-80 w-full">
              <div className="flex h-full items-end">
                {yearlyData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full max-w-[60px] bg-green-500 rounded-t-md mx-1"
                      style={{
                        height: `${(item.value / yearlyMax) * 100}%`,
                        opacity: 0.7 + (index / yearlyData.length) * 0.3,
                      }}
                    ></div>
                    <div className="text-xs mt-2">{item.year}</div>
                    <div className="text-xs font-medium">${item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center">Yearly sales data for the past 5 years</div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Sales by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Electronics</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Fashion</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Gaming</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Toys</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "10%" }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Havic HV G-92 Gamepad</h3>
                <p className="text-xs text-gray-500">192 units sold</p>
              </div>
              <div className="text-sm font-medium">$36,864</div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">AK-900 Wired Keyboard</h3>
                <p className="text-xs text-gray-500">120 units sold</p>
              </div>
              <div className="text-sm font-medium">$115,200</div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">IPS LCD Gaming Monitor</h3>
                <p className="text-xs text-gray-500">90 units sold</p>
              </div>
              <div className="text-sm font-medium">$33,300</div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">RGB liquid CPU Cooler</h3>
                <p className="text-xs text-gray-500">85 units sold</p>
              </div>
              <div className="text-sm font-medium">$13,600</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
