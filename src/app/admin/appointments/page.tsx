'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from 'lucide-react'
import Link from 'next/link'

// Mock data
const appointmentsData = [
  {
    id: '1',
    patientName: 'Ahmad Fauzi',
    phone: '081234567890',
    doctorName: 'Dr. Ahmad Santoso, Sp.PD',
    visitDate: '2024-01-15',
    notes: 'Keluhan sakit kepala dan demam',
    status: 'pending',
  },
  {
    id: '2',
    patientName: 'Siti Aminah',
    phone: '081234567891',
    doctorName: 'Dr. Maya Kartika, Sp.A',
    visitDate: '2024-01-15',
    notes: 'Check-up rutin anak',
    status: 'confirmed',
  },
  {
    id: '3',
    patientName: 'Budi Santoso',
    phone: '081234567892',
    doctorName: 'Dr. Budi Pratama, Sp.B',
    visitDate: '2024-01-14',
    notes: 'Konsultasi pasca operasi',
    status: 'completed',
  },
  {
    id: '4',
    patientName: 'Rina Wijaya',
    phone: '081234567893',
    doctorName: 'Dr. Siti Rahayu, Sp.OG',
    visitDate: '2024-01-14',
    notes: 'Pemeriksaan kehamilan',
    status: 'cancelled',
  },
  {
    id: '5',
    patientName: 'Dewi Lestari',
    phone: '081234567894',
    doctorName: 'Dr. Ahmad Santoso, Sp.PD',
    visitDate: '2024-01-16',
    notes: 'Keluhan sesak napas',
    status: 'pending',
  },
  {
    id: '6',
    patientName: 'Eko Prasetyo',
    phone: '081234567895',
    doctorName: 'Dr. Maya Kartika, Sp.A',
    visitDate: '2024-01-16',
    notes: 'Imunisasi',
    status: 'confirmed',
  },
]

const statusOptions = [
  { value: 'all', label: 'Semua Status' },
  { value: 'pending', label: 'Menunggu' },
  { value: 'confirmed', label: 'Dikonfirmasi' },
  { value: 'completed', label: 'Selesai' },
  { value: 'cancelled', label: 'Dibatalkan' },
]

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

const statusLabels = {
  pending: 'Menunggu',
  confirmed: 'Dikonfirmasi',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
}

export default function AppointmentsManagementPage() {
  const [appointments, setAppointments] = useState(appointmentsData)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const { toast } = useToast()

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status: newStatus as any } : a
      )
    )
    toast({
      title: "Berhasil",
      description: `Status janji temu diupdate menjadi ${statusLabels[newStatus as keyof typeof statusLabels]}`,
    })
  }

  const handleDeleteAppointment = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus janji temu ini?')) {
      setAppointments(appointments.filter((a) => a.id !== id))
      toast({
        title: "Berhasil",
        description: "Janji temu berhasil dihapus",
      })
    }
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
                    <SidebarMenuButton asChild>
                      <Link href="/admin/schedules">
                        <Calendar className="h-4 w-4" />
                        <span>Jadwal</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
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
                <h1 className="text-2xl font-bold">Manajemen Janji Temu</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola pendaftaran janji temu pasien
                </p>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Filters */}
            <Card className="mb-6 border-2">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[250px]">
                    <Label htmlFor="search">Cari Janji Temu</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Nama pasien atau dokter..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="min-w-[200px]">
                    <Label htmlFor="status">Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Semua Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointments List */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Daftar Janji Temu</CardTitle>
                <CardDescription>
                  Total {filteredAppointments.length} janji temu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-4 rounded-lg border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                              <Calendar className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <p className="font-medium">{appointment.patientName}</p>
                                <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                                  {statusLabels[appointment.status as keyof typeof statusLabels]}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                {appointment.doctorName}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {appointment.visitDate}
                                </div>
                                <span>•</span>
                                <span>{appointment.phone}</span>
                              </div>
                              {appointment.notes && (
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                  {appointment.notes}
                                </p>
                              )}
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
                              {appointment.status === 'pending' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Konfirmasi
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'completed')}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Selesai
                                  </DropdownMenuItem>
                                </>
                              )}
                              {appointment.status === 'confirmed' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'completed')}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Selesai
                                  </DropdownMenuItem>
                                </>
                              )}
                              {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Batalkan
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteAppointment(appointment.id)}
                              >
                                <MoreHorizontal className="h-4 w-4 mr-2" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
