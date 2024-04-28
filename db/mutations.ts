'use server'

import {
  ApprovalPayload,
  CommentPayload,
  Difficulty,
  Question,
  QuestionPayload,
  TagPayload,
  approvals,
  comments,
  db,
  questionEdits,
  questions,
  tags
} from '@/lib/drizzle'
import { eq } from 'drizzle-orm'
import { isEqual } from 'lodash'
import { RedirectType, redirect } from 'next/navigation'

const APPROVALS_REQUIRED: Record<Difficulty, number> = {
  easy: 1,
  medium: 1,
  hard: 2
}

export async function createNewTag(payload: TagPayload) {
  const newTag = await db.insert(tags).values(payload).returning()
  return newTag[0]
}

export async function createNewQuestion(payload: QuestionPayload) {
  await db.insert(questions).values(payload)
  redirect('/', RedirectType.replace)
}

type EditedQuestion = Omit<Question, 'updatedAt'>

export async function editQuestion(newQuestion: EditedQuestion) {
  const id = newQuestion.id
  const oldQuestion = await db.query.questions.findFirst({
    where: (model, { eq }) => eq(model.id, id)
  })
  if (!oldQuestion) {
    throw new Error('No question found with given id')
  }
  await updateQuestion(newQuestion, oldQuestion)
}

export async function addComment(payload: CommentPayload) {
  await db.insert(comments).values(payload)
}

export async function addApproval(payload: ApprovalPayload) {
  await db.insert(approvals).values(payload)
  const questionWithApprovals = await db.query.questions.findFirst({
    where: (model, { eq }) => eq(model.id, payload.questionId),
    with: { approvals: true }
  })
  if (!questionWithApprovals) {
    throw new Error('No question found with given id')
  }
  const { approvals: questionApprovals, ...question } = questionWithApprovals
  const id = question.id
  if (questionApprovals.length >= APPROVALS_REQUIRED[question.difficulty]) {
    const acceptedQuestion = {
      ...question,
      status: 'accepted'
    } satisfies Question
    await updateQuestion(acceptedQuestion, question)
    redirect(`/question-bank/${id}`, RedirectType.replace)
  }
}

type QuestionDiff = Omit<Partial<Question>, 'id' | 'updatedAt'>

function findDifference(
  oldQuestion: Question,
  newQuestion: EditedQuestion
): QuestionDiff {
  const diff: QuestionDiff = {}
  if (oldQuestion.status !== newQuestion.status) {
    diff.status = oldQuestion.status
  }
  if (oldQuestion.title !== newQuestion.title) {
    diff.title = oldQuestion.title
  }
  if (!isEqual(oldQuestion.tagIds, newQuestion.tagIds)) {
    diff.tagIds = oldQuestion.tagIds
  }
  if (oldQuestion.difficulty !== newQuestion.difficulty) {
    diff.difficulty = oldQuestion.difficulty
  }
  if (oldQuestion.questionMd !== newQuestion.questionMd) {
    diff.questionMd = oldQuestion.questionMd
  }
  return diff
}

async function updateQuestion(
  newQuestion: EditedQuestion,
  oldQuestion: Question
) {
  const id = newQuestion.id
  const diff = findDifference(oldQuestion, newQuestion)
  await db
    .insert(questionEdits)
    .values({ ...diff, questionId: id, updatedAt: oldQuestion.updatedAt })
  await db.update(questions).set(newQuestion).where(eq(questions.id, id))
}
