import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetLoginResponse, IUser, LoginPayload } from "../../definitions/user";
import { Login, RenewLogin } from "../../services/backend";
import { UpdateToLocalStorage } from "../../services/misc";
import { REFRESH_TOKEN } from "../../utils/contants";

interface UserState {
  isLoggedIn?: boolean;
  loading: boolean;
  error?: string;
  user?: IUser;
  token?:string
  refreshToken?:string
}

const initialState: UserState = {
  isLoggedIn: false,
  loading: false,
  error: "",
  user: undefined,
};

export const login = createAsyncThunk<GetLoginResponse, LoginPayload, { rejectValue: string }>(
  "/user/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await Login(credentials);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message || "Login failed");
    }
  }
);
export const renewLogin = createAsyncThunk<GetLoginResponse, {refreshToken:string}, { rejectValue: string }>(
  "/user/renewlogin",
  async (credentials, thunkApi) => {
    try {
      const { data } = await RenewLogin(credentials.refreshToken);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message || "Login renew failed");
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<GetLoginResponse>) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token=action.payload.data.token;
        state.refreshToken=action.payload.data.refreshToken
        state.error = undefined;
        state.isLoggedIn = true;
        UpdateToLocalStorage(REFRESH_TOKEN, state.refreshToken);
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });

      builder.addCase(renewLogin.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      }
      ).addCase(renewLogin.fulfilled, (state, action: PayloadAction<GetLoginResponse>) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token=action.payload.data.token;
        state.refreshToken=action.payload.data.refreshToken
        state.error = undefined;
        state.isLoggedIn = true;
        UpdateToLocalStorage(REFRESH_TOKEN, state.refreshToken);
      }
      ).addCase(renewLogin.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "An error occurred"
      });
  },
});

export const {}=UserSlice.actions;
export default UserSlice;
