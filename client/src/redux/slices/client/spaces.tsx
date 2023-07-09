import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_SPACE_BY_ID, GET_ROOM_BY_ID } from "@/graphql/queries";
import {
  CREATE_SPACE,
  DELETE_SPACE,
  EDIT_SPACE,
  CREATE_ROOM,
  EDIT_ROOM,
  DELETE_ROOM,
  CREATE_TASK,
  EDIT_TASK,
  DELETE_TASK,
} from "@/graphql/mutations";
import { serverUrl } from "@/data/config";
import axios from "axios";
import { toast } from "sonner";
import { toastError, toastWarning, toastSuccess } from "@/utils/toastStyles";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/router";
import Router from "next/router";
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

//-----------------------Thunks-----------------------//
//-----------------------Espacios-----------------------//
export const getCurrentSpace = createAsyncThunk(
  "spaces/getCurrentSpace",
  async (spaceId: string, { dispatch, getState }) => {
    try {
      const { data } = await client.query({
        query: GET_SPACE_BY_ID,
        variables: { id: spaceId },
        fetchPolicy: "network-only",
      });
      console.log("data sp enter", data.findSpaceById);
      return data.findSpaceById;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createSpace = createAsyncThunk(
  "spaces/createSpace",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: CREATE_SPACE,
        variables: {
          userOwner: state.authSession.session.current.id,
          name: input.name,
          description: input.description,
          accessCode: input.accessCode,
          coverImage: input.coverImage,
        },
        fetchPolicy: "network-only",
      });

      return data.createSpace;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteSpace = createAsyncThunk(
  "spaces/deleteSpace",
  async (info, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: DELETE_SPACE,
        variables: {
          id: state.client.spaces.currentSpace.id,
        },
        fetchPolicy: "network-only",
      });

      return data.deleteSpace;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editSpace = createAsyncThunk(
  "spaces/editSpace",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      //Agregamos el id del espacio a editar
      input.spaceId = state.client.spaces.currentSpace.id;
      const { data } = await client.mutate({
        mutation: EDIT_SPACE,
        variables: input,
        fetchPolicy: "network-only",
      });

      return data.editSpace;
    } catch (err) {
      console.log(err);
    }
  }
);

//-----------------------Salas-----------------------//
export const getRooms = createAsyncThunk(
  "spaces/getRooms",
  async (spaceId: string, { dispatch, getState }) => {
    try {
      const { data } = await client.query({
        query: GET_SPACE_BY_ID,
        variables: { id: spaceId },
        fetchPolicy: "network-only",
      });
      console.log("data sp enter", data.findSpaceById);
      return data.findSpaceById;
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
        query: GET_ROOM_BY_ID,
        variables: { id: roomId },
        fetchPolicy: "network-only",
      });
      console.log("data rm enter", data.findRoomById);
      return data.findRoomById;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createRoom = createAsyncThunk(
  "spaces/createRoom",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: CREATE_ROOM,
        variables: {
          spaceOwnerId: state.client.spaces.currentSpace.id,
          name: input.name,
          description: input.description,
          coverImage: input.coverImage,
        },
        fetchPolicy: "network-only",
      });

      return data.createRoom;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editRoom = createAsyncThunk(
  "spaces/editRoom",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      //Agregamos el id del espacio a editar
      input.roomId = state.client.spaces.currentRoom.id;
      const { data } = await client.mutate({
        mutation: EDIT_ROOM,
        variables: input,
        fetchPolicy: "network-only",
      });

      return data.editRoom;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "spaces/deleteRoom",
  async (info, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: DELETE_ROOM,
        variables: {
          id: state.client.spaces.currentRoom.id,
        },
        fetchPolicy: "network-only",
      });

      return data.deleteRoom;
    } catch (err) {
      console.log(err);
    }
  }
);

//-----------------------Tareas-----------------------//
export const createTask = createAsyncThunk(
  "spaces/createTask",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: CREATE_TASK,
        variables: {
          roomOwnerId: state.client.spaces.currentRoom.id,
          title: input.title,
          description: input.description,
          assignedToIds: input.assignedToIds,
          status: 1,
        },
        fetchPolicy: "network-only",
      });

      return data.createTask;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "spaces/deleteTask",
  async (info, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: DELETE_TASK,
        variables: {
          taskId: state.client.spaces.currentTask.id,
          roomId: state.client.spaces.currentRoom.id,
        },
        fetchPolicy: "network-only",
      });
