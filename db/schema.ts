import { serial, text, pgTable, pgEnum, integer } from 'drizzle-orm/pg-core'

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard'])
export const statusEnum = pgEnum('status', ['in-review', 'accepted'])

export const questions = pgTable('questions', {
  id: serial('serial').primaryKey(),
  title: text('title').notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  status: statusEnum('status').notNull(),
  questionMd: text('question_md').notNull(),
  tagIds: integer('tag_ids').array()
})

export const tags = pgTable('tags', {
  id: serial('serial').primaryKey(),
  label: text('label').notNull()
})

export type Tag = typeof tags.$inferSelect
export type Difficulty = (typeof difficultyEnum.enumValues)[number]
export type Status = (typeof statusEnum.enumValues)[number]
export type QuestionWithTags = Omit<typeof questions.$inferSelect, 'tagIds'> & {
  tags: Tag[]
}
export type QuestionPayload = typeof questions.$inferInsert
