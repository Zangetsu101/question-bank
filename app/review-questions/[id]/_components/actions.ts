'use server'

import { addApproval, addComment } from '@/db/mutations'
import { RedirectType, redirect } from 'next/navigation'

export async function addApprovalAction(
  payload: Parameters<typeof addApproval>[0]
) {
  const changedQuestion = await addApproval(payload)
  if (changedQuestion.status === 'accepted') {
    redirect('/review-questions', RedirectType.replace)
  } else {
    redirect(`/review-questions/${changedQuestion.id}`, RedirectType.replace)
  }
}

export async function addCommentAction(
  payload: Parameters<typeof addComment>[0]
) {
  await addComment(payload)
  redirect(`/review-questions/${payload.questionId}`, RedirectType.replace)
}
