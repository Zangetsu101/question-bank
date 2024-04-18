'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Question, difficultyEnum } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: 'difficulty',
    sortingFn: (a, b) =>
      difficultyEnum.enumValues.indexOf(a.original.difficulty) -
      difficultyEnum.enumValues.indexOf(b.original.difficulty),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span className="capitalize">{row.original.difficulty}</span>
    )
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    filterFn: (row, _, filterValue) => {
      return (
        row.original.tags?.some((tag) => filterValue.includes(tag)) ?? false
      )
    },
    cell: ({ row }) => {
      const tags = row.original.tags ?? []
      return (
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: 'questionMd',
    header: 'Question'
  }
]
