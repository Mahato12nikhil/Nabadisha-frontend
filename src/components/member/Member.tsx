import { useEffect } from "react";
import MemberCard from "./MemberCard";
import { fetchMembers } from "../../store/reducers/member";
import { useAppDispatch, useAppSelector } from "../../store/store";

import members from '../../../MockData/members.json'
const Member: React.FC =()=>{
    const dispatch=useAppDispatch()
    //const members=useAppSelector(state=>state.member)

    
    useEffect(()=>{
        dispatch(fetchMembers());
      },[])

    return (
        <section className="p-6  w-full">

            <h2 className="text-2xl mb-5">| Meet us</h2>
            <div className="w-full flex flex-row items-center justify-center">
                <MemberCard members={members.data}/>
            </div>
           
        </section>
    )
}
export default Member;