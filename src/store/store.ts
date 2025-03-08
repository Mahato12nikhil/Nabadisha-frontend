import {configureStore} from '@reduxjs/toolkit'
import SectionSlice from './reducers/sectionSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import memberSlice from './reducers/memberSlice';

export const store=configureStore({
    reducer:{
        section: SectionSlice,
        member:memberSlice
    }  
});
export type RootState=ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector;
export const useAppDispatch=useDispatch<typeof store.dispatch>;