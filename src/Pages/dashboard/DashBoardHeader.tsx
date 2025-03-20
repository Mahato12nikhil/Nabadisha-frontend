import { useEffect } from "react";
import { Separator } from "../../components/ui/separator";

interface DashboardHeaderProps {
  menu: string[];
  onClick: (section: string) => void;
  section: string;
}

function DashBoardHeader({ menu, onClick, section }: DashboardHeaderProps) {
  useEffect(() => {
    //dispatch();
  }, []);

  return (
    <div className="bg-accent p-2">
      <div className="flex h-5 items-center space-x-4 text-sm">
        {menu.map((val, ind) => (
          <div key={val} className="flex items-center">
            <div
              className={`p-2 text-lg rounded-t-md cursor-pointer ${
                section.toLowerCase() === val.toLowerCase() ? "bg-background" :""
              }`}
              onClick={() => onClick(val)}
            >
              {val}
            </div>
            {ind !== menu.length - 1 && <Separator orientation="vertical" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashBoardHeader;
