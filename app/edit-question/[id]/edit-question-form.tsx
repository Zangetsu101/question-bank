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
import { Difficulty, Question, Tag, difficultyEnum } from '@/lib/drizzle'
import React, { startTransition } from 'react'
import { editQuestion, createNewTag } from '@/db/mutations'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { isEqual } from 'lodash'
import { useRouter } from 'next/navigation'

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
    const newTag = await createNewTag({ label })
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

function SubmitButton(props: { disabled: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button
      className="self-start"
      type="submit"
      disabled={pending || props.disabled}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save
    </Button>
  )
}

export function EditQuestionForm(props: { question: Question; tags: Tag[] }) {
  const router = useRouter()
  const [selectedTags, setSelectedTags] = React.useState<number[]>(
    props.question.tagIds ?? []
  )
  const [difficulty, setDifficulty] = React.useState<Difficulty>(
    props.question.difficulty
  )
  const [questionMd, setQuestionMd] = React.useState(props.question.questionMd)
  const [title, setTitle] = React.useState(props.question.title)

  const changesMade = isEqual(
    {
      difficulty,
      title,
      questionMd,
      tagIds: selectedTags
    },
    {
      difficulty: props.question.difficulty,
      title: props.question.title,
      questionMd: props.question.questionMd,
      tagIds: props.question.tagIds ?? []
    }
  )

  return (
    <form
      action={async () => {
        await editQuestion({
          id: props.question.id,
          difficulty,
          title,
          questionMd,
          status: props.question.status,
          tagIds: selectedTags
        })
        router.refresh()
      }}
      className="w-full"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="difficulty">Difficulty: </Label>
            <Select
              value={difficulty}
              onValueChange={(v: Difficulty) => setDifficulty(v)}
            >
              <SelectTrigger id="difficulty" className="w-60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficultyEnum.enumValues.map((level) => (
                  <SelectItem key={level} value={level}>
                    {`${level[0].toUpperCase()}${level.substring(1)}`}
                  </SelectItem>
                ))}
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
          <Label htmlFor="title">Title: </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="question">Question: </Label>
          <Textarea
            value={questionMd}
            onChange={(e) => setQuestionMd(e.target.value)}
            id="question"
            className="min-h-[600px] resize-none"
          />
        </div>
        <SubmitButton disabled={changesMade} />
      </div>
    </form>
  )
}
