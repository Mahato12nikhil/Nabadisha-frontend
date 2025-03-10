import About from "../components/About";
import HomeCarousel from "../components/HomeCarousel";
import Member from "../components/member/Member";
import Tag from "../components/Tag";
import DashBoard from "./dashboard/DashBoard";
import Login from "./Login";
const Home:React.FC=()=>{

    return (
        <div className="home">
            <Tag/>
            <br/>
            <HomeCarousel/>
            <About/>
            <Member/>
            <DashBoard/>
        </div>
    )
}
export default Home;