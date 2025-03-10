import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

interface EventProps{
    events: string[]
}
const EventSelector : React.FC<EventProps>= ({events})=> {
  return (
    <Select>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Events</SelectLabel>
            {
                events.map((val)=>(
                    <SelectItem value={val}>{val}</SelectItem>
                ))
            }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default EventSelector;
