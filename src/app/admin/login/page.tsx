'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Stethoscope, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // API call will be implemented later
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali!",
        })
        window.location.href = '/admin/dashboard'
      } else {
        toast({
          title: "Login Gagal",
          description: data.message || "Email atau password salah",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-cyan-950 dark:via-slate-950 dark:to-teal-950 p-4">
      <Card className="w-full max-w-md border-2 shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center mx-auto">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Masuk ke panel admin RS Sehat Selalu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@rumahsakit.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full border-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Masuk...
                </>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              ← Kembali ke Halaman Utama
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
