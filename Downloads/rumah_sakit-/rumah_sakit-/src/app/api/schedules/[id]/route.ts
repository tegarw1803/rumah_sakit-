import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const schedule = await db.doctorSchedule.findUnique({
      where: { id },
      include: {
        doctor: true
      }
    })

    if (!schedule) {
      return NextResponse.json({ message: 'Jadwal tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ schedule })
  } catch (error) {
    console.error('Get schedule error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { doctorId, dayOfWeek, startTime, endTime, poli, isActive } = body

    const schedule = await db.doctorSchedule.update({
      where: { id },
      data: {
        ...(doctorId && { doctorId }),
        ...(dayOfWeek && { dayOfWeek }),
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
        ...(poli && { poli }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json({
      message: 'Jadwal berhasil diupdate',
      schedule
    })
  } catch (error) {
    console.error('Update schedule error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await db.doctorSchedule.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Jadwal berhasil dihapus'
    })
  } catch (error) {
    console.error('Delete schedule error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
