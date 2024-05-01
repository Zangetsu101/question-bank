import { Question } from '@/components/ui/question'
import { getQuestionWithTags } from '@/db/queries'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  const questionId = Number(params.id)
  const question = await getQuestionWithTags(questionId)

  return <Question question={question} />
}
