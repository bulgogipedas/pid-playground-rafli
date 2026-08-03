"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Selesai", value: 7, color: "#059669" },
  { name: "Sedang Berlangsung", value: 2, color: "#D97706" },
  { name: "Belum Dimulai", value: 3, color: "#E2E8F0" },
]

const total = data.reduce((sum, item) => sum + item.value, 0)
const completed = data.find((d) => d.name === "Selesai")?.value || 0
const percentage = Math.round((completed / total) * 100)

export function MandatoryTrainingChart() {
  return (
    <Card className="rounded-lg border border-gray-100 shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-lg font-semibold">
          Pelatihan Wajib
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {/* Ring Chart */}
          <div className="relative w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-serif text-foreground">{percentage}%</span>
              <span className="text-xs text-muted-foreground">Selesai</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="text-sm font-bold text-foreground">{total} Pelatihan</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
