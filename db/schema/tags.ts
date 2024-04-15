import { serial, text, pgTable } from 'drizzle-orm/pg-core'

export const tagsTable = pgTable('tags', {
  id: serial('serial'),
  label: text('label').notNull()
})
