import Admin from "./Admin";
import Events from "./Events";
import Treasurer from "./Treasurer";

interface DashBoardContentProps{
    section:string
}

const DashBoardContent: React.FC <DashBoardContentProps> =({section})=>{
    return (
        <div className="w-full bg-background">
            {section==="event" && <Events/>}
            {section==="treasurer" && <Treasurer/>}
            {section==="admin" && <Admin/>}
        </div>
    )
}
export default DashBoardContent;