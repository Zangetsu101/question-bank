'use client'

import React from 'react'
import { QuestionWithTags, Tag } from '@/db/schema'
import { columns } from './columns'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'

export function AcceptedQuestionsTable({
  questions,
  tags
}: {
  questions: QuestionWithTags[]
  tags: Tag[]
}) {
  const router = useRouter()

  return (
    <DataTable
      data={questions}
      tags={tags}
      columns={columns}
      onRowSelect={(row) =>
        router.push(`accepted-questions/${row.original.id}`)
      }
    />
  )
}
