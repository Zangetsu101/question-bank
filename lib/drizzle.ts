import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export * from '@/db/schema/tags'

// Connect to Vercel Postgres
export const db = drizzle(sql)
