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
    const specialty = searchParams.get('specialty')
    const search = searchParams.get('search')
    const isActive = searchParams.get('isActive')

    const where: any = {}

    if (specialty && specialty !== 'all') {
      where.specialty = specialty
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { specialty: { contains: search } }
      ]
    }

    if (isActive === 'true') {
      where.isActive = true
    } else if (isActive === 'false') {
      where.isActive = false
    }

    const doctors = await db.doctor.findMany({
      where,
      include: {
        schedules: true,
        _count: {
          select: { appointments: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ doctors })
  } catch (error) {
    console.error('Get doctors error:', error)
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
    const { name, specialty, phone, bio, isActive } = body

    if (!name || !specialty || !phone) {
      return NextResponse.json(
        { message: 'Nama, spesialisasi, dan telepon wajib diisi' },
        { status: 400 }
      )
    }

    const doctor = await db.doctor.create({
      data: {
        name,
        specialty,
        phone,
        bio: bio || null,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json({
      message: 'Dokter berhasil ditambahkan',
      doctor
    })
  } catch (error) {
    console.error('Create doctor error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
