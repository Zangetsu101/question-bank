'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

type Tag = {
  value: string
  label: string
}

const tags: Tag[] = [
  {
    value: 'array',
    label: 'array'
  },
  {
    value: 'string',
    label: 'string'
  },
  {
    value: 'dp',
    label: 'dp'
  },
  {
    value: 'graph',
    label: 'graph'
  }
]

export function ComboboxPopover() {
  const [open, setOpen] = React.useState(false)
  const [selectedTag, setSelectedTag] = React.useState<Tag | null>(null)

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-60 justify-start"
          >
            {selectedTag ? <>{selectedTag.label}</> : <>+ Tag</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Add tag..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {tags.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedTag(
                        tags.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
