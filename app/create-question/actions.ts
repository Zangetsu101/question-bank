'use server'

import { createNewQuestion, createNewTag } from '@/db/mutations'
import { revalidatePath } from 'next/cache'
import { RedirectType, redirect } from 'next/navigation'

export async function createNewQuestionAction(
  payload: Parameters<typeof createNewQuestion>[0]
) {
  await createNewQuestion(payload)
  redirect('/', RedirectType.replace)
}

export async function createNewTagAction(
  payload: Parameters<typeof createNewTag>[0]
) {
  const newTag = await createNewTag(payload)
  revalidatePath('/create-question')
  return newTag
}
