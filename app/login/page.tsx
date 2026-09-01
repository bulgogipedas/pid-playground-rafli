"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from "lucide-react"
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
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-[#090909] p-12 text-white lg:flex lg:w-1/2">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_30%_100%,rgba(168,85,247,0.55),transparent_48%),radial-gradient(circle_at_80%_90%,rgba(236,72,153,0.38),transparent_42%)]" />
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-[58px] w-[166px] items-center rounded-[14px] bg-[#fff] px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,.3)]">
              <Image src="/pyridam-farma-logo.png" alt="Logo PT Pyridam Farma Tbk" width={300} height={105} priority className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-medium tracking-[-0.04em]">Learning</h1>
              <p className="text-sm text-white/55">Learning Management System</p>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">Grow with purpose</p>
          <h2 className="max-w-xl text-balance font-serif text-6xl font-medium leading-[0.9] tracking-[-0.06em]">
            Belajar hari ini. Berdampak esok hari.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/65">
            Satu ruang belajar untuk mengembangkan kapabilitas insan Pyridam—dari kebutuhan kompetensi hingga sertifikasi.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="rounded-[20px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
              <div className="text-3xl font-medium tracking-[-0.04em]">1,200+</div>
              <div className="text-sm text-white/70">Karyawan Terdaftar</div>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
              <div className="text-3xl font-medium tracking-[-0.04em]">85%</div>
              <div className="text-sm text-white/70">Tingkat Penyelesaian</div>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
              <div className="text-3xl font-medium tracking-[-0.04em]">150+</div>
              <div className="text-sm text-white/70">Kursus Tersedia</div>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
              <div className="text-3xl font-medium tracking-[-0.04em]">5,000+</div>
              <div className="text-sm text-white/70">Sertifikat Diterbitkan</div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-white/50">
          &copy; 2026 PT Pyridam Farma Tbk. Hak Cipta Dilindungi.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-[54px] w-[154px] items-center rounded-[13px] bg-[#fff] px-3 py-2 shadow-[0_10px_28px_rgba(0,0,0,.24)]">
              <Image src="/pyridam-farma-logo.png" alt="Logo PT Pyridam Farma Tbk" width={300} height={105} priority className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-medium tracking-[-0.04em] text-foreground">Learning</h1>
              <p className="text-xs text-muted-foreground">Learning Management System</p>
            </div>
          </div>

          <Card className="shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="font-serif text-3xl font-medium tracking-[-0.04em] text-foreground">Selamat datang</CardTitle>
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
                    placeholder="nama@pyfa.co.id"
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
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>Masuk <ArrowRight className="ml-1 h-4 w-4" /></>
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
            <a href="mailto:learning@pyfa.co.id?subject=Permintaan%20reset%20password%20PYFA%20LMS" className="text-primary hover:underline">
              Hubungi Admin SDM
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