console.log("data delete", data);
      return data.deleteTask;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editTask = createAsyncThunk(
  "spaces/editTask",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      //Agregamos el id del espacio a editar
      input.taskId = state.client.spaces.currentTask.id;
      input.roomId = state.client.spaces.currentRoom.id;
      const { data } = await client.mutate({
        mutation: EDIT_TASK,
        variables: input,
        fetchPolicy: "network-only",
      });

      return data.editTask;
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
    setCurrentTask: (state, action: PayloadAction<TasksProps>) => {
      //recibimos la tarea
      state.currentTask = action.payload as TasksProps;
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
      })
      .addCase(createSpace.pending, (state) => {
        // state.currentSpace = initialState.currentSpace;
      })
      .addCase(createSpace.fulfilled, (state, action) => {
        console.log("data createSpace", action.payload.id);
        state.currentSpace = action?.payload as SpaceProps;
        Router.push(`/client/${action.payload.id}`);
        toast.success("Espacio creado correctamente", toastSuccess);
      })
      .addCase(createSpace.rejected, (state) => {
        state.currentSpace = initialState.currentSpace;
      })
      .addCase(deleteSpace.pending, (state) => {
        // state.currentSpace = initialState.currentSpace;
      })
      .addCase(deleteSpace.fulfilled, (state, action) => {
        console.log("data rooms", action.payload);
        toast.success("Espacio borrado correctamente", toastSuccess);
        Router.push(`/client`);
      })
      .addCase(deleteSpace.rejected, (state) => {
        state.currentSpace = initialState.currentSpace;
      })
      .addCase(editSpace.pending, (state) => {
        // state.currentSpace = initialState.currentSpace;
      })
      .addCase(editSpace.fulfilled, (state, action) => {
        //Actualizamos el espacio actual
        state.currentSpace = {
          ...state.currentSpace,
          name: action.payload.name,
          description: action.payload.description,
          accessCode: action.payload.accessCode,
          coverImage: action.payload.coverImage,
        };
        toast.success("Espacio editado correctamente", toastSuccess);
      })
      .addCase(editSpace.rejected, (state) => {
        //state.currentSpace = initialState.currentSpace;
      })
      .addCase(createRoom.pending, (state) => {
        // state.currentSpace = initialState.currentSpace;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        console.log("data createRoom", action.payload);
        Router.push(`/client/${state.currentSpace.id}/${action.payload.id}`);
        toast.success("Sala creada correctamente", toastSuccess);
      })
      .addCase(createRoom.rejected, (state) => {
        //state.currentSpace = initialState.currentSpace;
      })
      .addCase(editRoom.pending, (state) => {
        // state.currentSpace = initialState.currentSpace;
      })
      .addCase(editRoom.fulfilled, (state, action) => {
        //Actualizamos el espacio actual
        state.currentRoom = {
          ...state.currentRoom,
          name: action.payload.name,
          description: action.payload.description,
          coverImage: action.payload.coverImage,
        };
        toast.success("Sala editada correctamente", toastSuccess);
      })
      .addCase(editRoom.rejected, (state) => {
        //state.currentSpace = initialState.currentSpace;
      })
      .addCase(deleteRoom.pending, (state) => {
        // state.currentSpace = initialState.currentSpace;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        console.log("data rooms", action.payload);
        toast.success("Sala borrada correctamente", toastSuccess);
        Router.push(`/client/${state.currentSpace.id}`);
      })
      .addCase(deleteRoom.rejected, (state) => {
        //state.currentSpace = initialState.currentSpace;
      })
      .addCase(createTask.pending, (state) => {
        // state.currentSpace = initialState.currentSpace;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        console.log("data createTask", action.payload);
        //añadir la tarea al estado
        state.currentRoom.tasks.push(action.payload);
        toast.success("Tarea creada correctamente", toastSuccess);
      })
      .addCase(createTask.rejected, (state) => {
        //state.currentSpace = initialState.currentSpace;
      })
      .addCase(editTask.pending, (state) => {
        // state.currentSpace = initialState.currentSpace;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        //Actualizamos la tarea actual
        //Actualizamos la tarea en el array de tareas de la sala
        state.currentRoom.tasks = state.currentRoom.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
              assignedTo: action.payload.assignedTo,
              status: action.payload.status,
            };
          } else {
            return task;
          }
        });

        toast.success("Tarea editada correctamente", toastSuccess);
      })
      .addCase(editTask.rejected, (state) => {
        //state.currentSpace = initialState.currentSpace;
      })
      .addCase(deleteTask.pending, (state) => {
        // state.currentSpace = initialState.currentSpace;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log("data rooms", action.payload);
        toast.success("Tarea borrada correctamente", toastSuccess);
        //Borramos la tarea del array de tareas de la sala
        state.currentRoom.tasks = state.currentRoom.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      });
  },
});

export const { resetReducer, setSpaces, setCurrentTask } = postsSlice.actions;

export default postsSlice.reducer;
