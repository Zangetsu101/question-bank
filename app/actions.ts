'use server'

import {
  QuestionPayload,
  db,
  questionTags,
  questions,
  tags
} from '@/lib/drizzle'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createNewTag(label: string) {
  const newTag = await db.insert(tags).values({ label }).returning()
  revalidatePath('/')
  return newTag[0]
}

export async function createNewQuestion(
  payload: QuestionPayload,
  tags: number[]
) {
  const newQuestion = (
    await db.insert(questions).values(payload).returning()
  )[0]
  await db
    .insert(questionTags)
    .values(tags.map((tagId) => ({ tagId, questionId: newQuestion.id })))
  revalidatePath('/')
  redirect('/')
}
