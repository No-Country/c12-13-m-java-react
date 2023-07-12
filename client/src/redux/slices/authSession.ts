import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_USER_BY_ID } from "@/graphql/queries";
import { AuthProps, SessionProps } from "@/utils/types/client/authSession";
import { User } from "@/utils/types/client/spaces";
import { setSpaces } from "@/redux/slices/client/spaces/spaces";
const urlServer = process.env.NEXT_PUBLIC_SERVER_URL;
import { VERIFY_SESSION } from "@/graphql/queries";
import { LOG_IN, CREATE_USER } from "@/graphql/mutations";
import Router from "next/router";
import { toast } from "sonner";
import { toastSuccess, toastError, toastWarning } from "@/utils/toastStyles";
const initialState = {
  auth: {} as AuthProps,
  session: {
    current: {} as User,
    verification: false,
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
    } catch (err:any) {
      throw new Error("Error al loguear el usuario", err);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: any, { dispatch, getState }) => {
    try {
      console.log("credentials", credentials);
      const { data } = await client.mutate({
        mutation: LOG_IN,
        variables: { email: credentials.email, password: credentials.password },
        fetchPolicy: "network-only",
      });

      console.log("createSession", data);
      return data.createSession;
    } catch (err:any) {
      throw new Error("Error al loguear el usuario", err);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: any, { dispatch, getState }) => {
    try {
console.log("userData", userData);
      const { data, errors } = await client.mutate({
        mutation: CREATE_USER,
        variables: { ...userData },
        fetchPolicy: "network-only",
      });
      console.log("createSession", data);
      return data.createUser;
    } catch (err:any) {
      throw new Error("Error al crear el usuario", err);
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
      })
      .addCase(login.pending, (state, action) => {
        console.log("Pending login");
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Fulfilled login", action.payload);
        Router.push(
          `/client?id=${action.payload.userId}&status=ok&session=${action.payload.id}&loginMethod=local`
        );
        toast("Bienvenido a Spaces");
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Rejected login");
        toast.error("Verifica las credenciales", toastError);
      })
      .addCase(register.pending, (state, action) => {
        console.log("Pending register");
      })  
      .addCase(register.fulfilled, (state, action) => {
        console.log("Fulfilled register", action.payload);
        toast.success("Registro exitoso", toastSuccess);
        Router.push("/auth");
      })
      .addCase(register.rejected, (state, action) => {
        console.log("Rejected register");
        toast.error("Verifica las credenciales", toastError);
      });
  },
});

export const { setAuth, resetReducer } = postsSlice.actions;

export default postsSlice.reducer;
