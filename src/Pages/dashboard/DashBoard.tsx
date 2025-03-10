import DashBoardContent from "./DashBoardContent";
import DashBoardHeader from "./DashBoardHeader";

const DashBoard : React.FC=()=>{

    const name="Nikhil Mahato"
    const role="member"
    return (
        <div className="flex flex-col justify-center items-center gap-5 pb-5 pt-5 ">
            <h2>{name}, {role.charAt(0).toUpperCase()+role.slice(1).toLowerCase()} of BNS</h2>
            <DashBoardHeader/>
            <DashBoardContent/>
        </div>
    )
}
export default DashBoard;