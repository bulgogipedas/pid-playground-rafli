"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { UserRole, roleLabels, dummyUsers } from "@/lib/data/users"

export default function LoginPage() {
  const router = useRouter()
  const { login, switchRole } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Login gagal")
    }
    
    setIsLoading(false)
  }

  // Quick login for demo
  const handleQuickLogin = (role: UserRole) => {
    switchRole(role)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side - Branding */}
      <div className="hidden flex-col justify-between bg-sidebar p-12 text-white lg:flex lg:w-1/2">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sidebar-primary">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-2xl">LMS PID</h1>
              <p className="text-sm text-white/70">Pelita Indonesia Djaya</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="font-serif text-4xl font-bold leading-tight text-balance">
            Sistem Pembelajaran Terintegrasi untuk Pengembangan SDM
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Platform Learning Management System yang menghubungkan analisis kebutuhan pelatihan, 
            pelaksanaan pembelajaran, hingga sertifikasi digital dalam satu ekosistem.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-warning">1,200+</div>
              <div className="text-sm text-white/70">Karyawan Terdaftar</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-success">85%</div>
              <div className="text-sm text-white/70">Tingkat Penyelesaian</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-primary">150+</div>
              <div className="text-sm text-white/70">Kursus Tersedia</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">5,000+</div>
              <div className="text-sm text-white/70">Sertifikat Diterbitkan</div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-white/50">
          &copy; 2024 PT Pelita Indonesia Djaya. Hak Cipta Dilindungi.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sidebar">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-sidebar">LMS PID</h1>
              <p className="text-sm text-muted-foreground">Pelita Indonesia Djaya</p>
            </div>
          </div>

          <Card className="shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="font-serif text-2xl text-sidebar">Selamat Datang</CardTitle>
              <CardDescription>
                Masuk menggunakan akun Zentyal Active Directory Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@pelniservices.co.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-sidebar text-sidebar-foreground hover:bg-sidebar/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Masuk"
                  )}
                </Button>
              </form>

              {/* Quick Login for Demo */}
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Demo: Klik untuk login sebagai
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(["admin_sdm", "admin_content", "admin_divisi", "manager", "trainer", "peserta"] as UserRole[]).map((role) => {
                    const user = dummyUsers.find(u => u.role === role && u.status === "aktif")
                    return (
                      <Button
                        key={role}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickLogin(role)}
                        className="text-xs"
                      >
                        {roleLabels[role]}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Lupa password?{" "}
            <a href="#" className="text-primary hover:underline">
              Hubungi Admin SDM
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
