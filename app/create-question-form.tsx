'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TagComboboxPopover } from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tag } from '@/lib/drizzle'
import React, { startTransition } from 'react'
import { createNewTag } from './actions'

function Tags(props: {
  selectedTags: number[]
  tags: Tag[]
  onSelectTag: (tagId: number) => void
  onDeselectTag: (tagId: number) => void
}) {
  const [selectedTags, addNewTag] = React.useOptimistic<
    (Omit<Tag, 'id'> & { id?: number })[],
    string
  >(
    props.tags.filter((tag) => props.selectedTags.includes(tag.id)),
    (state, newTag) => [...state, { label: newTag }]
  )
  async function handleNewTag(label: string) {
    startTransition(() => {
      addNewTag(label)
    })
    const newTag = await createNewTag(label)
    props.onSelectTag(newTag.id)
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <Label htmlFor="tags" className="mr-2">
          Tags:
        </Label>
        {selectedTags.map(({ id, label }) =>
          id ? (
            <Badge
              key={id}
              className="cursor-pointer"
              onClick={() => props.onDeselectTag(id)}
            >
              {label}
            </Badge>
          ) : (
            <Badge variant="secondary" key={label}>
              {label}
            </Badge>
          )
        )}
      </div>
      <TagComboboxPopover
        tags={props.tags}
        onSelect={props.onSelectTag}
        addNewTag={handleNewTag}
      />
    </div>
  )
}

export function CreateQuestionForm(props: { tags: Tag[] }) {
  const [selectedTags, setSelectedTags] = React.useState<number[]>([])
  return (
    <form className="w-full max-w-3xl">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="difficulty">Difficulty: </Label>
            <Select defaultValue="easy">
              <SelectTrigger id="difficulty" className="w-60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Tags
              selectedTags={selectedTags}
              tags={props.tags}
              onSelectTag={(tagId) =>
                setSelectedTags((prevTags) =>
                  Array.from(new Set([...prevTags, tagId]))
                )
              }
              onDeselectTag={(tagId) =>
                setSelectedTags((prevTags) =>
                  prevTags.filter((id) => id !== tagId)
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="question">Question: </Label>
          <Textarea id="question" className="min-h-[700px] resize-none" />
        </div>
        <Button className="self-start" type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}
