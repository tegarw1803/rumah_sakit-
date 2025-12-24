'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Doctor {
  id: string
  name: string
  specialty: string
  phone: string
  photo: string | null
  bio: string | null
  isActive: boolean
}

interface Schedule {
  id: string
  doctorId: string
  doctorName: string
  dayOfWeek: string
  startTime: string
  endTime: string
  poli: string
  isActive: boolean
}

interface SiteSettings {
  hospitalName: string
  tagline: string
  email: string
  phone: string
  facebookUrl: string
  twitterUrl: string
  instagramUrl: string
  youtubeUrl: string
}

interface PageSection {
  id: string
  sectionKey: string
  title: string
  content: any
  isActive: boolean
  displayOrder: number
}

interface HospitalContextType {
  doctors: Doctor[]
  schedules: Schedule[]
  siteSettings: SiteSettings
  pageSections: PageSection[]
  updateDoctors: (doctors: Doctor[]) => void
  updateSchedules: (schedules: Schedule[]) => void
  updateSiteSettings: (settings: Partial<SiteSettings>) => void
  updatePageSections: (sections: PageSection[]) => void
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

// Initial default data
const defaultDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ahmad Santoso, Sp.PD',
    specialty: 'Penyakit Dalam',
    phone: '081234567890',
    photo: null,
    bio: 'Dokter spesialis penyakit dalam dengan pengalaman 15 tahun',
    isActive: true,
  },
  {
    id: '2',
    name: 'Dr. Maya Kartika, Sp.A',
    specialty: 'Anak',
    phone: '081234567891',
    photo: null,
    bio: 'Dokter spesialis anak berpengalaman dalam perawatan kesehatan anak',
    isActive: true,
  },
  {
    id: '3',
    name: 'Dr. Budi Pratama, Sp.B',
    specialty: 'Bedah',
    phone: '081234567892',
    photo: null,
    bio: 'Dokter spesialis bedah umum dengan sertifikasi internasional',
    isActive: true,
  },
  {
    id: '4',
    name: 'Dr. Siti Rahayu, Sp.OG',
    specialty: 'Kandungan',
    phone: '081234567893',
    photo: null,
    bio: 'Dokter spesialis kandungan dan kebidanan',
    isActive: true,
  },
]

const defaultSchedules: Schedule[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Ahmad Santoso, Sp.PD',
    dayOfWeek: 'Senin',
    startTime: '08:00',
    endTime: '12:00',
    poli: 'Penyakit Dalam',
    isActive: true,
  },
  {
    id: '2',
    doctorId: '1',
    doctorName: 'Dr. Ahmad Santoso, Sp.PD',
    dayOfWeek: 'Rabu',
    startTime: '14:00',
    endTime: '17:00',
    poli: 'Penyakit Dalam',
    isActive: true,
  },
  {
    id: '3',
    doctorId: '2',
    doctorName: 'Dr. Maya Kartika, Sp.A',
    dayOfWeek: 'Selasa',
    startTime: '09:00',
    endTime: '13:00',
    poli: 'Anak',
    isActive: true,
  },
  {
    id: '4',
    doctorId: '2',
    doctorName: 'Dr. Maya Kartika, Sp.A',
    dayOfWeek: 'Kamis',
    startTime: '08:00',
    endTime: '12:00',
    poli: 'Anak',
    isActive: true,
  },
  {
    id: '5',
    doctorId: '3',
    doctorName: 'Dr. Budi Pratama, Sp.B',
    dayOfWeek: 'Senin',
    startTime: '10:00',
    endTime: '14:00',
    poli: 'Bedah',
    isActive: true,
  },
  {
    id: '6',
    doctorId: '4',
    doctorName: 'Dr. Siti Rahayu, Sp.OG',
    dayOfWeek: 'Jumat',
    startTime: '08:00',
    endTime: '12:00',
    poli: 'Kandungan',
    isActive: true,
  },
]

const defaultSiteSettings: SiteSettings = {
  hospitalName: 'RS Sehat Selalu',
  tagline: 'Layanan Kesehatan Terpercaya',
  email: 'info@rssehatselalu.com',
  phone: '(021) 1234-5678',
  facebookUrl: 'https://facebook.com/rssehatselalu',
  twitterUrl: 'https://twitter.com/rssehatselalu',
  instagramUrl: 'https://instagram.com/rssehatselalu',
  youtubeUrl: 'https://youtube.com/rssehatselalu',
}

const defaultPageSections: PageSection[] = [
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
      description: 'RS Sehat Selalu adalah rumah sakit modern yang berdedikasi untuk memberikan layanan kesehatan terbaik bagi masyarakat. Dengan peralatan medis terkini dan tim tenaga kesehatan profesional, kami siap melayani Anda dengan sepenuh hati.',
      establishedYear: '2010',
      stats: [
        { label: 'Tahun Pengalaman', value: '15+' },
        { label: 'Dokter Spesialis', value: '50+' },
        { label: 'Pasien Dilayani', value: '10K+' },
        { label: 'Layanan IGD', value: '24/7' },
      ],
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
      hours: {
        igd: '24 Jam',
        poli: '08:00 - 20:00',
        weekend: '08:00 - 14:00',
      },
    },
    isActive: true,
    displayOrder: 3,
  },
]

export function HospitalProvider({ children }: { children: ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>(defaultDoctors)
  const [schedules, setSchedules] = useState<Schedule[]>(defaultSchedules)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [pageSections, setPageSections] = useState<PageSection[]>(defaultPageSections)

  // Load data from localStorage on mount
  useEffect(() => {
    const storedDoctors = localStorage.getItem('hospital_doctors')
    const storedSchedules = localStorage.getItem('hospital_schedules')
    const storedSettings = localStorage.getItem('hospital_settings')
    const storedSections = localStorage.getItem('hospital_sections')

    if (storedDoctors) setDoctors(JSON.parse(storedDoctors))
    if (storedSchedules) setSchedules(JSON.parse(storedSchedules))
    if (storedSettings) setSiteSettings(JSON.parse(storedSettings))
    if (storedSections) setPageSections(JSON.parse(storedSections))
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('hospital_doctors', JSON.stringify(doctors))
  }, [doctors])

  useEffect(() => {
    localStorage.setItem('hospital_schedules', JSON.stringify(schedules))
  }, [schedules])

  useEffect(() => {
    localStorage.setItem('hospital_settings', JSON.stringify(siteSettings))
  }, [siteSettings])

  useEffect(() => {
    localStorage.setItem('hospital_sections', JSON.stringify(pageSections))
  }, [pageSections])

  const updateDoctors = (newDoctors: Doctor[]) => {
    console.log('Context: Updating doctors', newDoctors)
    setDoctors(newDoctors)
  }

  const updateSchedules = (newSchedules: Schedule[]) => {
    console.log('Context: Updating schedules', newSchedules)
    setSchedules(newSchedules)
  }

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    console.log('Context: Updating siteSettings', newSettings)
    setSiteSettings(prev => ({ ...prev, ...newSettings }))
  }

  const updatePageSections = (newSections: PageSection[]) => {
    console.log('Context: Updating pageSections', newSections)
    setPageSections(newSections)
  }

  return (
    <HospitalContext.Provider
      value={{
        doctors,
        schedules,
        siteSettings,
        pageSections,
        updateDoctors,
        updateSchedules,
        updateSiteSettings,
        updatePageSections,
      }}
    >
      {children}
    </HospitalContext.Provider>
  )
}

export function useHospital() {
  const context = useContext(HospitalContext)
  if (context === undefined) {
    throw new Error('useHospital must be used within a HospitalProvider')
  }
  return context
}
