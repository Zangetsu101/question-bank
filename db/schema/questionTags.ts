import { serial, pgTable, integer } from 'drizzle-orm/pg-core'
import { questionsTable } from './questions'
import { tagsTable } from './tags'

export const questionTagsTable = pgTable('question_tags', {
  id: serial('serial').primaryKey(),
  questionId: integer('question_id').references(() => questionsTable.id),
  tagId: integer('tag_id').references(() => tagsTable.id)
})
