import { useState } from "react";
import CreateUpdateEvent from "./CreateUpdateEvent";
import CreateUpdateContent from "./CreateUpdateContent";
import CreateUpdateUser from "./CreateUpdateUser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const TOPIC = {
  EVENT: "event",
  USER: "user",
  CONTENT: "content",
};

const Admin: React.FC = () => {
  const [topic, setTopic] = useState<string>(TOPIC.EVENT);

  const handleChange = (value: string) => {
    setTopic(value);
  };

  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-4 px-4 md:px-0">
      <Select value={topic} onValueChange={handleChange}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={TOPIC.EVENT}>Create or update Event</SelectItem>
            <SelectItem value={TOPIC.CONTENT}>Create or update Content</SelectItem>
            <SelectItem value={TOPIC.USER}>Create or update Users</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {topic === TOPIC.EVENT && <CreateUpdateEvent />}
      {topic === TOPIC.CONTENT && <CreateUpdateContent />}
      {topic === TOPIC.USER && <CreateUpdateUser />}
    </div>
  );
};

export default Admin;
