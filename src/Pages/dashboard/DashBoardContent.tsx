import Admin from "./admin/Admin";
import Events from "./event/Events";
import Treasurer from "./treasurer/Treasurer";

interface DashBoardContentProps{
    section:string
}

const DashBoardContent: React.FC <DashBoardContentProps> =({section})=>{
    return (
        <div className="w-full bg-background">
            {section.toLowerCase()==="event".toLowerCase() && <Events/>}
            {section.toLowerCase()==="treasurer".toLowerCase() && <Treasurer/>}
            {section.toLowerCase()==="admin".toLowerCase() && <Admin/>}
        </div>
    )
}
export default DashBoardContent;