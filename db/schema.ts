import { relations } from 'drizzle-orm'
import {
  serial,
  text,
  pgTable,
  pgEnum,
  integer,
  timestamp
} from 'drizzle-orm/pg-core'

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard'])
export const statusEnum = pgEnum('status', ['in-review', 'accepted'])

export const questions = pgTable('questions', {
  id: serial('serial').primaryKey(),
  title: text('title').notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  status: statusEnum('status').notNull(),
  questionMd: text('question_md').notNull(),
  tagIds: integer('tag_ids').array().notNull().default([]),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const questionsRelations = relations(questions, ({ many }) => ({
  editHistories: many(questionEdits),
  comments: many(comments),
  approvals: many(approvals)
}))

export const tags = pgTable('tags', {
  id: serial('serial').primaryKey(),
  label: text('label').notNull()
})

export const questionEdits = pgTable('question_edits', {
  id: serial('serial').primaryKey(),
  questionId: integer('question_id')
    .notNull()
    .references(() => questions.id),
  title: text('title'),
  difficulty: difficultyEnum('difficulty'),
  status: statusEnum('status'),
  questionMd: text('question_md'),
  tagIds: integer('tag_ids').array(),
  updatedAt: timestamp('updated_at')
})

export const questionEditsRelations = relations(questionEdits, ({ one }) => ({
  question: one(questions, {
    fields: [questionEdits.questionId],
    references: [questions.id]
  })
}))

export const comments = pgTable('comments', {
  id: serial('serial').primaryKey(),
  questionId: integer('question_id')
    .notNull()
    .references(() => questions.id),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const commentsRelations = relations(comments, ({ one }) => ({
  question: one(questions, {
    fields: [comments.questionId],
    references: [questions.id]
  })
}))

export const approvals = pgTable('approvals', {
  id: serial('serial').primaryKey(),
  questionId: integer('question_id')
    .notNull()
    .references(() => questions.id),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const approvalsRelations = relations(approvals, ({ one }) => ({
  question: one(questions, {
    fields: [approvals.questionId],
    references: [questions.id]
  })
}))

export type Tag = typeof tags.$inferSelect
export type TagPayload = typeof tags.$inferInsert
export type Difficulty = (typeof difficultyEnum.enumValues)[number]
export type Status = (typeof statusEnum.enumValues)[number]
export type Question = typeof questions.$inferSelect
export type QuestionPayload = typeof questions.$inferInsert
export type Comment = typeof comments.$inferSelect
export type CommentPayload = typeof comments.$inferInsert
export type Approval = typeof approvals.$inferSelect
export type ApprovalPayload = typeof approvals.$inferInsert
export type QuestionWithTags = Omit<typeof questions.$inferSelect, 'tagIds'> & {
  tags: Tag[]
}
