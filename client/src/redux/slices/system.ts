import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { AuthProps, SessionProps } from "@/utils/types/client/authSession";
import { setSpaces } from "@/redux/slices/client/spaces";
const urlServer = process.env.NEXT_PUBLIC_SERVER_URL;

type PaginationProps = {
  currentPage: {
    name: string;
    path: string;
  };
};

const initialState = {
  pagination: {
    currentPage: {
      name: "",
      path: "",
    },
  },
};

//Reducers
const postsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<PaginationProps>) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { setCurrentPage } = postsSlice.actions;

export default postsSlice.reducer;
