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

export const fetchEventData = createAsyncThunk<
  { collections: GetEventCollectionResponse; expenses: GetEventExpensesResponse },
  { eventId: string },
  { state: RootState }
>("/event/data/fetch", async ({ eventId }, thunkApi) => {
  try {
    const { pageSize } = thunkApi.getState().event.collection;

    const [collections, expenses] = await Promise.all([
      GetCollections(eventId, 0, pageSize),
      GetEventExpenses(eventId),
    ]);

    return { collections: collections.data, expenses: expenses.data };
  } catch (err) {
    return thunkApi.rejectWithValue("Failed to fetch event data");
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
          if (action.payload.data) state.events = action.payload.data || [];
          state.loading = false;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      builder
      .addCase(fetchPendingApprovals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.pendingApproval.data = action.payload.data || [];
          state.loading = false;
        }
      })
      .addCase(fetchPendingApprovals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      builder
      .addCase(fetchEventData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventData.fulfilled, (state, action) => {
        const { collections, expenses } = action.payload;
        
        if (collections.success) {
          state.collection.totalCount = collections.totalCount || 0;
          state.collection.data = collections.data || [];
          state.collection.totalCollection = collections.totalCollection || 0;
          state.collection.currentUserCollection = collections.currentUserCollection || 0;
        }
    
        if (expenses.success) {
          state.expense.data = expenses.data || [];
          state.expense.totalExpenses = expenses.totalExpense || 0;
          state.expense.currentUserExpense = expenses.currentUserExpense || 0;
        }
    
        state.loading = false;
      })
      .addCase(fetchEventData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventSlice;
export const { setSelectedEvent } = eventSlice.actions;
