import { db } from '@/lib/drizzle'

export default async function Home() {
  const questions = await db.query.questions.findMany({
    with: { questionTags: { columns: {}, with: { tag: true } } }
  })
  return questions.map((question) => (
    <pre key={question.id}>{JSON.stringify(question)}</pre>
  ))
}
