import {configureStore} from '@reduxjs/toolkit'
import SectionSlice from './reducers/section'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import memberSlice from './reducers/member';
import UserSlice from './reducers/user';
import dashBoardSlice from './reducers/dashboard';

export const store=configureStore({
    reducer:{
        section: SectionSlice,
        member:memberSlice,
        user: UserSlice.reducer,
        dashboard:dashBoardSlice.reducer

    }  
});
export type RootState=ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector;
export const useAppDispatch=useDispatch<typeof store.dispatch>;