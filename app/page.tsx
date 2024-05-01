import { QuestionWithTags, db } from '@/lib/drizzle'
import { MyQuestionsTable } from './_components/my-questions-table'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [questions, tags] = await Promise.all([
    db.query.questions.findMany(),
    db.query.tags.findMany()
  ])
  const questionsWithTags: QuestionWithTags[] = questions.map(
    ({ tagIds, ...question }) => ({
      ...question,
      tags: (tagIds ?? []).map((id) => tags.find((tag) => tag.id === id)!)
    })
  )
  return (
    <div className="mx-auto max-w-4xl">
      <MyQuestionsTable questions={questionsWithTags} tags={tags} />
    </div>
  )
}
