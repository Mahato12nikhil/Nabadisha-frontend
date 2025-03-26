import img from '../assets/nabadisha_poster.png';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchAboutContent } from '../store/reducers/section';
import { useLanguage } from '../hooks/LanguageProvider';
import abouts from '../../MockData/about.json';

const About: React.FC = () => {

    const { about: aboutContent } = useAppSelector((state) => state.section);
    const dispatch=useAppDispatch();
    const {language}=useLanguage()
    const langKey = language as keyof typeof aboutContent.content;

    useEffect(()=>{
        dispatch(fetchAboutContent());
    },[])
    
    return (
        <section className="p-6">
            <h1 className="text-2xl mb-5">| About us</h1>

            <p className="text-lg leading-relaxed select-none">
                <span>{abouts?.data.content[langKey].journey.split(" ").slice(0, 3).join(" ")}</span> {abouts?.data.content[langKey].journey.split(" ").slice(3).join(" ")}
            </p>
            <img 
                src={img} 
                className="w-60 h-auto float-right ml-6 mb-4 rounded-lg bg-black select-none" 
                alt="nabadisha poster" 
            />
            <br/>
            <p className="text-lg leading-relaxed select-none">
                {abouts.data?.content[langKey].vision}
                <br /><br />
                {abouts.data?.content[langKey].mission}
                <br /><br />
                {abouts.data?.content[langKey].commitment}
            </p>
        </section>
    );
};

export default About;
