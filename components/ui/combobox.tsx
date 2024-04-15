'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Tag } from '@/lib/drizzle'

export function TagComboboxPopover(props: {
  tags: Tag[]
  onSelect: (tagId: number) => void
  addNewTag: (label: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-60 justify-start"
          >
            + Tag
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput
              value={value}
              onValueChange={setValue}
              placeholder="Add tag..."
            />
            <CommandList>
              <CommandEmpty>
                {value ? (
                  <span
                    className="cursor-pointer"
                    onClick={() => props.addNewTag(value)}
                  >
                    Add &quot;{value}&quot; to tags
                  </span>
                ) : (
                  'No tags found'
                )}
              </CommandEmpty>
              <CommandGroup>
                {props.tags.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    value={tag.label}
                    onSelect={() => {
                      props.onSelect(tag.id)
                      setValue('')
                    }}
                  >
                    <span>{tag.label}</span>
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
