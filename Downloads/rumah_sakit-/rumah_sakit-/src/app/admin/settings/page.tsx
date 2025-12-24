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
import { useToast } from '@/hooks/use-toast'
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
  Save,
  Upload,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'
import { useHospital } from '@/lib/hospital-context'

export default function SettingsPage() {
  const { siteSettings, updateSiteSettings } = useHospital()
  const [activeTab, setActiveTab] = useState('general')
  const [formData, setFormData] = useState({
    hospitalName: '',
    tagline: '',
    email: '',
    phone: '',
  })
  const [brandingData, setBrandingData] = useState({
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
  })
  const [themeData, setThemeData] = useState({
    primaryColor: 'cyan',
    darkModeEnabled: true,
  })
  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
  })
  const { toast } = useToast()

  // Load settings from context
  useEffect(() => {
    setFormData({
      hospitalName: siteSettings.hospitalName,
      tagline: siteSettings.tagline,
      email: siteSettings.email,
      phone: siteSettings.phone,
    })
    setBrandingData({
      facebookUrl: siteSettings.facebookUrl,
      twitterUrl: siteSettings.twitterUrl,
      instagramUrl: siteSettings.instagramUrl,
      youtubeUrl: siteSettings.youtubeUrl,
    })
  }, [siteSettings])

  const handleSaveGeneral = () => {
    updateSiteSettings(formData)
    toast({
      title: "Berhasil",
      description: "Pengaturan umum berhasil disimpan",
    })
  }

  const handleSaveBranding = () => {
    updateSiteSettings(brandingData)
    toast({
      title: "Berhasil",
      description: "Pengaturan branding berhasil disimpan",
    })
  }

  const handleSaveTheme = () => {
    toast({
      title: "Berhasil",
      description: "Pengaturan tema berhasil disimpan",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Berhasil",
      description: "Pengaturan notifikasi berhasil disimpan",
    })
  }

  const renderGeneralForm = () => (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Pengaturan Umum</CardTitle>
        <CardDescription>Konfigurasi informasi dasar rumah sakit</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hospitalName">Nama Rumah Sakit *</Label>
          <Input
            id="hospitalName"
            value={formData.hospitalName}
            onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telepon *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
        <Button
          onClick={handleSaveGeneral}
          className="w-full rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Simpan Perubahan
        </Button>
      </CardContent>
    </Card>
  )

  const renderBrandingForm = () => (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Branding</CardTitle>
        <CardDescription>Kelola logo, favicon, dan media sosial</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setBrandingData({ ...brandingData, logo: file })
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: PNG, SVG. Maksimal 1MB
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="favicon">Favicon</Label>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <Input
                  id="favicon"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setBrandingData({ ...brandingData, favicon: file })
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: ICO, PNG. 16x16 atau 32x32px
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-semibold">Media Sosial</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <Label htmlFor="facebook" className="sr-only">Facebook</Label>
                <Input
                  id="facebook"
                  placeholder="URL Facebook"
                  value={brandingData.facebookUrl}
                  onChange={(e) => setBrandingData({ ...brandingData, facebookUrl: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Twitter className="h-5 w-5 text-sky-500" />
              <div className="flex-1">
                <Label htmlFor="twitter" className="sr-only">Twitter</Label>
                <Input
                  id="twitter"
                  placeholder="URL Twitter"
                  value={brandingData.twitterUrl}
                  onChange={(e) => setBrandingData({ ...brandingData, twitterUrl: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5 text-pink-600" />
              <div className="flex-1">
                <Label htmlFor="instagram" className="sr-only">Instagram</Label>
                <Input
                  id="instagram"
                  placeholder="URL Instagram"
                  value={brandingData.instagramUrl}
                  onChange={(e) => setBrandingData({ ...brandingData, instagramUrl: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <Label htmlFor="youtube" className="sr-only">YouTube</Label>
                <Input
                  id="youtube"
                  placeholder="URL YouTube"
                  value={brandingData.youtubeUrl}
                  onChange={(e) => setBrandingData({ ...brandingData, youtubeUrl: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSaveBranding}
          className="w-full rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Simpan Perubahan
        </Button>
      </CardContent>
    </Card>
  )

  const renderThemeForm = () => (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Tema Tampilan</CardTitle>
        <CardDescription>Konfigurasi tampilan website dan dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Warna Utama</Label>
          <Select value={themeData.primaryColor} onValueChange={(value) => setThemeData({ ...themeData, primaryColor: value })}>
            <SelectTrigger id="primaryColor">
              <SelectValue placeholder="Pilih Warna" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cyan">Cyan</SelectItem>
              <SelectItem value="teal">Teal</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="green">Green</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="darkMode">Mode Gelap</Label>
            <p className="text-sm text-muted-foreground">
              Izinkan pengguna menggunakan tema gelap
            </p>
          </div>
          <Switch
            id="darkMode"
            checked={themeData.darkModeEnabled}
            onCheckedChange={(checked) => setThemeData({ ...themeData, darkModeEnabled: checked })}
          />
        </div>
        <Button
          onClick={handleSaveTheme}
          className="w-full rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Simpan Perubahan
        </Button>
      </CardContent>
    </Card>
  )

  const renderNotificationsForm = () => (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Notifikasi</CardTitle>
        <CardDescription>Konfigurasi notifikasi sistem</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotif">Notifikasi Email</Label>
            <p className="text-sm text-muted-foreground">
              Kirim notifikasi ke email untuk aktivitas penting
            </p>
          </div>
          <Switch
            id="emailNotif"
            checked={notificationData.emailNotifications}
            onCheckedChange={(checked) => setNotificationData({ ...notificationData, emailNotifications: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="smsNotif">Notifikasi SMS</Label>
            <p className="text-sm text-muted-foreground">
              Kirim notifikasi SMS untuk janji temu penting
            </p>
          </div>
          <Switch
            id="smsNotif"
            checked={notificationData.smsNotifications}
            onCheckedChange={(checked) => setNotificationData({ ...notificationData, smsNotifications: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="reminderNotif">Pengingat Janji Temu</Label>
            <p className="text-sm text-muted-foreground">
              Kirim pengingat otomatis sebelum janji temu
            </p>
          </div>
          <Switch
            id="reminderNotif"
            checked={notificationData.appointmentReminders}
            onCheckedChange={(checked) => setNotificationData({ ...notificationData, appointmentReminders: checked })}
          />
        </div>
        <Button
          onClick={handleSaveNotifications}
          className="w-full rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Simpan Perubahan
        </Button>
      </CardContent>
    </Card>
  )

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
                    <SidebarMenuButton asChild isActive>
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
                <h1 className="text-2xl font-bold">Pengaturan Website</h1>
                <p className="text-sm text-muted-foreground">
                  Konfigurasi website dan sistem
                </p>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Settings Menu */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Kategori</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={activeTab === 'general' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${
                      activeTab === 'general' ? 'bg-cyan-500 text-white hover:bg-cyan-600' : ''
                    }`}
                    onClick={() => setActiveTab('general')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Umum
                  </Button>
                  <Button
                    variant={activeTab === 'branding' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${
                      activeTab === 'branding' ? 'bg-cyan-500 text-white hover:bg-cyan-600' : ''
                    }`}
                    onClick={() => setActiveTab('branding')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Branding
                  </Button>
                  <Button
                    variant={activeTab === 'theme' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${
                      activeTab === 'theme' ? 'bg-cyan-500 text-white hover:bg-cyan-600' : ''
                    }`}
                    onClick={() => setActiveTab('theme')}
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Tema
                  </Button>
                  <Button
                    variant={activeTab === 'notifications' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${
                      activeTab === 'notifications' ? 'bg-cyan-500 text-white hover:bg-cyan-600' : ''
                    }`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Notifikasi
                  </Button>
                </CardContent>
              </Card>

              {/* Settings Form */}
              <div className="md:col-span-3">
                {activeTab === 'general' && renderGeneralForm()}
                {activeTab === 'branding' && renderBrandingForm()}
                {activeTab === 'theme' && renderThemeForm()}
                {activeTab === 'notifications' && renderNotificationsForm()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
