import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetMembers } from "../../services/backend";
import { RootState } from "../store";
import { GetMembersResponse, IUser } from "../../definitions/user";

interface MemberStateType{
  members:IUser[]
}
const initialState:MemberStateType = {
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
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.members = action.payload.users; 
      })
      .addCase(fetchMembers.rejected, (_, action) => {
        console.error(action.payload);
      });
  },
});

export default memberSlice.reducer;
