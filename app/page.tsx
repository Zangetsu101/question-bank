import { QuestionWithTags, db } from '@/lib/drizzle'
import { columns } from './_components/columns'
import { QuestionsTable } from './_components/questions-table'

export default async function Home() {
  const questions = await db.query.questions.findMany()
  const tags = await db.query.tags.findMany()
  const questionsWithTags: QuestionWithTags[] = questions.map(
    ({ tagIds, ...question }) => ({
      ...question,
      tags: (tagIds ?? []).map((id) => tags.find((tag) => tag.id === id)!)
    })
  )
  return (
    <QuestionsTable columns={columns} data={questionsWithTags} tags={tags} />
  )
}
