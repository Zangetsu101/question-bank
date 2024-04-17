'use server'

import { QuestionPayload, db, questions, tags } from '@/lib/drizzle'
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
