import { serial, text, pgTable } from 'drizzle-orm/pg-core'

export const tagsTable = pgTable('tags', {
  id: serial('serial').primaryKey(),
  label: text('label').notNull()
})

export type Tag = typeof tagsTable.$inferSelect
