import About from "../components/About";
import HomeCarousel from "../components/HomeCarousel";
import Member from "../components/member/Member";
import Tag from "../components/Tag";
const Home:React.FC=()=>{

    return (
        <div className="home">
            <Tag/>
            <br/>
            <HomeCarousel/>
            <About/>
            <Member/>
        </div>
    )
}
export default Home;