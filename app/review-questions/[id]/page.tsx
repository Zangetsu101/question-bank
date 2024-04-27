import type { Approval, Comment } from '@/lib/drizzle'
import { db } from '@/lib/drizzle'
import { Badge } from '@/components/ui/badge'
import { Suspense } from 'react'
import type { Timeline } from '@/db/queries'
import { getQuestionTimeline } from '@/db/queries'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { NewComment } from '../_components/new-comment'

export const dynamic = 'force-dynamic'

async function Question(props: { questionId: number }) {
  const [question, tags] = await Promise.all([
    db.query.questions.findFirst({
      where: (model, { eq }) => eq(model.id, Number(props.questionId))
    }),
    db.query.tags.findMany()
  ])
  if (!question) {
    throw new Error(`No question found with the given id: ${props.questionId}`)
  }
  return (
    <div className="flex flex-col gap-8 rounded-lg bg-secondary p-4">
      <div className="flex justify-between">
        <div>
          <b>Difficulty: </b>
          <span className="capitalize">{question.difficulty}</span>
        </div>
        {question.tagIds && (
          <div>
            <b>Tags: </b>
            <div className="inline-flex gap-1 pl-1">
              {question.tagIds
                .map((id) => tags.find((tag) => tag.id === id)!)
                .map(({ id, label }) => (
                  <Badge key={id}>{label}</Badge>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="whitespace-pre-line break-words">
        {question.questionMd}
      </div>
    </div>
  )
}

function isComment(commentOrApproval: Timeline): commentOrApproval is Comment {
  return 'text' in commentOrApproval
}

function Comment(props: { comment: Comment }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      {props.comment.text}
    </div>
  )
}

function Approval(_props: { approval: Approval }) {
  return (
    <div className="flex">
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      User approved these changes
    </div>
  )
}

async function Timeline(props: { questionId: number }) {
  const timeline = await getQuestionTimeline(props.questionId)
  return timeline.map((commentOrApproval, index) =>
    isComment(commentOrApproval) ? (
      <Comment key={index} comment={commentOrApproval} />
    ) : (
      <Approval key={index} approval={commentOrApproval} />
    )
  )
}

export default async function Page({ params }: { params: { id: string } }) {
  const questionId = Number(params.id)
  return (
    <div className="flex flex-col gap-4">
      <Question questionId={questionId} />
      <Suspense fallback={'Loading timeline'}>
        <Timeline questionId={questionId} />
        <NewComment questionId={questionId} />
      </Suspense>
    </div>
  )
}
