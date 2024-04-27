import type { Approval, Comment } from '@/lib/drizzle'
import { Suspense } from 'react'
import type { Timeline } from '@/db/queries'
import { getQuestionTimeline, getQuestionWithTags } from '@/db/queries'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { NewComment } from '../_components/new-comment'
import { AddApproval } from '../_components/add-approval'
import { CircleCheckBig } from 'lucide-react'
import { Question } from '@/components/ui/question'

export const dynamic = 'force-dynamic'

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
      <span className="flex flex-grow items-center gap-2">
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
  const question = await getQuestionWithTags(questionId)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <AddApproval questionId={questionId} />
      </div>
      <Question question={question} />
      <Suspense fallback={'Loading timeline'}>
        <Timeline questionId={questionId} />
        <NewComment questionId={questionId} />
      </Suspense>
    </div>
  )
}
