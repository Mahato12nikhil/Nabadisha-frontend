import { useEffect } from "react";
import { Separator } from "../../components/ui/separator";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface DashboardHeaderProps{
    menu: string[] 
}
function DashBoardHeader({menu}:DashboardHeaderProps) {


  useEffect(()=>{
    //dispatch();
  },[])

  return (
    <div>
      
      <div className="flex h-5 items-center space-x-4 text-sm">
        {
            menu.map((val, ind)=>(
                <>
                    <div className="p-2 sm:text-lg active:bg-accent hover:bg-accent rounded-sm">{val}</div>
                    {ind!==menu.length-1?  <Separator key={ind} orientation="vertical" />:""}
                </>
                
            ))
        }
      </div>
    </div>
  );
}
export default DashBoardHeader;
