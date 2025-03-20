import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetAllEventsResponse,
  GetEventCollectionResponse,
  ICollection,
  IEvent,
} from "../../definitions/event";
import { RootState } from "../store";
import { GetAllEvents, GetCollections } from "../../services/backend";

interface EventState {
  loading: boolean;
  error?: string;
  events: IEvent[];
  selectedEvent: IEvent | undefined;
  collection: {
    selectedEventCollections: ICollection[];
    totalCount: number;
  };
}
const initialState: EventState = {
  loading: false,
  error: undefined,
  events: [],
  selectedEvent: undefined,
  collection: {
    selectedEventCollections: [],
    totalCount: 0,
  },
};
export const fetchEvents = createAsyncThunk<
  GetAllEventsResponse,
  void,
  { state: RootState }
>("/event/fetch", async (_, thunkApi) => {
  try {
    const response = await GetAllEvents();
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue("Failed to fetch events");
  }
});
export const fetchCollections = createAsyncThunk<
  GetEventCollectionResponse,
  { eventId: string; pageIndex: number; pageSize: number },
  { state: RootState }
>(
  "/event/collection/fetch",
  async ({ eventId, pageIndex, pageSize }, thunkApi) => {
    try {
      const response = await GetCollections(eventId, pageIndex, pageSize);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue("Failed to fetch collections");
    }
  }
);
const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    setSelectedEvent: (state, action: PayloadAction<IEvent | undefined>) => {
      state.selectedEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<GetAllEventsResponse>) => {
          state.loading = false;
          if (action.payload.data) state.events = action.payload.data || [];
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCollections.fulfilled,
        (state, action: PayloadAction<GetEventCollectionResponse>) => {
          state.loading = false;
          state.collection.totalCount=action.payload.totalCount || 0;
          
          state.collection!.selectedEventCollections = [
            ...state.collection!.selectedEventCollections,
            ...(action.payload?.data || []),
          ];
        }
      )
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default eventSlice;
