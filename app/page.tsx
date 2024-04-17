import { db, questionsTable } from '@/lib/drizzle'

export default async function Home() {
  const questions = await db.select().from(questionsTable)
  return <pre>{JSON.stringify(questions)}</pre>
}
