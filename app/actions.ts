'use server'

import { db, tagsTable } from '@/lib/drizzle'
import { revalidatePath } from 'next/cache'

export async function createNewTag(label: string) {
  const newTag = await db.insert(tagsTable).values({ label }).returning()
  revalidatePath('/')
  return newTag[0]
}
