import EventSelector from "./EventSelector";
import { RiRadioButtonLine } from "react-icons/ri";

const Treasurer : React.FC=()=>{
    let status='ongoing';
    const events=["Saraswati puja, 2025", "Blood donation camp, 2025", "Tree-plantation, 2025"]
    return (
        <div>
            {/* Events-> Events dropdown -> ongoing or closed -> if ongoing (check if any pending approvals for collection) if closed
                summary in pdf, 
            -*/}
            <div>
                <div className="flex items-center">
                    <EventSelector events={events}/>
                    <span className="m-5">
                       { status==="ongoing"? <div className="flex items-center">Ongoing <RiRadioButtonLine size={20} color="green"/></div> :<div className="flex items-center">Closed <RiRadioButtonLine size={20} color="red"/></div> }
                    </span>
                </div>
                
            </div>
        </div>
    )
}
export default Treasurer;