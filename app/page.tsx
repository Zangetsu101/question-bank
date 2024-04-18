import { db } from '@/lib/drizzle'
import { columns } from './columns'
import { QuestionsTable } from './questions-table'

export default async function Home() {
  const questions = await db.query.questions.findMany()
  const tags = await db.query.tags.findMany()
  return <QuestionsTable columns={columns} data={questions} tags={tags} />
}
