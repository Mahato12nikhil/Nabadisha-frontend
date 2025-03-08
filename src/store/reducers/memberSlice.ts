import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetMembers } from "../../services/backend";
import { RootState } from "../store";
import { GetMembersResponse, IUser } from "../../definitions/user";


const initialState: IUser[]=[]

export const fetchMembers=createAsyncThunk<GetMembersResponse,void,{state: RootState}>('/member/get',async()=>{
   try{ 
        const data=await GetMembers();
        if(data){
            return data.data;
        }
   }
   catch(err){
    console.error(err)
   }
})
const memberSlice=createSlice({
    name:'memberSlice',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchMembers.fulfilled,(_, action)=>{
          return action.payload.data;
        });
    }
})
export default memberSlice.reducer;