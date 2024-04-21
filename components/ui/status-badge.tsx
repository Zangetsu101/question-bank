import { Badge } from '@/components/ui/badge'
import { Status } from '@/db/schema'

export function StatusBadge(props: { status: Status }) {
  return (
    <Badge
      className={
        props.status === 'in-review'
          ? 'bg-yellow-500 hover:bg-yellow-500/80'
          : 'bg-green-500 hover:bg-green-500/80'
      }
    >
      {props.status}
    </Badge>
  )
}
