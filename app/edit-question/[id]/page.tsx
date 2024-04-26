import { db } from '@/lib/drizzle'
import { EditQuestionForm } from './edit-question-form'

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
  return <EditQuestionForm question={question} tags={tags} />
}
