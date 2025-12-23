import { db } from '@/lib/db'
import { hash } from 'bcryptjs'

async function main() {
  console.log('Starting seed...')

  // Create admin user
  const adminPassword = await hash('admin123', 10)
  const admin = await db.admin.upsert({
    where: { email: 'admin@rs.com' },
    update: {},
    create: {
      email: 'admin@rs.com',
      password: adminPassword,
      name: 'Admin RS',
      role: 'admin'
    }
  })
  console.log('Created admin:', admin.email)

  // Create doctors
  const doctors = [
    {
      name: 'Dr. Ahmad Santoso, Sp.PD',
      specialty: 'Penyakit Dalam',
      phone: '081234567890',
      bio: 'Dokter spesialis penyakit dalam dengan pengalaman 15 tahun',
      isActive: true
    },
    {
      name: 'Dr. Maya Kartika, Sp.A',
      specialty: 'Anak',
      phone: '081234567891',
      bio: 'Dokter spesialis anak berpengalaman dalam perawatan kesehatan anak',
      isActive: true
    },
    {
      name: 'Dr. Budi Pratama, Sp.B',
      specialty: 'Bedah',
      phone: '081234567892',
      bio: 'Dokter spesialis bedah umum dengan sertifikasi internasional',
      isActive: true
    },
    {
      name: 'Dr. Siti Rahayu, Sp.OG',
      specialty: 'Kandungan',
      phone: '081234567893',
      bio: 'Dokter spesialis kandungan dan kebidanan',
      isActive: true
    },
    {
      name: 'Dr. Hendra Wijaya, Sp.JP',
      specialty: 'Jantung',
      phone: '081234567894',
      bio: 'Dokter spesialis jantung dan pembuluh darah',
      isActive: true
    },
    {
      name: 'Dr. Dewi Lestari, Sp.M',
      specialty: 'Mata',
      phone: '081234567895',
      bio: 'Dokter spesialis mata dengan pengalaman 12 tahun',
      isActive: false
    }
  ]

  for (const doctorData of doctors) {
    const doctor = await db.doctor.upsert({
      where: {
        name_phone: {
          name: doctorData.name,
          phone: doctorData.phone
        }
      },
      update: {},
      create: doctorData
    })
    console.log('Created doctor:', doctor.name)
  }

  // Create schedules
  const createdDoctors = await db.doctor.findMany()
  const scheduleTemplates = [
    { name: 'Dr. Ahmad Santoso, Sp.PD', day: 'Senin', start: '08:00', end: '12:00', poli: 'Penyakit Dalam' },
    { name: 'Dr. Ahmad Santoso, Sp.PD', day: 'Rabu', start: '14:00', end: '17:00', poli: 'Penyakit Dalam' },
    { name: 'Dr. Maya Kartika, Sp.A', day: 'Selasa', start: '09:00', end: '13:00', poli: 'Anak' },
    { name: 'Dr. Maya Kartika, Sp.A', day: 'Kamis', start: '08:00', end: '12:00', poli: 'Anak' },
    { name: 'Dr. Budi Pratama, Sp.B', day: 'Senin', start: '10:00', end: '14:00', poli: 'Bedah' },
    { name: 'Dr. Budi Pratama, Sp.B', day: 'Kamis', start: '15:00', end: '18:00', poli: 'Bedah' },
    { name: 'Dr. Siti Rahayu, Sp.OG', day: 'Jumat', start: '08:00', end: '12:00', poli: 'Kandungan' },
    { name: 'Dr. Siti Rahayu, Sp.OG', day: 'Sabtu', start: '09:00', end: '13:00', poli: 'Kandungan' },
    { name: 'Dr. Hendra Wijaya, Sp.JP', day: 'Selasa', start: '08:00', end: '12:00', poli: 'Jantung' },
    { name: 'Dr. Hendra Wijaya, Sp.JP', day: 'Jumat', start: '14:00', end: '17:00', poli: 'Jantung' },
  ]

  for (const template of scheduleTemplates) {
    const doctor = createdDoctors.find(d => d.name === template.name)
    if (doctor) {
      // Check if schedule already exists
      const existingSchedule = await db.doctorSchedule.findFirst({
        where: {
          doctorId: doctor.id,
          dayOfWeek: template.day,
          startTime: template.start
        }
      })

      if (!existingSchedule) {
        await db.doctorSchedule.create({
          data: {
            doctorId: doctor.id,
            dayOfWeek: template.day,
            startTime: template.start,
            endTime: template.end,
            poli: template.poli,
            isActive: true
          }
        })
        console.log(`Created schedule for ${template.name} on ${template.day}`)
      }
    }
  }

  // Create page sections
  const pageSections = [
    {
      sectionKey: 'hero',
      title: 'Hero Section',
      content: JSON.stringify({
        headline: 'Selamat Datang di RS Sehat Selalu',
        subheadline: 'Layanan kesehatan terpercaya untuk Anda dan keluarga',
        ctaText: 'Buat Janji Temu'
      }),
      isActive: true,
      displayOrder: 1
    },
    {
      sectionKey: 'profile',
      title: 'Profil Rumah Sakit',
      content: JSON.stringify({
        name: 'RS Sehat Selalu',
        description: 'RS Sehat Selalu adalah rumah sakit modern yang berdedikasi untuk memberikan layanan kesehatan terbaik bagi masyarakat.',
        establishedYear: '2010'
      }),
      isActive: true,
      displayOrder: 2
    },
    {
      sectionKey: 'contact',
      title: 'Informasi Kontak',
      content: JSON.stringify({
        address: 'Jl. Kesehatan No. 123, Jakarta Selatan, 12345',
        phone: '(021) 1234-5678',
        email: 'info@rssehatselalu.com',
        igdPhone: '(021) 1234-5678',
        generalPhone: '(021) 1234-5679'
      }),
      isActive: true,
      displayOrder: 3
    }
  ]

  for (const section of pageSections) {
    await db.pageSection.upsert({
      where: { sectionKey: section.sectionKey },
      update: {},
      create: section
    })
    console.log('Created page section:', section.sectionKey)
  }

  // Create site settings
  const settings = [
    { key: 'hospitalName', value: 'RS Sehat Selalu', category: 'general' },
    { key: 'tagline', value: 'Layanan Kesehatan Terpercaya', category: 'general' },
    { key: 'email', value: 'info@rssehatselalu.com', category: 'general' },
    { key: 'phone', value: '(021) 1234-5678', category: 'general' },
    { key: 'primaryColor', value: 'cyan', category: 'theme' },
    { key: 'darkModeEnabled', value: 'true', category: 'theme' },
    { key: 'facebookUrl', value: 'https://facebook.com/rssehatselalu', category: 'branding' },
    { key: 'twitterUrl', value: 'https://twitter.com/rssehatselalu', category: 'branding' },
    { key: 'instagramUrl', value: 'https://instagram.com/rssehatselalu', category: 'branding' },
    { key: 'youtubeUrl', value: 'https://youtube.com/rssehatselalu', category: 'branding' }
  ]

  for (const setting of settings) {
    await db.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting
    })
    console.log('Created setting:', setting.key)
  }

  // Create services
  const services = [
    { name: 'Poli Umum', icon: 'stethoscope', description: 'Layanan kesehatan umum untuk berbagai keluhan', isActive: true, displayOrder: 1 },
    { name: 'Poli Gigi', icon: 'syringe', description: 'Perawatan kesehatan gigi dan mulut', isActive: true, displayOrder: 2 },
    { name: 'Poli Penyakit Dalam', icon: 'heart', description: 'Penanganan penyakit dalam dan kronis', isActive: true, displayOrder: 3 },
    { name: 'IGD 24 Jam', icon: 'ambulance', description: 'Layanan gawat darurat non-stop', isActive: true, displayOrder: 4 },
    { name: 'Laboratorium', icon: 'syringe', description: 'Pemeriksaan laboratorium lengkap', isActive: true, displayOrder: 5 },
    { name: 'Radiologi', icon: 'stethoscope', description: 'Pemeriksaan X-ray dan imaging', isActive: true, displayOrder: 6 }
  ]

  for (const service of services) {
    await db.service.upsert({
      where: { name: service.name },
      update: {},
      create: service
    })
    console.log('Created service:', service.name)
  }

  // Create branding
  await db.branding.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      hospitalName: 'RS Sehat Selalu',
      tagline: 'Layanan Kesehatan Terpercaya',
      facebookUrl: 'https://facebook.com/rssehatselalu',
      twitterUrl: 'https://twitter.com/rssehatselalu',
      instagramUrl: 'https://instagram.com/rssehatselalu',
      youtubeUrl: 'https://youtube.com/rssehatselalu'
    }
  })
  console.log('Created branding')

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
