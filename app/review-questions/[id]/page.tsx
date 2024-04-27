import type { Approval, Comment } from '@/lib/drizzle'
import { db } from '@/lib/drizzle'
import { Badge } from '@/components/ui/badge'
import { Suspense } from 'react'
import type { Timeline } from '@/db/queries'
import { getQuestionTimeline } from '@/db/queries'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { NewComment } from '../_components/new-comment'
import { AddApproval } from '../_components/add-approval'
import { CircleCheckBig } from 'lucide-react'

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

const durationFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeStyle: 'short'
})

function Comment(props: { comment: Comment }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Avatar className="h-8 w-8">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span className="flex-grow">{props.comment.text}</span>
      <span className="flex-shrink-0 text-[.7rem] text-muted-foreground">
        {durationFormatter.format(props.comment.createdAt)}
      </span>
    </div>
  )
}

function Approval(props: { approval: Approval }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Avatar className="h-8 w-8">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span className="flex flex-grow gap-2">
        Approved these changes <CircleCheckBig stroke="#15803d" />
      </span>
      <span className="flex-shrink-0 text-[.7rem] text-muted-foreground">
        {durationFormatter.format(props.approval.createdAt)}
      </span>
    </div>
  )
}

async function Timeline(props: { questionId: number }) {
  const timeline = await getQuestionTimeline(props.questionId)
  return (
    <div className="flex flex-col gap-2 py-4">
      {timeline.map((commentOrApproval, index) =>
        isComment(commentOrApproval) ? (
          <Comment key={index} comment={commentOrApproval} />
        ) : (
          <Approval key={index} approval={commentOrApproval} />
        )
      )}
    </div>
  )
}

export default async function Page({ params }: { params: { id: string } }) {
  const questionId = Number(params.id)
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <AddApproval questionId={questionId} />
      </div>
      <Question questionId={questionId} />
      <Suspense fallback={'Loading timeline'}>
        <Timeline questionId={questionId} />
        <NewComment questionId={questionId} />
      </Suspense>
    </div>
  )
}
