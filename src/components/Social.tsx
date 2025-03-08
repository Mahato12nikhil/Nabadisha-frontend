import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { ISocial } from "../definitions/user";

interface SocialProps {
    socials?: ISocial; 
    onSocialClick:(url:string| undefined)=>void
  }
const Social=({socials, onSocialClick}:SocialProps)=>{
    return (
        <div className="flex space-x-4">
           {socials?.facebook? <FaFacebook size={20} onClick={()=>onSocialClick(socials.facebook)}/> :""}
           {socials?.instagram? <FaInstagram size={20} onClick={()=>onSocialClick(socials.instagram)}/>:""}
           {socials?.linkedin? <FaLinkedin size={20} onClick={()=>onSocialClick(socials.linkedin)}/>:""}
           {socials?.youtube?<FaYoutube size={20} onClick={()=>onSocialClick(socials.youtube)}/>:"" }
        </div>
    )
}
export default Social;