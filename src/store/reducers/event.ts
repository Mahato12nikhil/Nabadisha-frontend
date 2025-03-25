import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetAllEventsResponse,
  GetEventCollectionResponse,
  GetEventExpensesResponse,
  GetPendingAmountResponse,
  ICollection,
  IEvent,
  IExpense,
  IPendingAmount,
} from "../../definitions/event";
import { RootState } from "../store";
import { GetAllEvents, GetAllPendingAmounts, GetCollections, GetEventExpenses } from "../../services/backend";

interface EventState {
  loading: boolean;
  error?: string;
  events: IEvent[];
  selectedEvent: IEvent | undefined;
  collection: {
    data: ICollection[];
    totalCount: number;
    pageSize: number;
    pageIndex: number;
    totalCollection: number;
    currentUserCollection: number;
  };
  expense: {
    data: IExpense[];
    totalExpenses: number;
    currentUserExpense:number
  };
  pendingApproval: {
    data: IPendingAmount[];
  };
}

const initialState: EventState = {
  loading: false,
  error: undefined,
  events: [],
  selectedEvent: undefined,
  collection: {
    data: [],
    totalCount: 0,
    pageSize: 10,
    pageIndex: 0,
    totalCollection: 0,
    currentUserCollection: 0,
  },
  expense: {
    data: [],
    totalExpenses: 0,
    currentUserExpense:0
  },
  pendingApproval:{
    data: []
  }
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
  { eventId: string },
  { state: RootState }
>("/event/collection/fetch", async ({ eventId }, thunkApi) => {
  try {
    const { pageSize } = thunkApi.getState().event.collection;
    const response = await GetCollections(eventId, 0, pageSize);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue("Failed to fetch collections");
  }
});

export const fetchExpenses = createAsyncThunk<
  GetEventExpensesResponse,
  { eventId: string },
  { state: RootState }
>("/event/expense/fetch", async ({ eventId }, thunkApi) => {
  try {
    const response = await GetEventExpenses(eventId);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue("Failed to fetch expenses");
  }
});

export const fetchPendingApprovals = createAsyncThunk<
  GetPendingAmountResponse,
  { eventId: string },
  { state: RootState }
>("/event/pending-approvals/fetch", async ({ eventId }, thunkApi) => {
  try {
    const response = await GetAllPendingAmounts({eventId});
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue("Failed to fetch pending approvals");
  }
});
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
      .addCase(fetchCollections.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.collection.totalCount = action.payload.totalCount || 0;
          state.collection.data = action.payload.data || [];
          state.collection.totalCollection = action.payload.totalCollection || 0;
          state.collection.currentUserCollection = action.payload.currentUserCollection || 0;
          state.collection.pageIndex = state.collection.pageIndex + 1;
        }
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.expense.data = action.payload.data || [];
          state.expense.totalExpenses = action.payload.totalExpense || 0;
          state.expense.currentUserExpense = action.payload.currentUserExpense || 0;
        }
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      builder
      .addCase(fetchPendingApprovals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.pendingApproval.data = action.payload.data || [];
        }
      })
      .addCase(fetchPendingApprovals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

  },
});

export default eventSlice;
export const { setSelectedEvent } = eventSlice.actions;
