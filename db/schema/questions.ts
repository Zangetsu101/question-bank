import { serial, text, pgTable, pgEnum } from 'drizzle-orm/pg-core'

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard'])

export const questionsTable = pgTable('questions', {
  id: serial('serial').primaryKey(),
  difficulty: difficultyEnum('difficulty').notNull(),
  questionMd: text('question_md').notNull()
})

export type Question = typeof questionsTable.$inferSelect
export type QuestionPayload = typeof questionsTable.$inferInsert
