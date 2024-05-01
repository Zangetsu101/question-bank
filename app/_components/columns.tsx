'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { QuestionWithTags, difficultyEnum } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { StatusBadge } from '@/components/ui/status-badge'

export const columns: ColumnDef<QuestionWithTags>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
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
      <span className="pl-4 capitalize">{row.original.difficulty}</span>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      return <StatusBadge status={status} />
    }
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    getUniqueValues: (row) => row.tags.map(({ id }) => id),
    filterFn: (row, _, filterValue: string[]) => {
      return (
        (filterValue.length === 0 ||
          row.original.tags?.some((tag) =>
            filterValue.includes(tag.id.toString())
          )) ??
        false
      )
    },
    cell: ({ row }) => {
      const tags = row.original.tags ?? []
      return (
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag.id}>{tag.label}</Badge>
          ))}
        </div>
      )
    }
  }
]
