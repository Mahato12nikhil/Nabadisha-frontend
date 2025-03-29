import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetContents } from "../../services/backend";
import { GetContentResponse, IContent } from "../../definitions/content";
import { CONTENT_ABOUT } from "../../utils/contants";

interface ContentSliceType {
  contents: IContent[];
  error?: string;
  about: IContent;
}
const initialState: ContentSliceType = {
  contents: [],
  error: undefined,
  about: {
    _id: "",
    section: "about",
    content: {
      en: {},
      bn: {},
    },
  },
};

export const fetchContents = createAsyncThunk<
  GetContentResponse,
  void,
  { rejectValue: string }
>("/contents", async (_, thunkApi) => {
  try {
    const response = await GetContents();
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.message || "Failed to fetch content");
  }
});
const ContentSlice = createSlice({
  name: "contentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContents.fulfilled, (state, action) => {
      state.contents = action.payload.data || [];
      action.payload.data?.map((content)=>{

        if(content.section===CONTENT_ABOUT){
          state.about=content
        }
      })
    });
    builder.addCase(fetchContents.rejected, (state, action) => {
      console.error("Failed to fetch contents:", action.payload);
      state.error = action.payload;
    });
  },
});
export default ContentSlice.reducer;
