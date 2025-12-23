'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  Eye,
  EyeOff,
} from 'lucide-react'
import Link from 'next/link'

// Mock data
const pageSections = [
  {
    id: '1',
    sectionKey: 'hero',
    title: 'Hero Section',
    content: {
      headline: 'Selamat Datang di RS Sehat Selalu',
      subheadline: 'Layanan kesehatan terpercaya untuk Anda dan keluarga',
      ctaText: 'Buat Janji Temu',
    },
    isActive: true,
    displayOrder: 1,
  },
  {
    id: '2',
    sectionKey: 'profile',
    title: 'Profil Rumah Sakit',
    content: {
      name: 'RS Sehat Selalu',
      description: 'RS Sehat Selalu adalah rumah sakit modern yang berdedikasi untuk memberikan layanan kesehatan terbaik bagi masyarakat.',
      establishedYear: '2010',
    },
    isActive: true,
    displayOrder: 2,
  },
  {
    id: '3',
    sectionKey: 'contact',
    title: 'Informasi Kontak',
    content: {
      address: 'Jl. Kesehatan No. 123, Jakarta Selatan, 12345',
      phone: '(021) 1234-5678',
      email: 'info@rssehatselalu.com',
      igdPhone: '(021) 1234-5678',
      generalPhone: '(021) 1234-5679',
    },
    isActive: true,
    displayOrder: 3,
  },
]

export default function ContentManagementPage() {
  const [sections, setSections] = useState(pageSections)
  const [selectedSection, setSelectedSection] = useState(pageSections[0])
  const [formData, setFormData] = useState(selectedSection.content)
  const { toast } = useToast()

  const handleSectionChange = (section: typeof pageSections[0]) => {
    setSelectedSection(section)
    setFormData(section.content)
  }

  const handleSaveSection = () => {
    setSections(
      sections.map((s) =>
        s.id === selectedSection.id ? { ...s, content: formData } : s
      )
    )
    toast({
      title: "Berhasil",
      description: `Konten ${selectedSection.title} berhasil diupdate`,
    })
  }

  const handleToggleVisibility = (id: string) => {
    setSections(
      sections.map((s) =>
        s.id === id ? { ...s, isActive: !s.isActive } : s
      )
    )
    toast({
      title: "Berhasil",
      description: "Visibilitas section berhasil diupdate",
    })
  }

  const renderFormFields = () => {
    switch (selectedSection.sectionKey) {
      case 'hero':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline *</Label>
              <Input
                id="headline"
                value={formData.headline || ''}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subheadline">Subheadline *</Label>
              <Textarea
                id="subheadline"
                value={formData.subheadline || ''}
                onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaText">Teks Tombol CTA *</Label>
              <Input
                id="ctaText"
                value={formData.ctaText || ''}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              />
            </div>
          </>
        )
      case 'profile':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Nama Rumah Sakit *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi *</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="establishedYear">Tahun Berdiri</Label>
              <Input
                id="establishedYear"
                value={formData.establishedYear || ''}
                onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
              />
            </div>
          </>
        )
      case 'contact':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat *</Label>
              <Textarea
                id="address"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="igdPhone">Telepon IGD *</Label>
                <Input
                  id="igdPhone"
                  value={formData.igdPhone || ''}
                  onChange={(e) => setFormData({ ...formData, igdPhone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="generalPhone">Telepon Umum *</Label>
                <Input
                  id="generalPhone"
                  value={formData.generalPhone || ''}
                  onChange={(e) => setFormData({ ...formData, generalPhone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </>
        )
      default:
        return null
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
                    <SidebarMenuButton asChild isActive>
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
                <h1 className="text-2xl font-bold">Manajemen Konten Website</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola konten halaman website
                </p>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Section List */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Bagian Halaman</CardTitle>
                  <CardDescription>
                    Pilih section untuk diedit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-2">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => handleSectionChange(section)}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                            selectedSection.id === section.id
                              ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-950'
                              : 'hover:border-cyan-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{section.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {section.sectionKey}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={section.isActive ? 'default' : 'secondary'}
                                className={
                                  section.isActive
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                                }
                              >
                                {section.isActive ? 'Aktif' : 'Nonaktif'}
                              </Badge>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Edit {selectedSection.title}</CardTitle>
                        <CardDescription>
                          Update konten {selectedSection.sectionKey}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedSection.isActive ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                        <Switch
                          checked={selectedSection.isActive}
                          onCheckedChange={() => handleToggleVisibility(selectedSection.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {renderFormFields()}
                    <Button
                      onClick={handleSaveSection}
                      className="w-full rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Perubahan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
