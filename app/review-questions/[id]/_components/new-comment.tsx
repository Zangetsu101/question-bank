'use client'

import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { addCommentAction } from './actions'

function CommentButton() {
  const { pending } = useFormStatus()
  return (
    <Button className="self-end" type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Comment
    </Button>
  )
}

export function NewComment(props: { questionId: number }) {
  const commentRef = React.useRef<HTMLTextAreaElement>(null)

  return (
    <form
      action={async () => {
        if (!commentRef.current) {
          return
        }
        await addCommentAction({
          questionId: props.questionId,
          text: commentRef.current.value
        })
        commentRef.current.value = ''
      }}
      className="w-full"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Textarea
            ref={commentRef}
            id="question"
            className="min-h-32"
            required
          />
        </div>
        <CommentButton />
      </div>
    </form>
  )
}
