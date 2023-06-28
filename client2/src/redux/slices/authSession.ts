import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const urlServer = process.env.NEXT_PUBLIC_SERVER_URL;

const initialState = {
  auth: {
    isLogged: false,
    loginMethod: "",
    isSeller: false,
    isAdmin: false,
    tokenValid: false,
    google: {
      googleSessionID: "",
    },
    json: {
      token: "",
    },
  },
  session: {
    current: {
      firstName: "",
      lastName: "",
      bio: "",
      profilePicture: "",
      _id: "",
      email: "",
      userName: "",
      backImage: "",
    },
  },
  actionStatus: {
    getUserDataLoading: false,
  },
};

//Actions
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (data: string, { dispatch, getState }) => {
    try {
    } catch (error: any) {
      console.log(error);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  }
);

//Reducers
const postsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginMethod: (state, action: PayloadAction<string>) => {
      state.auth.loginMethod = action.payload;
    },
    setGoogleSuccefull: (state, action: PayloadAction<string>) => {
      state.auth.isLogged = true;
      state.auth.tokenValid = true;
      state.auth.google.googleSessionID = action.payload;
    },

    resetReducer: (state) => {
      state.auth = initialState.auth;
      state.session = initialState.session;
      state.actionStatus = initialState.actionStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {})
      .addCase(getUserData.fulfilled, (state, action: any) => {
        state.auth = { ...state.auth, ...action.payload.auth };
        state.session.current = {
          ...state.session.current,
          ...action.payload.session,
        };
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.auth.isLogged = false;
        state.auth.tokenValid = false;
      });
  },
});

export const { setLoginMethod, setGoogleSuccefull, resetReducer } =
  postsSlice.actions;

export default postsSlice.reducer;
