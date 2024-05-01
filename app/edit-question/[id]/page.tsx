import { db } from '@/lib/drizzle'
import { EditQuestionForm } from './edit-question-form'
import { Suspense } from 'react'
import { Timeline } from '@/components/ui/timeline'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  const [question, tags] = await Promise.all([
    db.query.questions.findFirst({
      where: (model, { eq }) => eq(model.id, Number(params.id))
    }),
    db.query.tags.findMany()
  ])
  if (!question) {
    throw new Error(`No question found with the given id: ${params.id}`)
  }
  return (
    <div className="flex flex-wrap justify-center gap-4 px-4">
      <EditQuestionForm
        className="max-w-4xl basis-[896px]"
        question={question}
        tags={tags}
      />
      <div className="max-w-4xl grow basis-[300px]">
        Timeline:
        <Suspense fallback="Loading...">
          <Timeline questionId={question.id} />
        </Suspense>
      </div>
    </div>
  )
}
