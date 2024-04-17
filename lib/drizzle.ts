import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export * from '@/db/schema/tags'
export * from '@/db/schema/questions'
export * from '@/db/schema/questionTags'

// Connect to Vercel Postgres
export const db = drizzle(sql)
