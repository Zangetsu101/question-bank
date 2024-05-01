'use client'

import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
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

import { Tag } from '@/db/schema'
import { cn } from '@/lib/utils'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableProps<TData, TValue> {
  data: TData[]
  tags: Tag[]
  columns: ColumnDef<TData, TValue>[]
  onRowSelect?: (row: Row<TData>) => void
}

export function DataTable<TData, TValue>({
  data,
  tags,
  columns,
  onRowSelect
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'difficulty', desc: false }
  ])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting
    }
  })

  const tagsColumn = table.getColumn('tags')

  return (
    <div>
      {tagsColumn && (
        <div className="flex items-center gap-4 py-4">
          Filter:
          <DataTableFacetedFilter
            column={tagsColumn}
            title="Tags"
            options={tags
              .filter((tag) => tagsColumn.getFacetedUniqueValues().has(tag.id))
              .map(({ id, label }) => ({ value: id.toString(), label }))}
          />
        </div>
      )}
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
                  className={cn(onRowSelect && 'cursor-pointer')}
                  onClick={() => onRowSelect?.(row)}
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
