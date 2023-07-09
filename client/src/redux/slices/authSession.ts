import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_USER_BY_ID } from "@/graphql/queries";
import { AuthProps, SessionProps } from "@/utils/types/client/authSession";
import { User } from "@/utils/types/client/spaces";
import { setSpaces } from "@/redux/slices/client/spaces";
const urlServer = process.env.NEXT_PUBLIC_SERVER_URL;

const initialState = {
  auth: {} as AuthProps,
  session: {
    current: {} as User,
  },
};

export const setSession = createAsyncThunk(
  "auth/setSession",
  async (userId: string, { dispatch, getState }) => {
    try {
      console.log("setSession", userId);
      const { data } = await client.query({
        query: GET_USER_BY_ID,
        variables: { id: userId },
        fetchPolicy: "network-only",
      });
      console.log("data", data);
      dispatch(setSpaces(data.findUserById.spaces));
      return data.findUserById;
    } catch (err) {
      console.log(err);
    }
  }
);

//Reducers
const postsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthProps>) => {
      state.auth = action.payload;
      console.log("setAuth ok", action.payload);
    },
    resetReducer: (state) => {
      state.auth = initialState.auth;
      state.session = initialState.session;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSession.pending, (state, action) => {
        console.log("Pending setSession");
      })
      .addCase(setSession.fulfilled, (state, action) => {
       state.session.current = action?.payload as User;
        console.log("Fulfilled setSession", action.payload);
      })
      .addCase(setSession.rejected, (state, action) => {
        console.log("Rejected setSession");
      });
  },
});

export const { setAuth, resetReducer } = postsSlice.actions;

export default postsSlice.reducer;
