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
    <div className="border-b px-2 py-1">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
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
          <Link className={getClasses('/question-bank')} href="/question-bank">
            Question bank
          </Link>
        </nav>
        <ModeToggle />
      </div>
    </div>
  )
}
