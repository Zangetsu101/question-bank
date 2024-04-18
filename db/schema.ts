import { serial, text, pgTable, pgEnum } from 'drizzle-orm/pg-core'

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard'])

export const questions = pgTable('questions', {
  id: serial('serial').primaryKey(),
  difficulty: difficultyEnum('difficulty').notNull(),
  questionMd: text('question_md').notNull(),
  tags: text('tags').array()
})

export const tags = pgTable('tags', {
  id: serial('serial').primaryKey(),
  label: text('label').notNull()
})

export type Tag = typeof tags.$inferSelect
export type Difficulty = (typeof difficultyEnum.enumValues)[number]
export type Question = typeof questions.$inferSelect
export type QuestionPayload = typeof questions.$inferInsert
