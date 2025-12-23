import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const doctorId = searchParams.get('doctorId')
    const search = searchParams.get('search')

    const where: any = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (doctorId) {
      where.doctorId = doctorId
    }

    if (search) {
      where.OR = [
        { patientName: { contains: search } },
        { phone: { contains: search } }
      ]
    }

    const appointments = await db.appointment.findMany({
      where,
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            specialty: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('Get appointments error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

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
      message: 'Janji temu berhasil dibuat',
      appointment
    })
  } catch (error) {
    console.error('Create appointment error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
