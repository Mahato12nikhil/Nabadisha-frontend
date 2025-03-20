import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DashBoardMenuResponse } from "../../definitions/dashboard";
import { GetDashBoardMenu } from "../../services/backend";

interface DashBoardStateType {
    loading: boolean;
    dashMenu: string[];
}

const initialState: DashBoardStateType = {
    loading: false,
    dashMenu: [],
};

export const dashboardMenu = createAsyncThunk<DashBoardMenuResponse, { roles: string[] }, { rejectValue: string }>(
    "/dashboard/dashmenu",
    async ({ roles }, thunkApi) => {
        try {
            const { data } = await GetDashBoardMenu(roles);
            return data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message || "Dashboard menu fetch failed");
        }
    }
);
export const dashmenuPrefix = {
    admin: 'admin',
    // profile: 'profile',
    event: 'event',
    treasurer: 'treasurer',
};

const convertToMenu = (permissions: string[]) => {
    const menuOrder = ['Admin', 'Profile', 'Event', 'Treasurer'];
    const menuSet = new Set<string>();

    permissions.forEach(permission => {
        if (permission.startsWith(dashmenuPrefix.admin)) {
            menuSet.add('Admin');
        // } else if (permission.startsWith(dashmenuPrefix.profile)) {
        //     menuSet.add('Profile');
        // 
        } else if (permission.startsWith(dashmenuPrefix.event)) {
            menuSet.add('Event');
        } else if (permission.startsWith(dashmenuPrefix.treasurer)) {
            menuSet.add('Treasurer');
        }
    });

    return menuOrder.filter(menuItem => menuSet.has(menuItem));
};
const dashBoardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dashboardMenu.pending, (state) => {
                state.loading=true;
            })
            .addCase(dashboardMenu.fulfilled, (state, action) => {
                state.loading=false;
                state.dashMenu=convertToMenu(action.payload.data?.permissions || []);
            })
            .addCase(dashboardMenu.rejected, (state, action) => {
                state.loading=false;
                console.error(action.payload);
            });
    },
});

export default dashBoardSlice;