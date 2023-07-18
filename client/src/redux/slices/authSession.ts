import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_USER_BY_ID } from "@/graphql/queries";
import { AuthClass } from "@/utils/types/client";
import { UserProps } from "@/utils/types/client";
import { setSpaces } from "@/redux/slices/client/spaces/spaces";
const urlServer = process.env.NEXT_PUBLIC_SERVER_URL;
import { VERIFY_SESSION } from "@/graphql/queries";
import { LOG_IN, CREATE_USER } from "@/graphql/mutations";
import Router from "next/router";
import { toast } from "sonner";
import { toastSuccess, toastError, toastWarning } from "@/utils/toastStyles";
import { RootState } from "../store/store";
import axios from "axios";
import { serverUrl } from "@/data/config";
const initialState = {
  auth: {} as AuthClass,
  session: {
    current: {} as UserProps,
    loading: false,
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
    } catch (err: any) {
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
    } catch (err: any) {
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
        variables: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          username: userData.username,
        },
        fetchPolicy: "network-only",
      });
      if (errors) console.log("Error al crear el usuario", errors);
      console.log("createSession", data);
      return data.createUser;
    } catch (err: any) {
      console.log("Error al crear el usuario", err);
      throw new Error("Error al crear el usuario", err);
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async (userData: any, { dispatch, getState }) => {
    try {
      console.log("userData", userData);
      const state = getState() as RootState;
      userData.userId = state.authSession.session.current.id;

      const res = await axios.put(`${serverUrl}rest/users/edit`, userData, {
        headers: {
          //multipart/form-data
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("res", res);
      return res.data;
    } catch (err: any) {
      console.log("Error al crear el usuario", err);
      throw new Error("Error al crear el usuario", err);
    }
  }
);

//Reducers
const postsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthClass>) => {
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
        if (action.meta.arg === state.session.current.id) {
          state.session.loading = false;
        } else {
          state.session.loading = true;
        }
      })
      .addCase(setSession.fulfilled, (state, action) => {
        state.session.current = new UserProps(
          action.payload.id,
          action.payload.firstName,
          action.payload.lastName,
          action.payload.username,
          action.payload.profileImage,
          action.payload.email,
          action.payload.isSuperAdmin,
          action.payload.softDelete,
          action.payload.coverImage,
          action.payload.spaces
        );
        console.log("Fulfilled setSession", action.payload);
        state.session.loading = false;
      })
      .addCase(setSession.rejected, (state, action) => {
        console.error("Rejected setSession", action.payload);
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
        console.error("Rejected login", action.payload);
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
        console.error("Rejected register", action);
        toast.error("Verifica los datos", toastError);
      })
      .addCase(editUser.pending, (state, action) => {
        console.log("Pending editUser");
        toast("Editando usuario") 
      })
      .addCase(editUser.fulfilled, (state, action) => {
        console.log("Fulfilled editUser", action.payload);
        state.session.current = new UserProps(
          action.payload.id,
          action.payload.firstName,
          action.payload.lastName,
          action.payload.username,
          action.payload.profileImage,
          action.payload.email,
          action.payload.isSuperAdmin,
          action.payload.softDelete,
          action.payload.coverImage,
          state.session.current.spaces
        );

        toast.success("Edición exitosa", toastSuccess);
      })
      .addCase(editUser.rejected, (state, action) => {
        console.error("Rejected editUser", action);
        toast.error("Verifica los datos", toastError);
      });
  },
});

export const { setAuth, resetReducer } = postsSlice.actions;

export default postsSlice.reducer;
