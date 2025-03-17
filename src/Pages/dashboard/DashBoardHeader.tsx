import { useEffect } from "react";
import { Separator } from "../../components/ui/separator";
import { useAppDispatch, useAppSelector } from "../../store/store";

type DashBoardType="Events"|  "Profile" |  "Treasurer" | "Admin"

function DashBoardHeader() {

  const dashBoardTabs: DashBoardType [] =["Events", "Profile", "Treasurer", "Admin"] 
  const dispatch=useAppDispatch();

  useEffect(()=>{
    //get menu list
    //dispatch();
  },[])

  return (
    <div>
      
      <div className="flex h-5 items-center space-x-4 text-sm">
        {
            dashBoardTabs.map((val, ind)=>(
                <>
                    <div className="p-2 sm:text-lg active:bg-accent hover:bg-accent rounded-sm">{val}</div>
                    {ind!==dashBoardTabs.length-1?  <Separator key={ind} orientation="vertical" />:""}
                </>
                
            ))
        }
      </div>
    </div>
  );
}
export default DashBoardHeader;
