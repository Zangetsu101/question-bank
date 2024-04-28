'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ModeToggle } from './theme-toggle'

export function Navigation() {
  const pathname = usePathname()

  const getLinkProps = (path: string) => ({
    className: cn(
      'text-sm font-medium transition-colors hover:text-primary',
      pathname !== path && 'text-muted-foreground'
    ),
    href: path
  })

  return (
    <div className="border-b px-2 py-1">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <nav className="flex gap-2">
          <Link {...getLinkProps('/')}>My questions</Link>
          <Link {...getLinkProps('/create-question')}>Create question </Link>
          <Link {...getLinkProps('/review-questions')}>Review questions</Link>
          <Link {...getLinkProps('/question-bank')}>Question bank</Link>
        </nav>
        <ModeToggle />
      </div>
    </div>
  )
}
