import { Badge } from '@/components/ui/badge'
import { Status } from '@/db/schema'

export function StatusBadge(props: { status: Status }) {
  return (
    <Badge
      className={
        props.status === 'in-review' ? 'bg-yellow-500' : 'bg-green-500'
      }
    >
      {props.status}
    </Badge>
  )
}
