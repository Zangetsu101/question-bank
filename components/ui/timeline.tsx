import type { Approval, Comment } from '@/lib/drizzle'
import type { Timeline } from '@/db/queries'
import { getQuestionTimeline } from '@/db/queries'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CircleCheckBig } from 'lucide-react'
import { durationFormatter } from '@/lib/utils'

function isComment(commentOrApproval: Timeline): commentOrApproval is Comment {
  return 'text' in commentOrApproval
}

function Approval(props: { approval: Approval }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Avatar className="h-8 w-8">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span className="flex flex-grow gap-2 self-center">
        Approved these changes <CircleCheckBig stroke="#15803d" />
      </span>
      <span className="flex-shrink-0 text-[.7rem] text-muted-foreground">
        {durationFormatter.format(props.approval.createdAt)}
      </span>
    </div>
  )
}

function Comment(props: { comment: Comment }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Avatar className="h-8 w-8">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span className="flex-grow self-center">{props.comment.text}</span>
      <span className="flex-shrink-0 text-[.7rem] text-muted-foreground">
        {durationFormatter.format(props.comment.createdAt)}
      </span>
    </div>
  )
}

export async function Timeline(props: { questionId: number }) {
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
