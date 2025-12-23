import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { compare } from 'bcryptjs'
import { createToken, setSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi' },
        { status: 400 }
      )
    }

    // Find admin by email
    const admin = await db.admin.findUnique({
      where: { email }
    })

    if (!admin) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await compare(password, admin.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    })

    // Set session cookie
    await setSession(token)

    return NextResponse.json({
      message: 'Login berhasil',
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
