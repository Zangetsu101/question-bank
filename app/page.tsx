import { CreateQuestionForm } from './create-question-form'
import { db, tagsTable } from '@/lib/drizzle'

export default async function Home() {
  const tags = await db.select().from(tagsTable)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateQuestionForm tags={tags} />
    </main>
  )
}
