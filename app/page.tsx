import { db } from '@/lib/drizzle'

export default async function Home() {
  const questions = await db.query.questions.findMany()
  return questions.map((question) => (
    <pre key={question.id}>{JSON.stringify(question)}</pre>
  ))
}
