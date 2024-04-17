import { CreateQuestionForm } from './create-question-form'
import { db } from '@/lib/drizzle'

export default async function Home() {
  const tags = await db.query.tags.findMany()
  return <CreateQuestionForm tags={tags} />
}
