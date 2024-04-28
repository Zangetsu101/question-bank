'use client'

import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { addApproval } from '@/db/mutations'
import { RedirectType, redirect } from 'next/navigation'

function ApproveButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      className="bg-green-700 text-white hover:bg-green-700/80"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Check className="mr-2 h-4 w-4" />
      )}
      Approve
    </Button>
  )
}

export function AddApproval(props: { questionId: number }) {
  async function addApprovalAction(payload: Parameters<typeof addApproval>[0]) {
    'use server'
    const changedQuestion = await addApproval(payload)
    if (changedQuestion.status === 'accepted') {
      redirect(`/question-bank/${changedQuestion.id}`, RedirectType.replace)
    } else {
      redirect(`/review-questions/${changedQuestion.id}`, RedirectType.replace)
    }
  }

  return (
    <form
      action={async () => {
        await addApprovalAction({
          questionId: props.questionId
        })
      }}
    >
      <ApproveButton />
    </form>
  )
}
