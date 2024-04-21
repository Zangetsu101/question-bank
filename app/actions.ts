'use server'

import {
  QuestionPayload,
  db,
  questionHistories,
  questions,
  tags
} from '@/lib/drizzle'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createNewTag(label: string) {
  const newTag = await db.insert(tags).values({ label }).returning()
  revalidatePath('/')
  return newTag[0]
}

export async function createNewQuestion(payload: QuestionPayload) {
  await db.insert(questions).values(payload)
  revalidatePath('/')
  redirect('/')
}

export async function updateQuestion({
  id,
  ...payload
}: Omit<QuestionPayload, 'id'> & { id: number }) {
  const question = await db.query.questions.findFirst({
    where: (model, { eq }) => eq(model.id, id)
  })
  if (!question) {
    throw new Error('No question found with given id')
  }
  const { id: _, updatedAt, ...questionDetails } = question
  await db
    .insert(questionHistories)
    .values({ questionId: id, createdAt: updatedAt, ...questionDetails })
  await db.update(questions).set(payload).where(eq(questions.id, id))
  revalidatePath('/review-questions')
}
