import { Approval, Comment, db } from '@/lib/drizzle'

export type Timeline = Comment | Approval

export async function getQuestionWithTags(questionId: number) {
  const [question, tags] = await Promise.all([
    db.query.questions.findFirst({
      where: (model, { eq }) => eq(model.id, Number(questionId))
    }),
    db.query.tags.findMany()
  ])
  if (!question) {
    throw new Error(`No question found with the given id: ${questionId}`)
  }
  const { tagIds, ...withoutTagIds } = question
  return {
    ...withoutTagIds,
    tags: (tagIds ?? []).map((id) => tags.find((tag) => tag.id === id)!)
  }
}

export async function getQuestionTimeline(questionId: number) {
  const [comments, approvals] = await Promise.all([
    await db.query.comments.findMany({
      where: (model, { eq }) => eq(model.questionId, questionId)
    }),
    await db.query.approvals.findMany({
      where: (model, { eq }) => eq(model.questionId, questionId)
    })
  ])
  const timeline: Timeline[] = [...comments, ...approvals]
  return timeline.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}
