'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function Navigation() {
  const pathname = usePathname()
  return (
    <nav className="flex h-10 items-center border-y border-gray-300 px-64 lg:space-x-6">
      <Link
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname !== '/' && 'text-muted-foreground'
        )}
        href="/"
      >
        My Questions
      </Link>
      <Link
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname !== '/create-question' && 'text-muted-foreground'
        )}
        href="/create-question"
      >
        Create Question
      </Link>
    </nav>
  )
}
