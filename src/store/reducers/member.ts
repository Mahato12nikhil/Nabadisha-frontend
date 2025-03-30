import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetMembers } from "../../services/backend";
import { RootState } from "../store";
import { GetMembersResponse, IUser } from "../../definitions/user";

interface MemberStateType{
  loading:boolean,
  members:IUser[]
}
const initialState:MemberStateType = {
  loading:false,
  members:[]
};

export const fetchMembers = createAsyncThunk<GetMembersResponse, void, { state: RootState }>(
  "/member/get",
  async (_, thunkApi) => {
    try {
      const response = await GetMembers();
      return response.data; // Ensure response.data is IUser[]
    } catch (err) {
      return thunkApi.rejectWithValue("Failed to fetch members");
    }
  }
);

const memberSlice = createSlice({
  name: "memberSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchMembers.pending, (state) => {
      state.loading = true; 
    })
    builder
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.members = action.payload.users; 
        state.loading=false;
      })
      .addCase(fetchMembers.rejected, (_, action) => {
        console.error(action.payload);
        _.loading=false;
      });
  },
});

export default memberSlice.reducer;
