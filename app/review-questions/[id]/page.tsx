import { db } from '@/lib/drizzle'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

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
  return (
    <div className="flex flex-col gap-8 rounded-lg bg-secondary p-4">
      <div className="flex justify-between">
        <div>
          Difficulty: <span className="capitalize">{question.difficulty}</span>
        </div>
        {question.tagIds && (
          <div>
            Tags:
            <div className="inline-flex gap-1 pl-1">
              {question.tagIds
                .map((id) => tags.find((tag) => tag.id === id)!)
                .map(({ id, label }) => (
                  <Badge key={id}>{label}</Badge>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="whitespace-pre-line break-words">
        {question.questionMd}
      </div>
    </div>
  )
}
