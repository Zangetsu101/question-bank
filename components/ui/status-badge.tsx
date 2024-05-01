import { Badge } from '@/components/ui/badge'
import { Status } from '@/db/schema'
import { cn } from '@/lib/utils'

export function StatusBadge(props: { status: Status }) {
  return (
    <Badge
      className={cn(
        props.status === 'in-review' && 'bg-yellow-700 hover:bg-yellow-700/80',
        props.status === 'accepted' && 'bg-green-700 hover:bg-green-700/80',
        'text-white'
      )}
    >
      {props.status}
    </Badge>
  )
}
