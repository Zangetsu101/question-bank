'use server'

import { editQuestion } from '@/db/mutations'
import { revalidatePath } from 'next/cache'

export async function editQuestionAction(
  newQuestion: Parameters<typeof editQuestion>[0]
) {
  await editQuestion(newQuestion)
  revalidatePath(`edit-question/${newQuestion.id}`)
}
