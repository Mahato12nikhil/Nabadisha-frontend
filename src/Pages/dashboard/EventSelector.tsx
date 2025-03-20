import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { IEvent } from "../../definitions/event";
import { useEffect, useState } from "react";

interface EventProps {
  events: IEvent[];
  onSelect:(eventId:string)=>void
}

const EventSelector: React.FC<EventProps> = ({ events, onSelect }) => {
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  useEffect(() => {
    if (events.length > 0) {
      setSelectedEvent(events[0]?._id);
      onSelect(events[0]?._id);
    }
  }, [events]); 

  function handleChange(val:string){
    setSelectedEvent(val);
    onSelect(val);
  }
  return (
    <Select value={selectedEvent} onValueChange={handleChange}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select an event"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Events</SelectLabel>
          {events.map((val) => (
            <SelectItem value={val._id} key={val._id}>
              {val.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default EventSelector;
