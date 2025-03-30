import About from "../components/About";
import HomeCarousel from "../components/HomeCarousel";
import Member from "../components/member/Member";
import Tag from "../components/Tag";
import Loader from "../components/ui/loader";
import { useAppSelector } from "../store/store";

const Home:React.FC=()=>{
    const memberLoading = useAppSelector(state => state.member.loading);
    const contentLoading = useAppSelector(state => state.content.loading);
    
    const isLoading = memberLoading || contentLoading;
return (
        <div className="home relative">
            {isLoading && <Loader/>}
            <Tag/>
            <br/>
            <HomeCarousel/>
            <About/>
            <Member/>
        </div>
    )
}
export default Home;