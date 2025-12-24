import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get('specialty')
    const day = searchParams.get('day')

    const where: any = {
      isActive: true
    }

    if (specialty && specialty !== 'all') {
      where.specialty = specialty
    }

    const doctors = await db.doctor.findMany({
      where,
      include: {
        schedules: {
          where: {
            isActive: true
          },
          orderBy: [
            { dayOfWeek: 'asc' },
            { startTime: 'asc' }
          ]
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({ doctors })
  } catch (error) {
    console.error('Get public doctors error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
