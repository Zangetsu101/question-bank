'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function Navigation() {
  const pathname = usePathname()
  const getClasses = (path: string) =>
    cn(
      'text-sm font-medium transition-colors hover:text-primary',
      pathname !== path && 'text-muted-foreground'
    )
  return (
    <nav className="flex h-10 items-center border-y border-gray-300 px-64 lg:space-x-6">
      <Link className={getClasses('/')} href="/">
        My questions
      </Link>
      <Link className={getClasses('/create-question')} href="/create-question">
        Create question
      </Link>
      <Link
        className={getClasses('/review-questions')}
        href="/review-questions"
      >
        Review questions
      </Link>
    </nav>
  )
}
