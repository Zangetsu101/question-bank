import { Button } from '@/components/ui/button'
import { ComboboxPopover } from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
              <Label htmlFor="tags">Tags: </Label>
              <ComboboxPopover />
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
    </main>
  )
}
