'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Stethoscope,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Menu,
  Bell,
} from 'lucide-react'
import Link from 'next/link'

// Mock data
const statsData = {
  totalDoctors: 12,
  activeSchedules: 8,
  totalAppointments: 45,
  todayAppointments: 6,
}

const recentAppointments = [
  {
    id: 1,
    patientName: 'Ahmad Fauzi',
    doctorName: 'Dr. Ahmad Santoso, Sp.PD',
    visitDate: '2024-01-15',
    status: 'pending',
  },
  {
    id: 2,
    patientName: 'Siti Aminah',
    doctorName: 'Dr. Maya Kartika, Sp.A',
    visitDate: '2024-01-15',
    status: 'confirmed',
  },
  {
    id: 3,
    patientName: 'Budi Santoso',
    doctorName: 'Dr. Budi Pratama, Sp.B',
    visitDate: '2024-01-14',
    status: 'completed',
  },
  {
    id: 4,
    patientName: 'Rina Wijaya',
    doctorName: 'Dr. Siti Rahayu, Sp.OG',
    visitDate: '2024-01-14',
    status: 'cancelled',
  },
]

const todaySchedules = [
  {
    id: 1,
    doctorName: 'Dr. Ahmad Santoso, Sp.PD',
    day: 'Senin',
    time: '08:00 - 12:00',
    poli: 'Penyakit Dalam',
  },
  {
    id: 2,
    doctorName: 'Dr. Maya Kartika, Sp.A',
    day: 'Senin',
    time: '09:00 - 13:00',
    poli: 'Anak',
  },
  {
    id: 3,
    doctorName: 'Dr. Budi Pratama, Sp.B',
    day: 'Senin',
    time: '10:00 - 14:00',
    poli: 'Bedah',
  },
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

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar
          collapsible="icon"
          className={sidebarOpen ? '' : 'w-[70px]'}
        >
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
                    <SidebarMenuButton asChild isActive>
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
                        <Clock className="h-4 w-4" />
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-teal-500 text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start sidebar-text">
                    <span className="text-sm font-medium">Admin</span>
                    <span className="text-xs text-muted-foreground">admin@rs.com</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Pengaturan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    Selamat datang di panel admin RS Sehat Selalu
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Link href="/">
                  <Button variant="outline" size="sm">
                    Lihat Website
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium">Total Dokter</CardTitle>
                  <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                    {statsData.totalDoctors}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dokter aktif
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium">Jadwal Hari Ini</CardTitle>
                  <Clock className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                    {statsData.activeSchedules}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Jadwal aktif
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium">Total Janji Temu</CardTitle>
                  <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                    {statsData.totalAppointments}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Bulan ini
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium">Janji Temu Hari Ini</CardTitle>
                  <CheckCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                    {statsData.todayAppointments}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Menunggu konfirmasi
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Appointments */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Janji Temu Terbaru</CardTitle>
                  <CardDescription>Pendaftaran janji temu terbaru</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {recentAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-start gap-4 p-4 rounded-lg border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {appointment.patientName}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {appointment.doctorName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {appointment.visitDate}
                            </p>
                          </div>
                          <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                            {statusLabels[appointment.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Today's Schedules */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Jadwal Hari Ini</CardTitle>
                  <CardDescription>Jadwal praktik dokter hari ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {todaySchedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="p-4 rounded-lg border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                              <Stethoscope className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {schedule.doctorName}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Clock className="h-3 w-3" />
                                {schedule.time}
                              </div>
                              <Badge variant="secondary" className="mt-2">
                                {schedule.poli}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
