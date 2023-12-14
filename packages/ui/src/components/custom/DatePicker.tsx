import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

interface DatePickerProps {
  error?: boolean
}

export default function DatePicker({ error }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"skyBlue-light"}
          className={cn(
            `w-[280px] justify-start text-left font-normal ${error && 'outline outline-1 outline-destructive'}`,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-duber-skyBlue" />
          {date ? format(date, "PPP") : <span className="text-duber-skyBlue-low">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          classNames={{
            day_selected: "bg-duber-skyBlue text-primary-foreground hover:bg-duber-skyBlue-dark hover:text-primary-foreground focus:bg-duber-skyBlue focus:text-primary-foreground",
            day_today: "bg-duber-skyBlue-light text-duber-skyBlue"
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
