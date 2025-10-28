// components/ProtectedPage.tsx
'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface ProtectedPageProps {
  children: ReactNode
  redirectTo?: string
  loadingComponent?: ReactNode
}

export function ProtectedPage({ 
  children, 
  redirectTo = '/signin',
  loadingComponent 
}: ProtectedPageProps) {
  const router = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push(redirectTo)
      } else {
        setIsAuthenticated(true)
        setChecking(false)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push(redirectTo)
      } else {
        setIsAuthenticated(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase, redirectTo])

  if (checking) {
    return loadingComponent || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : null
}