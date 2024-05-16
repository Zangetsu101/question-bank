'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandInput,
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
import { cn } from '@/lib/utils'
import { CheckIcon, Loader2, PlusCircleIcon } from 'lucide-react'

export function TagComboboxPopover(props: {
  tags: (Tag & { isPending?: boolean })[]
  selectedTags: number[]
  onSelect: (tagId: number) => void
  addNewTag: (label: string) => void
}) {
  const [value, setValue] = React.useState('')

  return (
    <div className="flex items-center space-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-60 justify-start"
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Tag
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
              <CommandGroup>
                {props.tags.map((tag) => {
                  const isSelected = props.selectedTags.includes(tag.id)
                  return (
                    <CommandItem
                      key={tag.id}
                      value={tag.label}
                      onSelect={() => {
                        props.onSelect(tag.id)
                        setValue('')
                      }}
                    >
                      {tag.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <CheckIcon className={cn('h-4 w-4')} />
                        </div>
                      )}
                      <span>{tag.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {value && (
                <CommandGroup>
                  <CommandItem
                    value={`create:${value}:`}
                    onSelect={() => {
                      props.addNewTag(value)
                      setValue('')
                    }}
                  >
                    Add &quot;{value}&quot; to tags
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
