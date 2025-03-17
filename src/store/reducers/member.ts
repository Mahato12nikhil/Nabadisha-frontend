import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetMembers } from "../../services/backend";
import { RootState } from "../store";
import { IUser } from "../../definitions/user";

const initialState: IUser[] = [];

export const fetchMembers = createAsyncThunk<IUser[], void, { state: RootState }>(
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
      .addCase(fetchMembers.fulfilled, (_, action: PayloadAction<IUser[]>) => {
        return action.payload; 
      })
      .addCase(fetchMembers.rejected, (_, action) => {
        console.error(action.payload);
      });
  },
});

export default memberSlice.reducer;
