---
Task ID: 15
Agent: Main
Task: Sinkronisasi Pengaturan Admin dengan Web Utama

Work Log:
- Membuat HospitalContext di /src/lib/hospital-context.tsx untuk menyimpan dan membagikan data global
- Mengimplementasikan state management dengan localStorage untuk persistensi data
- Context menyimpan: doctors, schedules, siteSettings, pageSections
- Menambahkan HospitalProvider ke layout.tsx
- Mengupdate halaman utama (page.tsx) untuk menggunakan data dari context
- Mengupdate halaman admin/settings untuk mengupdate data ke context
- Mengupdate halaman admin/doctors untuk mengupdate data ke context
- Mengupdate halaman admin/schedules untuk mengupdate data ke context

Fitur yang tersinkron:
1. Site Settings (Nama RS, Tagline, Email, Telepon, URL Media Sosial)
   - Perubahan di admin settings langsung terlihat di halaman utama
   - Footer, header, dan link sosial menggunakan data dari context
2. Doctors Data
   - Perubahan di admin doctors langsung terlihat di halaman utama
   - Listing dokter dan jadwal menggunakan data dari context
3. Schedules Data
   - Perubahan di admin schedules langsung terlihat di halaman utama
   - Filter dokter berdasarkan hari praktik menggunakan data dari context

Stage Summary:
- Sinkronisasi antara admin panel dan halaman utama berhasil diimplementasikan
- Perubahan di admin langsung terlihat di halaman utama
- Data disimpan di localStorage untuk persistensi antar halaman
- Context API memudahkan pembagian state antar komponen
