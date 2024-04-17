'use server'

import {
  QuestionPayload,
  db,
  questionTagsTable,
  questionsTable,
  tagsTable
} from '@/lib/drizzle'
import { revalidatePath } from 'next/cache'

export async function createNewTag(label: string) {
  const newTag = await db.insert(tagsTable).values({ label }).returning()
  revalidatePath('/')
  return newTag[0]
}

export async function createNewQuestion(
  payload: QuestionPayload,
  tags: number[]
) {
  const newQuestion = (
    await db.insert(questionsTable).values(payload).returning()
  )[0]
  await db
    .insert(questionTagsTable)
    .values(tags.map((tagId) => ({ tagId, questionId: newQuestion.id })))
}
