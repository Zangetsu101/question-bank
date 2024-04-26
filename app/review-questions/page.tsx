import { QuestionWithTags, db } from '@/lib/drizzle'
import { QuestionsTable } from './_components/questions-table'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [questions, tags] = await Promise.all([
    db.query.questions.findMany({
      where: (model, { eq }) => eq(model.status, 'in-review')
    }),
    db.query.tags.findMany()
  ])
  const questionsWithTags: QuestionWithTags[] = questions.map(
    ({ tagIds, ...question }) => ({
      ...question,
      tags: (tagIds ?? []).map((id) => tags.find((tag) => tag.id === id)!)
    })
  )
  return <QuestionsTable questions={questionsWithTags} tags={tags} />
}
