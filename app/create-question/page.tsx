import { CreateQuestionForm } from './create-question-form'
import { db } from '@/lib/drizzle'

export default async function Page() {
  const tags = await db.query.tags.findMany()
  return <CreateQuestionForm tags={tags} />
}
