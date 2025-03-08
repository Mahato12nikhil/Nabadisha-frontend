import About from "../components/About";
import Footer from "../components/Footer";
import HomeCarousel from "../components/HomeCarousel";
import Member from "../components/member/Member";
import Navbar from "../components/Navbar";
import Tag from "../components/Tag";
const Home:React.FC=()=>{

    return (
        <div className="home">
            <div className="w-full fixed top-0 z-10">
                <Navbar/>
            </div>
            
            <div className="m-15"/>
            <Tag/>
            <br/>
            <HomeCarousel/>
            <About/>
            <Member/>
            <Footer/>
        </div>
    )
}
export default Home;