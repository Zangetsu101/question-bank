import { Approval, Comment, db } from '@/lib/drizzle'

export type Timeline = Comment | Approval

export async function getQuestionTimeline(questionId: number) {
  const comments = await db.query.comments.findMany({
    where: (model, { eq }) => eq(model.questionId, questionId)
  })
  const approvals = await db.query.approvals.findMany({
    where: (model, { eq }) => eq(model.questionId, questionId)
  })
  const timeline: Timeline[] = [...comments, ...approvals]
  return timeline.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}
