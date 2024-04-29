'use client'

import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { addApprovalAction } from './actions'

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
