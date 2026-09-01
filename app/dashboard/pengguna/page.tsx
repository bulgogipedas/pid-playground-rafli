"use client"

import { useState } from "react"
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  RefreshCw, 
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { dummyUsers, User, roleLabels, UserRole, divisions, jobFamilies } from "@/lib/data/users"
import { toast } from "sonner"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { downloadCsv } from "@/lib/client-actions"

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(dummyUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [divisionFilter, setDivisionFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [newUser, setNewUser] = useState({
    nip: "", name: "", email: "", role: "peserta" as UserRole, division: "", jobFamily: "", position: "", phone: "",
  })

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nip.includes(searchQuery)
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesDivision = divisionFilter === "all" || user.division === divisionFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesDivision && matchesStatus
  })

  // Stats
  const activeUsers = users.filter(u => u.status === "aktif").length
  const totalUsers = users.length

  const handleSync = async () => {
    setIsSyncing(true)
    const syncToast = toast.loading("Menyinkronkan data HCIS...")
    // Simulate HCIS sync
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSyncing(false)
    toast.success("Sinkronisasi HCIS selesai", {
      id: syncToast,
      description: `${users.length} data pengguna diperbarui`,
    })
  }

  const toggleUserStatus = (userId: string) => {
    const target = users.find(u => u.id === userId)
    const nextStatus = target?.status === "aktif" ? "nonaktif" : "aktif"
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "aktif" ? "nonaktif" : "aktif" }
        : user
    ))
    if (target) {
      toast.success(
        nextStatus === "aktif" ? "Pengguna diaktifkan" : "Pengguna dinonaktifkan",
        { description: target.name },
      )
    }
  }

  const addUser = () => {
    if (!newUser.nip || !newUser.name || !newUser.email || !newUser.division || !newUser.jobFamily) {
      toast.error("Lengkapi data wajib pengguna")
      return
    }
    const user: User = {
      id: `USR${Date.now()}`,
      ...newUser,
      joinDate: new Date().toISOString().split("T")[0],
      status: "aktif",
    }
    setUsers((current) => [user, ...current])
    setNewUser({ nip: "", name: "", email: "", role: "peserta", division: "", jobFamily: "", position: "", phone: "" })
    setIsAddDialogOpen(false)
    toast.success("Pengguna ditambahkan", { description: user.name })
  }

  const editUser = (user: User) => {
    const name = window.prompt("Nama lengkap", user.name)?.trim()
    if (!name) return
    const position = window.prompt("Jabatan", user.position)?.trim() || user.position
    setUsers((current) => current.map((item) => item.id === user.id ? { ...item, name, position } : item))
    toast.success("Data pengguna diperbarui", { description: name })
  }

  const deleteUser = (user: User) => {
    setUsers((current) => current.filter((item) => item.id !== user.id))
    toast.success("Pengguna dihapus", { description: user.name })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Kelola Pengguna" },
        ]}
        title="Kelola Pengguna"
        description="Kelola pengguna sistem LMS dan sinkronisasi data HCIS"
        actions={
          <>
          <Button 
            variant="outline" 
            onClick={handleSync}
            disabled={isSyncing}
          >
            <RefreshCw aria-hidden="true" className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Menyinkronkan...' : 'Sinkronisasi HCIS'}
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus aria-hidden="true" className="w-4 h-4 mr-2" />
                Tambah Pengguna
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="font-serif text-[#233873]">Tambah Pengguna Manual</DialogTitle>
                <DialogDescription>
                  Untuk pengguna yang tidak terdaftar di HCIS (contoh: kontraktor)
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nip">NIP</Label>
                    <Input id="nip" placeholder="Nomor Induk Pegawai" value={newUser.nip} onChange={(event) => setNewUser({ ...newUser, nip: event.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="Nama lengkap" value={newUser.name} onChange={(event) => setNewUser({ ...newUser, name: event.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@pyfa.co.id" value={newUser.email} onChange={(event) => setNewUser({ ...newUser, email: event.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUser.role} onValueChange={(role) => setNewUser({ ...newUser, role: role as UserRole })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="peserta">Peserta</SelectItem>
                        <SelectItem value="trainer">Trainer</SelectItem>
                        <SelectItem value="admin_divisi">Admin Divisi</SelectItem>
                        <SelectItem value="admin_sdm">Admin SDM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="division">Divisi</Label>
                    <Select value={newUser.division} onValueChange={(division) => setNewUser({ ...newUser, division })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih divisi" />
                      </SelectTrigger>
                      <SelectContent>
                        {divisions.map(div => (
                          <SelectItem key={div} value={div}>{div}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobFamily">Job Family</Label>
                    <Select value={newUser.jobFamily} onValueChange={(jobFamily) => setNewUser({ ...newUser, jobFamily })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih job family" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobFamilies.map(jf => (
                          <SelectItem key={jf} value={jf}>{jf}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Jabatan</Label>
                    <Input id="position" placeholder="Jabatan" value={newUser.position} onChange={(event) => setNewUser({ ...newUser, position: event.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input id="phone" placeholder="08xxxxxxxxxx" value={newUser.phone} onChange={(event) => setNewUser({ ...newUser, phone: event.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={addUser}>
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-lg border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pengguna Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{activeUsers}</div>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pengguna Nonaktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{totalUsers - activeUsers}</div>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sinkronisasi Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-[#233873]">15 Jan 2024, 08:30</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-lg border border-gray-100 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, email, atau NIP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Semua Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Role</SelectItem>
                  <SelectItem value="admin_sdm">Admin SDM</SelectItem>
                  <SelectItem value="admin_divisi">Admin Divisi</SelectItem>
                  <SelectItem value="trainer">Trainer</SelectItem>
                  <SelectItem value="peserta">Peserta</SelectItem>
                </SelectContent>
              </Select>
              <Select value={divisionFilter} onValueChange={setDivisionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Divisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Divisi</SelectItem>
                  {divisions.map(div => (
                    <SelectItem key={div} value={div}>{div}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="aktif">Aktif</SelectItem>
                  <SelectItem value="nonaktif">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                aria-label="Ekspor pengguna"
                onClick={() => { downloadCsv("pengguna-pyfa-lms", filteredUsers); toast.success("Data pengguna diekspor") }}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="rounded-lg border border-border shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Divisi</TableHead>
                <TableHead>Job Family</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                    Tidak ada pengguna yang cocok dengan filter.
                  </TableCell>
                </TableRow>
              )}
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{user.nip}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        user.role === 'admin_sdm' ? 'border-warning text-warning' :
                        user.role === 'admin_divisi' ? 'border-primary text-primary' :
                        user.role === 'trainer' ? 'border-success text-success' :
                        'border-border text-muted-foreground'
                      }
                    >
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.division}</TableCell>
                  <TableCell className="text-sm">{user.jobFamily}</TableCell>
                  <TableCell>
                    <StatusBadge tone={user.status === 'aktif' ? 'success' : 'danger'}>
                      {user.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label={`Aksi untuk ${user.name}`}>
                          <MoreHorizontal aria-hidden="true" className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => editUser(user)}>
                          <Edit aria-hidden="true" className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                          {user.status === 'aktif' ? (
                            <>
                              <UserX aria-hidden="true" className="w-4 h-4 mr-2" />
                              Nonaktifkan
                            </>
                          ) : (
                            <>
                              <UserCheck aria-hidden="true" className="w-4 h-4 mr-2" />
                              Aktifkan
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteUser(user)}>
                          <Trash2 aria-hidden="true" className="w-4 h-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
