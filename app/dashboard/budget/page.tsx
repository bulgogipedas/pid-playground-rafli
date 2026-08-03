"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { budgetAllocations, budgetTransactions } from "@/lib/data/budget"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Download,
  Filter,
  Building2,
} from "lucide-react"
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { cn } from "@/lib/utils"

const categoryLabels = {
  external_trainer: "External Trainer",
  internal_trainer: "Internal Trainer",
  material: "Material",
  venue: "Venue",
  other: "Other",
}

const categoryColors = {
  external_trainer: "#0879B5",
  internal_trainer: "#059669",
  material: "#D97706",
  venue: "#7C3AED",
  other: "#64748B",
}

export default function BudgetPage() {
  const { user } = useAuth()
  const [selectedYear] = useState(2024)

  // Check access
  const hasAccess = ["admin_sdm", "admin_divisi", "manager"].includes(user?.role || "")

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="font-serif text-xl font-medium mb-2">Akses Terbatas</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Halaman ini hanya dapat diakses oleh Admin SDM, Admin Divisi, dan Manager.
        </p>
      </div>
    )
  }

  // Filter based on role
  const allocations = user?.role === "admin_divisi"
    ? budgetAllocations.filter(b => b.division === user?.division)
    : budgetAllocations

  const transactions = user?.role === "admin_divisi"
    ? budgetTransactions.filter(t => t.division === user?.division)
    : budgetTransactions

  const totalBudget = allocations.reduce((sum, a) => sum + a.totalBudget, 0)
  const totalSpent = allocations.reduce((sum, a) => sum + a.spent, 0)
  const totalRemaining = totalBudget - totalSpent
  const spentPercentage = (totalSpent / totalBudget) * 100

  // Chart data
  const chartData = allocations.map(a => ({
    name: a.division,
    spent: a.spent,
    remaining: a.totalBudget - a.spent,
  }))

  const categoryData = transactions.reduce((acc, t) => {
    const existing = acc.find(item => item.category === t.category)
    if (existing) {
      existing.amount += t.amount
    } else {
      acc.push({ category: t.category, amount: t.amount })
    }
    return acc
  }, [] as { category: string; amount: number }[])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Biaya & Budget Pelatihan</h1>
          <p className="text-muted-foreground mt-1">Tahun {selectedYear}</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Ekspor Laporan
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {(totalBudget / 1000000).toFixed(0)}M</div>
            <p className="text-xs text-muted-foreground mt-1">{allocations.length} divisi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Terpakai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">Rp {(totalSpent / 1000000).toFixed(0)}M</div>
            <p className="text-xs text-muted-foreground mt-1">{spentPercentage.toFixed(1)}% dari total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sisa Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Rp {(totalRemaining / 1000000).toFixed(0)}M</div>
            <p className="text-xs text-muted-foreground mt-1">{(100 - spentPercentage).toFixed(1)}% tersedia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Jumlah Pelatihan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Transaksi tahun ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="division">Per Divisi</TabsTrigger>
          <TabsTrigger value="transactions">Transaksi</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Distribusi Budget per Divisi</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => `Rp ${(Number(value) / 1000000).toFixed(0)}M`} />
                    <Legend />
                    <Bar dataKey="spent" fill="#D97706" name="Terpakai" />
                    <Bar dataKey="remaining" fill="#E2E8F0" name="Sisa" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Distribusi Biaya per Kategori</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={categoryData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={categoryColors[entry.category as keyof typeof categoryColors] || "#64748B"} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `Rp ${(Number(value) / 1000000).toFixed(0)}M`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Division Tab */}
        <TabsContent value="division">
          <Card>
            <CardHeader>
              <CardTitle>Alokasi Budget per Divisi</CardTitle>
              <CardDescription>Menunjukkan penggunaan budget untuk setiap divisi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allocations.map((alloc) => (
                  <div key={alloc.id} className="space-y-2 pb-4 border-b last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{alloc.division}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">Rp {(alloc.spent / 1000000).toFixed(0)}M / Rp {(alloc.totalBudget / 1000000).toFixed(0)}M</div>
                        <div className="text-xs text-muted-foreground">{alloc.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <Progress value={alloc.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{alloc.courses} pelatihan</span>
                      <span>{alloc.employees} karyawan</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Transaksi</CardTitle>
              <CardDescription>Detail pengeluaran biaya pelatihan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pelatihan</TableHead>
                      <TableHead>Divisi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-right">Biaya</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((trx) => (
                      <TableRow key={trx.id}>
                        <TableCell className="font-medium">{trx.courseName}</TableCell>
                        <TableCell>{trx.division}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{categoryLabels[trx.category as keyof typeof categoryLabels]}</Badge>
                        </TableCell>
                        <TableCell>{new Date(trx.date).toLocaleDateString('id-ID')}</TableCell>
                        <TableCell className="text-right font-medium">Rp {(trx.amount / 1000000).toFixed(1)}M</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "rounded-full px-2 py-1 text-xs",
                            trx.status === "completed" ? "bg-green-100 text-green-700" :
                            trx.status === "approved" ? "bg-blue-100 text-blue-700" :
                            "bg-yellow-100 text-yellow-700"
                          )}>
                            {trx.status === "completed" ? "Selesai" : trx.status === "approved" ? "Disetujui" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
