'use client'
import { QuestionWithTags, Tag } from '@/db/schema'
import { columns } from './columns'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/data-table/table'

export function QuestionsTable({
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
        row.original.status === 'in-review'
          ? router.push(`edit-question/${row.original.id}`)
          : router.push(`question-bank/${row.original.id}`)
      }
    />
  )
}
