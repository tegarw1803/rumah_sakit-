import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get('doctorId')
    const dayOfWeek = searchParams.get('dayOfWeek')
    const poli = searchParams.get('poli')
    const isActive = searchParams.get('isActive')

    const where: any = {}

    if (doctorId && doctorId !== 'all') {
      where.doctorId = doctorId
    }

    if (dayOfWeek && dayOfWeek !== 'all') {
      where.dayOfWeek = dayOfWeek
    }

    if (poli && poli !== 'all') {
      where.poli = poli
    }

    if (isActive === 'true') {
      where.isActive = true
    } else if (isActive === 'false') {
      where.isActive = false
    }

    const schedules = await db.doctorSchedule.findMany({
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
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    })

    return NextResponse.json({ schedules })
  } catch (error) {
    console.error('Get schedules error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { doctorId, dayOfWeek, startTime, endTime, poli, isActive } = body

    if (!doctorId || !dayOfWeek || !startTime || !endTime || !poli) {
      return NextResponse.json(
        { message: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    const schedule = await db.doctorSchedule.create({
      data: {
        doctorId,
        dayOfWeek,
        startTime,
        endTime,
        poli,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json({
      message: 'Jadwal berhasil ditambahkan',
      schedule
    })
  } catch (error) {
    console.error('Create schedule error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
