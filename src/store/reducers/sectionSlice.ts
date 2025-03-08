import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAboutContent } from "../../services/backend";
import { ContentSchema, GetAboutResponse, IAbout } from "../../definitions/content";
import { RootState } from "../store";


const initialState: ContentSchema<IAbout>={
        about:{
            content:{
                en:{
                    journey:"",
                    vision:"",
                    mission:"",
                    commitment:""
                },
                bn:{
                    journey:"",
                    vision:"",
                    mission:"",
                    commitment:""
                }
            }
              
        }
}

export const fetchAboutContent=createAsyncThunk<GetAboutResponse,void,{state: RootState}>('/content/about',async()=>{
   try{ 
        const data=await GetAboutContent();
        if(data){
            return data.data;
        }
   }
   catch(err){
    console.error(err)
   }
})
const SectionSlice=createSlice({
    name:'SectionSlice',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAboutContent.fulfilled,(state, action)=>{
            console.log("about state: "+action.payload.data.content)
            state.about.content=action.payload.data.content;
        });
    }
})
export default SectionSlice.reducer;