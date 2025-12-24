import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientName, phone, doctorId, visitDate, notes } = body

    if (!patientName || !phone || !doctorId || !visitDate) {
      return NextResponse.json(
        { message: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    // Verify doctor exists and is active
    const doctor = await db.doctor.findUnique({
      where: { id: doctorId }
    })

    if (!doctor) {
      return NextResponse.json(
        { message: 'Dokter tidak ditemukan' },
        { status: 404 }
      )
    }

    if (!doctor.isActive) {
      return NextResponse.json(
        { message: 'Dokter tidak aktif' },
        { status: 400 }
      )
    }

    const appointment = await db.appointment.create({
      data: {
        patientName,
        phone,
        doctorId,
        visitDate: new Date(visitDate),
        notes: notes || null
      }
    })

    return NextResponse.json({
      message: 'Janji temu berhasil dibuat. Kami akan menghubungi Anda untuk konfirmasi.',
      appointment
    })
  } catch (error) {
    console.error('Create public appointment error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
