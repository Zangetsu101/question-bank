'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ModeToggle } from './theme-toggle'
import { Book } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

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
    <div className="flex items-center justify-between gap-2 border-b px-2 py-1">
      <div className="flex shrink-0 basis-[164px] items-center gap-2">
        <Book className="h-8 w-8" />
        <span className="text-lg">Question Bank</span>
      </div>
      <div className="flex shrink-0 items-center justify-center">
        <nav className="flex gap-1.5">
          <Link {...getLinkProps('/')}>My questions</Link>
          <Separator orientation="vertical" className="h-5" />
          <Link {...getLinkProps('/create-question')}>Create question </Link>
          <Separator orientation="vertical" className="h-5" />
          <Link {...getLinkProps('/review-questions')}>Review questions</Link>
          <Separator orientation="vertical" className="h-5" />
          <Link {...getLinkProps('/accepted-questions')}>
            Accepted questions
          </Link>
        </nav>
      </div>
      <div className="flex basis-[164px] justify-end gap-2">
        <ModeToggle />
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
