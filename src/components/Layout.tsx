import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full fixed top-0 z-10">
                <Navbar />
            </div>
            <div className="flex-1 mt-20">  
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
