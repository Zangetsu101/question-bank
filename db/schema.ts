import { relations } from 'drizzle-orm'
import { serial, text, pgTable, pgEnum, integer } from 'drizzle-orm/pg-core'

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard'])

export const questions = pgTable('questions', {
  id: serial('serial').primaryKey(),
  difficulty: difficultyEnum('difficulty').notNull(),
  questionMd: text('question_md').notNull()
})

export const questionsRelations = relations(questions, ({ many }) => ({
  questionTags: many(questionTags)
}))

export const tags = pgTable('tags', {
  id: serial('serial').primaryKey(),
  label: text('label').notNull()
})

export const tagsRelations = relations(tags, ({ many }) => ({
  questionTags: many(questionTags)
}))

export const questionTags = pgTable('question_tags', {
  id: serial('serial').primaryKey(),
  questionId: integer('question_id')
    .notNull()
    .references(() => questions.id),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tags.id)
})

export const questionTagsRelations = relations(questionTags, ({ one }) => ({
  question: one(questions, {
    fields: [questionTags.questionId],
    references: [questions.id]
  }),
  tag: one(tags, {
    fields: [questionTags.tagId],
    references: [tags.id]
  })
}))

export type Tag = typeof tags.$inferSelect
export type Question = typeof questions.$inferSelect
export type QuestionPayload = typeof questions.$inferInsert
