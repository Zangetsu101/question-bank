'use server'

import { createNewQuestion } from '@/db/mutations'
import { RedirectType, redirect } from 'next/navigation'

export async function createNewQuestionAction(
  payload: Parameters<typeof createNewQuestion>[0]
) {
  await createNewQuestion(payload)
  redirect('/', RedirectType.replace)
}
