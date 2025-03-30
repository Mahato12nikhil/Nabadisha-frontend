import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchContents } from '../store/reducers/content';
import { useLanguage } from '../hooks/LanguageProvider';

const About: React.FC = () => {

    const { about } = useAppSelector((state) => state.content);
    const dispatch=useAppDispatch();
    const {language}=useLanguage()
    const langKey = language as keyof typeof about.content;
    useEffect(()=>{
        dispatch(fetchContents());
    },[])
    
    return (
        <section className="p-6 relative">
             {/* {true && <Loader/>} */}
            <h1 className="text-2xl mb-5">| About us</h1>

            <p className="text-lg leading-relaxed select-none">
                <span>{about?.content[langKey]?.journey?.split(" ").slice(0, 3).join(" ")}</span> {about?.content[langKey]?.journey?.split(" ").slice(3).join(" ")}
            </p>
            {/* <img 
                src={img} 
                className="w-60 h-auto float-right ml-6 mb-4 rounded-lg bg-black select-none" 
                alt="nabadisha poster" 
            /> */}
            <br/>
            <p className="text-lg leading-relaxed select-none">
                {about.content[langKey]?.vision}
                <br /><br />
                {about.content[langKey]?.mission}
                <br /><br />
                {about.content[langKey]?.commitment}
            </p>

        </section>
    );
};

export default About;
