'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Clock, Calendar, Stethoscope, Heart, Syringe, Ambulance, PhoneCall, Moon, Sun, Hospital } from 'lucide-react'
import { useHospital } from '@/lib/hospital-context'

// Services data
const servicesData = [
  { id: 1, name: 'Poli Umum', icon: 'stethoscope', description: 'Layanan kesehatan umum untuk berbagai keluhan' },
  { id: 2, name: 'Poli Gigi', icon: 'syringe', description: 'Perawatan kesehatan gigi dan mulut' },
  { id: 3, name: 'Poli Penyakit Dalam', icon: 'heart', description: 'Penanganan penyakit dalam dan kronis' },
  { id: 4, name: 'IGD 24 Jam', icon: 'ambulance', description: 'Layanan gawat darurat non-stop' },
  { id: 5, name: 'Laboratorium', icon: 'syringe', description: 'Pemeriksaan laboratorium lengkap' },
  { id: 6, name: 'Radiologi', icon: 'stethoscope', description: 'Pemeriksaan X-ray dan imaging' },
]

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export default function HospitalLandingPage() {
  const { doctors, schedules, siteSettings, pageSections } = useHospital()
  console.log('Landing Page - doctors:', doctors)
  console.log('Landing Page - schedules:', schedules)
  console.log('Landing Page - siteSettings:', siteSettings)
  console.log('Landing Page - pageSections:', pageSections)
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedDay, setSelectedDay] = useState('all')
  const [appointmentDialog, setAppointmentDialog] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null)
  const { toast } = useToast()
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    phone: '',
    doctorId: '',
    visitDate: '',
    notes: '',
  })

  // Get page sections
  const heroSection = pageSections.find(s => s.sectionKey === 'hero')
  const profileSection = pageSections.find(s => s.sectionKey === 'profile')
  const contactSection = pageSections.find(s => s.sectionKey === 'contact')

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    document.documentElement.classList.toggle('dark', newMode)
  }

  const filteredDoctors = doctors.filter((doctor) => {
    if (!doctor.isActive) return false
    if (selectedSpecialty !== 'all' && doctor.specialty !== selectedSpecialty) return false

    if (selectedDay !== 'all') {
      const hasSchedule = schedules.some(
        (s) => s.doctorId === doctor.id && s.dayOfWeek === selectedDay && s.isActive
      )
      if (!hasSchedule) return false
    }

    return true
  })

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!appointmentForm.patientName || !appointmentForm.phone || !appointmentForm.doctorId || !appointmentForm.visitDate) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field wajib",
        variant: "destructive",
      })
      return
    }

    try {
      toast({
        title: "Berhasil",
        description: "Janji temu berhasil dibuat. Kami akan menghubungi Anda untuk konfirmasi.",
      })
      setAppointmentDialog(false)
      setAppointmentForm({ patientName: '', phone: '', doctorId: '', visitDate: '', notes: '' })
      setSelectedDoctor(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal membuat janji temu. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const openAppointmentDialog = (doctor: typeof doctors[0]) => {
    setSelectedDoctor(doctor)
    setAppointmentForm({ ...appointmentForm, doctorId: doctor.id.toString() })
    setAppointmentDialog(true)
  }

  const heroContent = heroSection?.content || {}
  const profileContent = profileSection?.content || {}
  const contactContent = contactSection?.content || {}

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">{siteSettings.hospitalName}</h1>
                <p className="text-xs text-muted-foreground">{siteSettings.tagline}</p>
              </div>
            </div>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
                    Beranda
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer" href="#profile">
                    Profil
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer" href="#services">
                    Layanan
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer" href="#doctors">
                    Dokter
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer" href="#contact">
                    Kontak
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 rounded-full border-2 hover:bg-cyan-50 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 dark:hover:bg-cyan-950 dark:hover:border-cyan-500 transition-all duration-300"
              >
                <Calendar className="h-4 w-4" />
                Buat Janji Temu
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Button variant="ghost" className="w-full justify-start">Beranda</Button>
              <Button variant="ghost" className="w-full justify-start">Profil</Button>
              <Button variant="ghost" className="w-full justify-start">Layanan</Button>
              <Button variant="ghost" className="w-full justify-start">Dokter</Button>
              <Button variant="ghost" className="w-full justify-start">Kontak</Button>
              <Button className="w-full mt-4 rounded-full border-2">
                <Calendar className="h-4 w-4 mr-2" />
                Buat Janji Temu
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {heroSection?.isActive && (
        <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-cyan-950 dark:via-slate-950 dark:to-teal-950">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 rounded-full px-4 py-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700">
                Layanan Kesehatan Terpercaya
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                {heroContent.headline || 'Selamat Datang'}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {heroContent.subheadline || 'Layanan kesehatan terpercaya untuk Anda dan keluarga'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-400/20 transition-all duration-300"
                  onClick={() => document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {heroContent.ctaText || 'Buat Janji Temu'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 hover:bg-cyan-50 hover:border-cyan-400 dark:hover:bg-cyan-950 dark:hover:border-cyan-500 transition-all duration-300"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Lihat Layanan
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
        </section>
      )}

      {/* Profile Section */}
      {profileSection?.isActive && (
        <section id="profile" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Tentang Kami</h2>
                <p className="text-muted-foreground text-lg">
                  Melayani dengan hati, merawat dengan profesional
                </p>
              </div>
              <Card className="border-2 bg-gradient-to-br from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20">
                <CardHeader>
                  <CardTitle className="text-2xl">{profileContent.name || siteSettings.hospitalName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {profileContent.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    {profileContent.stats?.map((stat: any, index: number) => (
                      <div key={index} className="text-center p-4 bg-background rounded-lg border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
                        <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Medis</h2>
            <p className="text-muted-foreground text-lg">
              Berbagai layanan kesehatan untuk memenuhi kebutuhan Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <Card
                key={service.id}
                className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/20 group cursor-pointer"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tim Dokter Kami</h2>
            <p className="text-muted-foreground text-lg">
              Dokter spesialis berpengalaman siap melayani Anda
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="text-lg">Filter Dokter</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="specialty">Spesialisasi</Label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Pilih Spesialisasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Spesialisasi</SelectItem>
                    {Array.from(new Set(doctors.map((d) => d.specialty))).map((spec) => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="day">Hari Praktik</Label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Pilih Hari" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Hari</SelectItem>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => {
              const doctorSchedules = schedules.filter((s) => s.doctorId === doctor.id && s.isActive)
              return (
                <Card
                  key={doctor.id}
                  className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/20 overflow-hidden"
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Avatar className="h-24 w-24 border-4 border-cyan-100 dark:border-cyan-900">
                        <AvatarImage src={doctor.photo || undefined} alt={doctor.name} />
                        <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-teal-500 text-white text-2xl font-bold">
                          {doctor.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {doctor.name}
                        </CardTitle>
                        <Badge variant="secondary" className="mb-2">
                          {doctor.specialty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{doctor.phone}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {doctor.bio}
                    </p>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Jadwal Praktik
                      </p>
                      <ScrollArea className="h-32">
                        <div className="space-y-2">
                          {doctorSchedules.map((schedule, idx) => (
                            <div
                              key={idx}
                              className="text-xs bg-muted p-2 rounded border"
                            >
                              <div className="font-medium">{schedule.dayOfWeek}</div>
                              <div className="text-muted-foreground">
                                {schedule.startTime} - {schedule.endTime} | {schedule.poli}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                    <Button
                      className="w-full mt-3 rounded-full border-2 hover:bg-cyan-50 hover:border-cyan-400 dark:hover:bg-cyan-950 dark:hover:border-cyan-500 transition-all duration-300"
                      onClick={() => openAppointmentDialog(doctor)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Buat Janji Temu
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {contactSection?.isActive && (
        <section id="contact" className="py-20 bg-gradient-to-br from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Hubungi Kami</h2>
              <p className="text-muted-foreground text-lg">
                Kami siap membantu Anda kapan saja
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 text-center">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>Telepon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{contactContent.igdPhone || siteSettings.phone}</p>
                  <p className="text-muted-foreground">{contactContent.generalPhone || siteSettings.phone}</p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 text-center">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>Alamat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {contactContent.address}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 text-center">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>Jam Operasional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-1">IGD: {contactContent.hours?.igd || '24 Jam'}</p>
                  <p className="text-muted-foreground mb-1">Poli: {contactContent.hours?.poli || '08:00 - 20:00'}</p>
                  <p className="text-muted-foreground">Minggu: {contactContent.hours?.weekend || '08:00 - 14:00'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-background border-t mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">{siteSettings.hospitalName}</h3>
                  <p className="text-xs text-muted-foreground">{siteSettings.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Melayani dengan hati, merawat dengan profesional untuk kesehatan Anda dan keluarga.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Poli Umum</li>
                <li>Poli Spesialis</li>
                <li>IGD 24 Jam</li>
                <li>Laboratorium</li>
                <li>Radiologi</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tautan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#profile" className="hover:text-cyan-600 dark:hover:text-cyan-400">Tentang Kami</a></li>
                <li><a href="#doctors" className="hover:text-cyan-600 dark:hover:text-cyan-400">Dokter</a></li>
                <li><a href="#contact" className="hover:text-cyan-600 dark:hover:text-cyan-400">Kontak</a></li>
                <li><a href="#services" className="hover:text-cyan-600 dark:hover:text-cyan-400">Layanan</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ikuti Kami</h4>
              <div className="flex gap-4">
                {siteSettings.facebookUrl && (
                  <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {siteSettings.twitterUrl && (
                  <a href={siteSettings.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {siteSettings.instagramUrl && (
                  <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {siteSettings.youtubeUrl && (
                  <a href={siteSettings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 {siteSettings.hospitalName}. All rights reserved.</p>
            <Link href="/admin/login" className="block mt-2 text-xs hover:text-cyan-600 dark:hover:text-cyan-400">
              Admin Login
            </Link>
          </div>
        </div>
      </footer>

      {/* Appointment Dialog */}
      <Dialog open={appointmentDialog} onOpenChange={setAppointmentDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Buat Janji Temu</DialogTitle>
            <DialogDescription>
              {selectedDoctor && `Dengan ${selectedDoctor.name}`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAppointmentSubmit} className="space-y-4">
            <div>
              <Label htmlFor="patientName">Nama Pasien *</Label>
              <Input
                id="patientName"
                value={appointmentForm.patientName}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, patientName: e.target.value })}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Nomor Telepon *</Label>
              <Input
                id="phone"
                type="tel"
                value={appointmentForm.phone}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                placeholder="081234567890"
                required
              />
            </div>
            <div>
              <Label htmlFor="visitDate">Tanggal Kunjungan *</Label>
              <Input
                id="visitDate"
                type="date"
                value={appointmentForm.visitDate}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, visitDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="notes">Catatan Keluhan (Opsional)</Label>
              <Textarea
                id="notes"
                value={appointmentForm.notes}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                placeholder="Jelaskan keluhan atau pertanyaan Anda"
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setAppointmentDialog(false)} className="flex-1">
                Batal
              </Button>
              <Button type="submit" className="flex-1 rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white">
                Buat Janji Temu
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
