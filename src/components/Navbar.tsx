import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/theme-provider";
import icon from "../assets/bns-final.png";
import LanguageToggle from "./LanguageToggleButton";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate();
    
   const onNavbarClick=(page:string)=>{
        navigate(page);
        if(isOpen) setIsOpen(false);
   }

    return (
        <div className="w-full p-4 shadow-md bg-background transition-all duration-700 ease-in-out">
            <div className="flex w-full justify-between items-center">

                <div className="flex items-center gap-2">
                    <img src={icon} className="h-12 w-auto" alt="Logo" />
                </div>

                <div className="flex-1 flex justify-end">
                    <nav className="hidden sm:flex gap-1 items-center">
                        <span className="navbar-content-item" onClick={()=>onNavbarClick('/')}>Home</span>
                        <span className="navbar-content-item" onClick={()=>onNavbarClick('/dashboard')}>Dashboard</span>
                        <span className="navbar-content-item" onClick={()=>onNavbarClick('/activity')}>Activities</span>
                        <span className="navbar-content-item" onClick={()=>onNavbarClick('/gallery')}>Gallery</span>
                        <span className="navbar-content-item" onClick={()=>onNavbarClick('/login')}>Login</span>
                    </nav>
                </div>

                <div className="flex items-center gap-2 ml-2">
                    <LanguageToggle/>

                    <button className="rounded-md p-2 hover:bg-accent transition" onClick={toggleTheme}>
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button className="sm:hidden rounded-md p-2 hover:bg-accent transition" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <nav className="flex flex-col sm:hidden gap-1 mt-2">
                     <span className="navbar-content-item" onClick={()=>onNavbarClick('/')}>Home</span>
                        <span className="navbar-content-item" onClick={()=>onNavbarClick('/dashboard')}>Dashboard</span>
                        <span className="navbar-content-item" onClick={()=>onNavbarClick('/activity')}>Activities</span>
                        <span className="navbar-content-item" onClick={()=>onNavbarClick('/gallery')}>Gallery</span>
                        <span className="navbar-content-item" onClick={()=>onNavbarClick('/login')}>Login</span>
                </nav>
            )}
        </div>
    );
};

export default Navbar;
