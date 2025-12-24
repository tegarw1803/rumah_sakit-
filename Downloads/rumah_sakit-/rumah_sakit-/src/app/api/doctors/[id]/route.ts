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

    const doctor = await db.doctor.findUnique({
      where: { id },
      include: {
        schedules: true,
        appointments: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!doctor) {
      return NextResponse.json({ message: 'Dokter tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ doctor })
  } catch (error) {
    console.error('Get doctor error:', error)
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
    const { name, specialty, phone, bio, photo, isActive } = body

    const doctor = await db.doctor.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(specialty && { specialty }),
        ...(phone && { phone }),
        ...(bio !== undefined && { bio }),
        ...(photo !== undefined && { photo }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json({
      message: 'Dokter berhasil diupdate',
      doctor
    })
  } catch (error) {
    console.error('Update doctor error:', error)
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

    await db.doctor.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Dokter berhasil dihapus'
    })
  } catch (error) {
    console.error('Delete doctor error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
