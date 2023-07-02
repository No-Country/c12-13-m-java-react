import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_AFTER_LOGIN } from "@/graphql/queries";
import { AuthProps, SessionProps } from "@/utils/types/client/authSession";
import { setSpaces } from "@/redux/slices/client/spaces";
const urlServer = process.env.NEXT_PUBLIC_SERVER_URL;

const initialState = {
  auth: {} as AuthProps,
  session: {
    current: {} as SessionProps,
  },
};

export const setSession = createAsyncThunk(
  "auth/setSession",
  async (userId: string, { dispatch, getState }) => {
    try {
      const { data } = await client.query({
        query: GET_AFTER_LOGIN,
        variables: { id: userId },
      });
      console.log("data", data);
      dispatch(setSpaces(data.AfterLogin.spaces));
      return data;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSession.pending, (state, action) => {
        console.log("Pending setSession");
      })
      .addCase(setSession.fulfilled, (state, action) => {
        state.session.current = action?.payload?.AfterLogin as SessionProps;
        console.log("Fulfilled setSession", action.payload);
      })
      .addCase(setSession.rejected, (state, action) => {
        console.log("Rejected setSession");
      });
  },
});

export const { setAuth } = postsSlice.actions;

export default postsSlice.reducer;
