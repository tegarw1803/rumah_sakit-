'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
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
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useHospital } from '@/lib/hospital-context'

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
const polis = [
  'Poli Umum',
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
]

export default function SchedulesManagementPage() {
  const { doctors, schedules, updateSchedules } = useHospital()
  const [filterDoctor, setFilterDoctor] = useState('all')
  const [filterDay, setFilterDay] = useState('all')
  const [filterPoli, setFilterPoli] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<typeof schedules[0] | null>(null)
  const [formData, setFormData] = useState({
    doctorId: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    poli: '',
    isActive: true,
  })
  const { toast } = useToast()

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesDoctor = filterDoctor === 'all' || schedule.doctorId === filterDoctor
    const matchesDay = filterDay === 'all' || schedule.dayOfWeek === filterDay
    const matchesPoli = filterPoli === 'all' || schedule.poli === filterPoli
    return matchesDoctor && matchesDay && matchesPoli
  })

  const handleAddSchedule = () => {
    setEditingSchedule(null)
    setFormData({
      doctorId: '',
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      poli: '',
      isActive: true,
    })
    setDialogOpen(true)
  }

  const handleEditSchedule = (schedule: typeof schedules[0]) => {
    setEditingSchedule(schedule)
    setFormData({
      doctorId: schedule.doctorId,
      dayOfWeek: schedule.dayOfWeek,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      poli: schedule.poli,
      isActive: schedule.isActive,
    })
    setDialogOpen(true)
  }

  const handleDeleteSchedule = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      const newSchedules = schedules.filter((s) => s.id !== id)
      updateSchedules(newSchedules)
      toast({
        title: "Berhasil",
        description: "Jadwal berhasil dihapus",
      })
    }
  }

  const handleToggleActive = (id: string) => {
    const newSchedules = schedules.map((s) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    )
    updateSchedules(newSchedules)
    toast({
      title: "Berhasil",
      description: "Status jadwal berhasil diupdate",
    })
  }

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.doctorId || !formData.dayOfWeek || !formData.startTime || !formData.endTime || !formData.poli) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field wajib",
        variant: "destructive",
      })
      return
    }

    const doctor = doctors.find((d) => d.id === formData.doctorId)

    let newSchedules
    if (editingSchedule) {
      newSchedules = schedules.map((s) =>
        s.id === editingSchedule.id
          ? { ...s, ...formData, doctorName: doctor?.name || '' }
          : s
      )
      toast({
        title: "Berhasil",
        description: "Jadwal berhasil diupdate",
      })
    } else {
      const newSchedule = {
        id: Date.now().toString(),
        ...formData,
        doctorName: doctor?.name || '',
      }
      newSchedules = [...schedules, newSchedule]
      toast({
        title: "Berhasil",
        description: "Jadwal baru berhasil ditambahkan",
      })
    }

    updateSchedules(newSchedules)
    setDialogOpen(false)
    setFormData({
      doctorId: '',
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      poli: '',
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
                    <SidebarMenuButton asChild>
                      <Link href="/admin/doctors">
                        <Users className="h-4 w-4" />
                        <span>Dokter</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
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
                <h1 className="text-2xl font-bold">Manajemen Jadwal</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola jadwal praktik dokter
                </p>
              </div>
              <Button
                onClick={handleAddSchedule}
                className="rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Jadwal
              </Button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Filters */}
            <Card className="mb-6 border-2">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="filterDoctor">Dokter</Label>
                    <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                      <SelectTrigger id="filterDoctor">
                        <SelectValue placeholder="Semua Dokter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Dokter</SelectItem>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filterDay">Hari</Label>
                    <Select value={filterDay} onValueChange={setFilterDay}>
                      <SelectTrigger id="filterDay">
                        <SelectValue placeholder="Semua Hari" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Hari</SelectItem>
                        {days.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filterPoli">Poli</Label>
                    <Select value={filterPoli} onValueChange={setFilterPoli}>
                      <SelectTrigger id="filterPoli">
                        <SelectValue placeholder="Semua Poli" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Poli</SelectItem>
                        {polis.map((poli) => (
                          <SelectItem key={poli} value={poli}>
                            {poli}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedules List */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Daftar Jadwal</CardTitle>
                <CardDescription>
                  Total {filteredSchedules.length} jadwal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredSchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{schedule.doctorName}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <Badge variant="outline">{schedule.dayOfWeek}</Badge>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                            <Badge variant="secondary">{schedule.poli}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={schedule.isActive ? 'default' : 'secondary'}
                          className={
                            schedule.isActive
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          }
                        >
                          {schedule.isActive ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditSchedule(schedule)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleActive(schedule.id)}>
                              {schedule.isActive ? (
                                <>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Nonaktifkan
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Aktifkan
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteSchedule(schedule.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingSchedule ? 'Update jadwal praktik' : 'Tambahkan jadwal praktik baru'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveSchedule} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctorId">Dokter *</Label>
              <Select
                value={formData.doctorId}
                onValueChange={(value) => setFormData({ ...formData, doctorId: value })}
                required
              >
                <SelectTrigger id="doctorId">
                  <SelectValue placeholder="Pilih Dokter" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dayOfWeek">Hari *</Label>
                <Select
                  value={formData.dayOfWeek}
                  onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value })}
                  required
                >
                  <SelectTrigger id="dayOfWeek">
                    <SelectValue placeholder="Pilih Hari" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="poli">Poli *</Label>
                <Select
                  value={formData.poli}
                  onValueChange={(value) => setFormData({ ...formData, poli: value })}
                  required
                >
                  <SelectTrigger id="poli">
                    <SelectValue placeholder="Pilih Poli" />
                  </SelectTrigger>
                  <SelectContent>
                    {polis.map((poli) => (
                      <SelectItem key={poli} value={poli}>
                        {poli}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Jam Mulai *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Jam Selesai *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Jadwal Aktif
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
                {editingSchedule ? 'Update' : 'Simpan'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
