"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Camera,
  Mail,
  Phone,
  Building2,
  Key,
  Eye,
  EyeOff,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { roleLabels } from "@/lib/data/users"
import { toast } from "sonner"
import { PageHeader } from "@/components/dashboard/page-header"

export default function PengaturanPage() {
  const { user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [trainingReminders, setTrainingReminders] = useState(true)
  const [approvalNotifications, setApprovalNotifications] = useState(true)
  const [certificateNotifications, setCertificateNotifications] = useState(true)

  // Display settings
  const [timezone, setTimezone] = useState("Asia/Jakarta")
  const [dateFormat, setDateFormat] = useState("dd/MM/yyyy")

  const handleSave = (section: string) => {
    toast.success("Perubahan disimpan", { description: section })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        className="mb-0"
        title="Pengaturan"
        description="Kelola pengaturan akun dan preferensi Anda"
      />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifikasi</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Keamanan</span>
          </TabsTrigger>
          <TabsTrigger value="display" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Tampilan</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Informasi Profil</CardTitle>
              <CardDescription>Kelola informasi profil dan data pribadi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-secondary text-white text-2xl">
                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Camera className="w-4 h-4" />
                    Ubah Foto
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG maks. 2MB
                  </p>
                </div>
              </div>

              <Separator />

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Lengkap</Label>
                  <Input defaultValue={user?.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label>NIP</Label>
                  <Input defaultValue={user?.nip || ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input defaultValue={user?.email || ""} className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nomor Telepon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input defaultValue={user?.phone || ""} className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Divisi</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input defaultValue={user?.division || ""} disabled className="pl-9 bg-muted" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Jabatan</Label>
                  <Input defaultValue={user?.position || ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Job Family</Label>
                  <Input defaultValue={user?.jobFamily || ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input defaultValue={user?.role ? roleLabels[user.role] : ""} disabled className="bg-muted" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Profil")} className="gap-2 bg-secondary hover:bg-secondary/90">
                  <Save aria-hidden="true" className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Pengaturan Notifikasi</CardTitle>
              <CardDescription>Kelola bagaimana Anda menerima notifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* General Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium">Umum</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifikasi Email</p>
                      <p className="text-sm text-muted-foreground">Terima notifikasi via email</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifikasi Push</p>
                      <p className="text-sm text-muted-foreground">Terima notifikasi di browser</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Training Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium">Pelatihan</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pengingat Pelatihan</p>
                      <p className="text-sm text-muted-foreground">Ingatkan deadline pelatihan</p>
                    </div>
                    <Switch checked={trainingReminders} onCheckedChange={setTrainingReminders} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Update Persetujuan</p>
                      <p className="text-sm text-muted-foreground">Notifikasi status pengajuan pelatihan</p>
                    </div>
                    <Switch checked={approvalNotifications} onCheckedChange={setApprovalNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sertifikat Baru</p>
                      <p className="text-sm text-muted-foreground">Notifikasi saat sertifikat diterbitkan</p>
                    </div>
                    <Switch checked={certificateNotifications} onCheckedChange={setCertificateNotifications} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Notifikasi")} className="gap-2 bg-secondary hover:bg-secondary/90">
                  <Save aria-hidden="true" className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Keamanan Akun</CardTitle>
              <CardDescription>Kelola keamanan akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Change Password */}
              <div className="space-y-4">
                <h4 className="font-medium">Ubah Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Password Lama</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Masukkan password lama" 
                        className="pl-9 pr-9" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                        aria-pressed={showPassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff aria-hidden="true" className="w-4 h-4" /> : <Eye aria-hidden="true" className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div />
                  <div className="space-y-2">
                    <Label>Password Baru</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Masukkan password baru" 
                        className="pl-9" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Konfirmasi Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Konfirmasi password baru" 
                        className="pl-9" 
                      />
                    </div>
                  </div>
                </div>
                <Button variant="outline">Ubah Password</Button>
              </div>

              <Separator />

              {/* Login History */}
              <div className="space-y-4">
                <h4 className="font-medium">Riwayat Login</h4>
                <div className="space-y-3">
                  {[
                    { device: "Chrome di Windows", location: "Jakarta, Indonesia", time: "Hari ini, 08:30", current: true },
                    { device: "Safari di iPhone", location: "Jakarta, Indonesia", time: "Kemarin, 18:45", current: false },
                    { device: "Chrome di macOS", location: "Surabaya, Indonesia", time: "3 hari lalu", current: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <p className="text-sm text-muted-foreground">{session.location} - {session.time}</p>
                      </div>
                      {session.current ? (
                        <span className="text-xs text-emerald-600 font-medium">Sesi Aktif</span>
                      ) : (
                        <Button variant="outline" size="sm">Logout</Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Display Settings */}
        <TabsContent value="display" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Preferensi Tampilan</CardTitle>
              <CardDescription>Sesuaikan tampilan aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language & Region */}
              <div className="space-y-4">
                <h4 className="font-medium">Wilayah & Format</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Zona Waktu</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Jakarta">WIB (Jakarta)</SelectItem>
                        <SelectItem value="Asia/Makassar">WITA (Makassar)</SelectItem>
                        <SelectItem value="Asia/Jayapura">WIT (Jayapura)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Format Tanggal</Label>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Theme */}
              <div className="space-y-4">
                <h4 className="font-medium">Tema</h4>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 border-2 border-secondary rounded-lg text-center">
                    <div className="w-full h-8 bg-white rounded mb-2 border" />
                    <span className="text-sm font-medium">Terang</span>
                  </button>
                  <button className="p-4 border rounded-lg text-center hover:border-secondary">
                    <div className="w-full h-8 bg-gray-800 rounded mb-2" />
                    <span className="text-sm font-medium">Gelap</span>
                  </button>
                  <button className="p-4 border rounded-lg text-center hover:border-secondary">
                    <div className="w-full h-8 bg-gradient-to-r from-white to-gray-800 rounded mb-2" />
                    <span className="text-sm font-medium">Sistem</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Tampilan & Wilayah")} className="gap-2 bg-secondary hover:bg-secondary/90">
                  <Save aria-hidden="true" className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
