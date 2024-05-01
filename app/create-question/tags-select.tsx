'use client'
import { Badge } from '@/components/ui/badge'
import { TagComboboxPopover } from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'
import { Tag } from '@/lib/drizzle'
import React, { startTransition } from 'react'
import { createNewTagAction } from './actions'

export function Tags(props: {
  selectedTags: number[]
  tags: Tag[]
  onSelect: (tagId: number) => void
}) {
  const [tags, addNewTag] = React.useOptimistic<
    (Tag & { isPending?: boolean })[],
    string
  >(props.tags, (state, newTag) => [
    ...state,
    { id: props.tags.length + 100, label: newTag, isPending: true }
  ])
  async function handleNewTag(label: string) {
    startTransition(() => {
      addNewTag(label)
    })
    const newTag = await createNewTagAction({ label })
    props.onSelect(newTag.id)
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <Label htmlFor="tags" className="mr-2">
          Tags:
        </Label>
        {tags
          .filter(
            ({ id, isPending }) => props.selectedTags.includes(id) || isPending
          )
          .map(({ id, label, isPending }) => (
            <Badge key={id} variant={isPending ? 'secondary' : 'default'}>
              {label}
            </Badge>
          ))}
      </div>
      <TagComboboxPopover
        tags={tags}
        selectedTags={props.selectedTags}
        onSelect={props.onSelect}
        addNewTag={handleNewTag}
      />
    </div>
  )
}
