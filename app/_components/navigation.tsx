'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ModeToggle } from './theme-toggle'

export function Navigation() {
  const pathname = usePathname()
  const getClasses = (path: string) =>
    cn(
      'text-sm font-medium transition-colors hover:text-primary',
      pathname !== path && 'text-muted-foreground'
    )
  return (
    <div className="flex items-center justify-between border-b px-64 py-1">
      <nav className="flex gap-2">
        <Link className={getClasses('/')} href="/">
          My questions
        </Link>
        <Link
          className={getClasses('/create-question')}
          href="/create-question"
        >
          Create question
        </Link>
        <Link
          className={getClasses('/review-questions')}
          href="/review-questions"
        >
          Review questions
        </Link>
      </nav>
      <ModeToggle />
    </div>
  )
}
