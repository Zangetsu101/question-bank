'use client'

import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { QuestionWithTags, Tag } from '@/db/schema'
import { columns } from './columns'
import { useRouter } from 'next/navigation'

interface QuestionsTableProps {
  questions: QuestionWithTags[]
  tags: Tag[]
}

export function QuestionsTable({ questions, tags }: QuestionsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'difficulty', desc: false }
  ])
  const router = useRouter()
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data: questions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter tags
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {tags.map((tag) => {
              const tagsFilter = (columnFilters.find((f) => f.id === 'tags')
                ?.value ?? []) as number[]
              return (
                <DropdownMenuCheckboxItem
                  key={tag.id}
                  className="capitalize"
                  checked={tagsFilter.includes(tag.id)}
                  onCheckedChange={(value) =>
                    value
                      ? setColumnFilters([
                          ...columnFilters.filter((f) => f.id !== 'tags'),
                          { id: 'tags', value: [...tagsFilter, tag.id] }
                        ])
                      : setColumnFilters([
                          ...columnFilters.filter((f) => f.id !== 'tags'),
                          {
                            id: 'tags',
                            value: tagsFilter.filter((id) => id !== tag.id)
                          }
                        ])
                  }
                >
                  {tag.label}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`edit-question/${row.original.id}`)
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
