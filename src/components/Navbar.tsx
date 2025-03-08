import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../components/theme-provider";
import icon from "../assets/bns-final.png";
import LanguageToggle from "./LanguageToggleButton";

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full p-4 shadow-md bg-background">
            <div className="flex w-full justify-between items-center">

                <div className="flex items-center gap-2">
                    <img src={icon} className="h-12 w-auto" alt="Logo" />
                </div>

                <div className="flex-1 flex justify-end">
                    <nav className="hidden sm:flex gap-1 items-center">
                        <span className="navbar-content-item">Home</span>
                        <span className="navbar-content-item">Dashboard</span>
                        <span className="navbar-content-item">Activities</span>
                        <span className="navbar-content-item">Gallery</span>
                        <span className="navbar-content-item">Login</span>
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
                    <span className="navbar-content-item">Home</span>
                    <span className="navbar-content-item">Dashboard</span>
                    <span className="navbar-content-item">Activities</span>
                    <span className="navbar-content-item">Gallery</span>
                    <span className="navbar-content-item">Login</span>
                </nav>
            )}
        </div>
    );
};

export default Navbar;
