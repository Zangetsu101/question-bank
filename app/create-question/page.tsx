import { CreateQuestionForm } from './create-question-form'
import { db, tagsTable } from '@/lib/drizzle'

export default async function Home() {
  const tags = await db.select().from(tagsTable)
  return <CreateQuestionForm tags={tags} />
}
