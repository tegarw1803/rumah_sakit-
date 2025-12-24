'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  Stethoscope,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
} from 'lucide-react'
import Link from 'next/link'
import { useHospital } from '@/lib/hospital-context'

const specialties = [
  'Penyakit Dalam',
  'Anak',
  'Bedah',
  'Kandungan',
  'Jantung',
  'Paru',
  'Saraf',
  'Kulit dan Kelamin',
  'Mata',
  'THT',
  'Orthopedi',
  'Urologi',
  'Psikiatri',
]

export default function DoctorsManagementPage() {
  const { doctors, updateDoctors } = useHospital()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<typeof doctors[0] | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
    bio: '',
    photo: null as File | null,
    isActive: true,
  })
  const { toast } = useToast()

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty
    return matchesSearch && matchesSpecialty
  })

  const handleAddDoctor = () => {
    setEditingDoctor(null)
    setFormData({
      name: '',
      specialty: '',
      phone: '',
      bio: '',
      photo: null,
      isActive: true,
    })
    setDialogOpen(true)
  }

  const handleEditDoctor = (doctor: typeof doctors[0]) => {
    setEditingDoctor(doctor)
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      phone: doctor.phone,
      bio: doctor.bio || '',
      photo: null,
      isActive: doctor.isActive,
    })
    setDialogOpen(true)
  }

  const handleDeleteDoctor = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus dokter ini?')) {
      const newDoctors = doctors.filter((d) => d.id !== id)
      updateDoctors(newDoctors)
      toast({
        title: "Berhasil",
        description: "Dokter berhasil dihapus",
      })
    }
  }

  const handleToggleActive = (id: string) => {
    const newDoctors = doctors.map((d) =>
      d.id === id ? { ...d, isActive: !d.isActive } : d
    )
    updateDoctors(newDoctors)
    toast({
      title: "Berhasil",
      description: "Status dokter berhasil diupdate",
    })
  }

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.specialty || !formData.phone) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field wajib",
        variant: "destructive",
      })
      return
    }

    let newDoctors
    if (editingDoctor) {
      newDoctors = doctors.map((d) =>
        d.id === editingDoctor.id
          ? { ...d, ...formData, photo: formData.photo ? 'photo-url' : d.photo }
          : d
      )
      toast({
        title: "Berhasil",
        description: "Data dokter berhasil diupdate",
      })
    } else {
      const newDoctor = {
        id: Date.now().toString(),
        ...formData,
        photo: formData.photo ? 'photo-url' : null,
      }
      newDoctors = [...doctors, newDoctor]
      toast({
        title: "Berhasil",
        description: "Dokter baru berhasil ditambahkan",
      })
    }

    updateDoctors(newDoctors)
    setDialogOpen(false)
    setFormData({
      name: '',
      specialty: '',
      phone: '',
      bio: '',
      photo: null,
      isActive: true,
    })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-sm sidebar-text">Admin Panel</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="sidebar-text">Menu Utama</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/dashboard">
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/admin/doctors">
                        <Users className="h-4 w-4" />
                        <span>Dokter</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/schedules">
                        <Calendar className="h-4 w-4" />
                        <span>Jadwal</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/appointments">
                        <Calendar className="h-4 w-4" />
                        <span>Janji Temu</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="sidebar-text">Pengaturan</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/content">
                        <FileText className="h-4 w-4" />
                        <span>Konten</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/settings">
                        <Settings className="h-4 w-4" />
                        <span>Pengaturan</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AD</span>
                </div>
                <div className="flex flex-col items-start sidebar-text">
                  <span className="text-sm font-medium">Admin</span>
                </div>
              </Button>
            </Link>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div>
                <h1 className="text-2xl font-bold">Manajemen Dokter</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola data dokter dan informasi praktik
                </p>
              </div>
              <Button
                onClick={handleAddDoctor}
                className="rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Dokter
              </Button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Filters */}
            <Card className="mb-6 border-2">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[250px]">
                    <Label htmlFor="search">Cari Dokter</Label>
                    <div className="relative">
                      <Input
                        id="search"
                        placeholder="Nama dokter..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="min-w-[200px]">
                    <Label htmlFor="specialty">Spesialisasi</Label>
                    <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Semua Spesialisasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Spesialisasi</SelectItem>
                        {specialties.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Doctors List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-4 border-cyan-100 dark:border-cyan-900">
                          <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-teal-500 text-white text-xl">
                            {doctor.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{doctor.name}</CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            {doctor.specialty}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditDoctor(doctor)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleActive(doctor.id)}>
                            {doctor.isActive ? (
                              <>
                                <div className="h-4 w-4 mr-2 opacity-50 line-through">
                                  <Settings className="h-4 w-4" />
                                </div>
                                Nonaktifkan
                              </>
                            ) : (
                              <>
                                <div className="h-4 w-4 mr-2">
                                  <Settings className="h-4 w-4" />
                                </div>
                                Aktifkan
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteDoctor(doctor.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-4 w-4" />
                      <span>{doctor.phone}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {doctor.bio}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={doctor.isActive ? 'default' : 'secondary'}
                        className={
                          doctor.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                        }
                      >
                        {doctor.isActive ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingDoctor ? 'Edit Dokter' : 'Tambah Dokter Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingDoctor ? 'Update data dokter' : 'Tambahkan dokter baru ke sistem'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveDoctor} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Dokter *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Nama Lengkap, Sp.XX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Spesialisasi *</Label>
                <Select
                  value={formData.specialty}
                  onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                  required
                >
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Pilih Spesialisasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="081234567890"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio / Deskripsi</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Deskripsi singkat tentang dokter"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Foto Dokter</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-cyan-100 dark:border-cyan-900">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-teal-500">
                    {formData.name ? formData.name.split(' ').slice(0, 2).map((n) => n[0]).join('') : 'DK'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setFormData({ ...formData, photo: file })
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: JPG, PNG. Maksimal 2MB
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Dokter Aktif
              </Label>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
              >
                {editingDoctor ? 'Update' : 'Simpan'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
