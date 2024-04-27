import { QuestionWithTags } from '@/lib/drizzle'
import { Badge } from '@/components/ui/badge'

export async function Question({ question }: { question: QuestionWithTags }) {
  return (
    <div className="flex flex-col gap-8 rounded-lg bg-secondary p-4">
      <div className="flex justify-between">
        <div>
          <b>Difficulty: </b>
          <span className="capitalize">{question.difficulty}</span>
        </div>
        <div>
          <b>Tags: </b>
          <div className="inline-flex gap-1 pl-1">
            {question.tags.map(({ id, label }) => (
              <Badge key={id}>{label}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="whitespace-pre-line break-words">
        {question.questionMd}
      </div>
    </div>
  )
}
