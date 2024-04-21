import { db } from '@/lib/drizzle'

export default async function Page({ params }: { params: { id: string } }) {
  const [question, tags] = await Promise.all([
    db.query.questions.findFirst({
      where: (model, { eq }) => eq(model.id, Number(params.id))
    }),
    db.query.tags.findMany()
  ])
  if (!question) {
    throw new Error(`No question found with the given id: ${params.id}`)
  }
  const { tagIds, ...rest } = question
  const questionWithTags = {
    ...rest,
    tags: (tagIds ?? []).map((id) => tags.find((tag) => tag.id === id)!)
  }
  return <pre>{JSON.stringify(questionWithTags)}</pre>
}
