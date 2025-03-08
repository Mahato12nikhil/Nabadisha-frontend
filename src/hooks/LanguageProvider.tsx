import { createContext, useContext, useEffect, useState } from "react"
import { LANGUAGE, LANGUAGE_KEY } from "../utils/contants";


const LanguageContext=createContext({language: "bn", toggleLanguage:()=>{}})

export const LanguageProvider: React.FC<{children:React.ReactNode}>=({children})=>{

    const [language, SetLanguage]=useState<LANGUAGE>(LANGUAGE.bn);

    const toggleLanguage=()=>{
        SetLanguage(prev=>(prev==LANGUAGE.bn)?LANGUAGE.en:LANGUAGE.bn);
    }

    useEffect(()=>{
        localStorage.setItem(LANGUAGE_KEY,language);
    },[language])

    return (
        <LanguageContext.Provider value={{language, toggleLanguage}}>
                {children}
        </LanguageContext.Provider>
    )
    
}
export const useLanguage=()=>useContext(LanguageContext);