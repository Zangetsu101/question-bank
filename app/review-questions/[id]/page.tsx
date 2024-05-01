import { Suspense } from 'react'
import { getQuestionWithTags } from '@/db/queries'
import { NewComment } from './_components/new-comment'
import { AddApproval } from './_components/add-approval'
import { Question } from '@/components/ui/question'
import { Timeline } from '@/components/ui/timeline'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  const questionId = Number(params.id)
  const question = await getQuestionWithTags(questionId)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <AddApproval questionId={questionId} />
      </div>
      <Question question={question} />
      <Suspense fallback={'Loading...'}>
        <Timeline questionId={questionId} />
        <NewComment questionId={questionId} />
      </Suspense>
    </div>
  )
}
