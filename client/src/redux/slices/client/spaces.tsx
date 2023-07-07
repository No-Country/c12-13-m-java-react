import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_ON_SPACE_ENTER, GET_ON_ROOM_ENTER } from "@/graphql/queries";
import { serverUrl } from "@/data/config";
import axios from "axios";
import {
  SpaceProps,
  RoomsProps,
  MembersProps,
  TasksProps,
} from "@/utils/types/client/spaces";

const initialState = {
  spaces: [] as SpaceProps[],
  currentSpace: {} as SpaceProps,
  rooms: [] as RoomsProps[],
  currentRoom: {} as RoomsProps,
  currentTask: {} as TasksProps,
};

export const getCurrentSpace = createAsyncThunk(
  "spaces/getCurrentSpace",
  async (spaceId: string, { dispatch, getState }) => {
    try {
      const { data } = await client.query({
        query: GET_ON_SPACE_ENTER,
        variables: { id: spaceId },
        fetchPolicy: "network-only",
      });
      console.log("data sp enter", data.Space);
      return data.Space;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getRooms = createAsyncThunk(
  "spaces/getRooms",
  async (spaceId: string, { dispatch, getState }) => {
    try {
      const { data } = await client.query({
        query: GET_ON_SPACE_ENTER,
        variables: { id: spaceId },
        fetchPolicy: "network-only",
      });
      console.log("data sp enter", data.Space);
      return data.Space;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getCurrentRoom = createAsyncThunk(
  "spaces/getCurrentRoom",
  async (roomId: string, { dispatch, getState }) => {
    try {
      console.log("roomId", roomId);
      const { data } = await client.query({
        query: GET_ON_ROOM_ENTER,
        variables: { id: roomId },
        fetchPolicy: "network-only",
      });
      console.log("data rm enter", data.Room);
      return data.Room;
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
    setSpaces: (state, action: PayloadAction<SpaceProps[]>) => {
      console.log("data spaces", action.payload);
      state.spaces = action.payload as SpaceProps[];
    },
    resetReducer: (state) => {
      state.spaces = initialState.spaces;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
      //  state.rooms = initialState.rooms;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        console.log("data rooms", action.payload);
        state.rooms = action?.payload?.rooms as RoomsProps[] | [];
        state.currentSpace = action?.payload as SpaceProps;
      })
      .addCase(getRooms.rejected, (state) => {
        state.rooms = initialState.rooms;
      })
      .addCase(getCurrentRoom.pending, (state) => {
       // state.currentRoom = initialState.currentRoom;
      })
      .addCase(getCurrentRoom.fulfilled, (state, action) => {
        console.log("data rooms", action.payload);
        state.currentRoom = action.payload as RoomsProps;
      })
      .addCase(getCurrentRoom.rejected, (state) => {
        state.currentRoom = initialState.currentRoom;
      })
      .addCase(getCurrentSpace.pending, (state) => {
       // state.currentSpace = initialState.currentSpace;
      })
      .addCase(getCurrentSpace.fulfilled, (state, action) => {
        console.log("data rooms", action.payload);
        state.currentSpace = action?.payload as SpaceProps;
      })
      .addCase(getCurrentSpace.rejected, (state) => {
        state.currentSpace = initialState.currentSpace;
      });
  },
});

export const { resetReducer, setSpaces } = postsSlice.actions;

export default postsSlice.reducer;
