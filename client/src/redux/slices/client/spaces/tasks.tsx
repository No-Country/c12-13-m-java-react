import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { CREATE_TASK, EDIT_TASK, DELETE_TASK } from "@/graphql/mutations";
import { toast } from "sonner";
import { toastError, toastWarning, toastSuccess } from "@/utils/toastStyles";
import { RootState } from "@/redux/store/store";
import { TasksProps } from "@/utils/types/client/spaces";

const initialState = {
  currentRoomTasks: [] as TasksProps[],
  currentTask: {} as TasksProps,
};

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: CREATE_TASK,
        variables: {
          roomOwnerId: state.client.spaces.rooms.currentRoom.id,
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
  "tasks/deleteTask",
  async (info, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: DELETE_TASK,
        variables: {
          taskId: state.client.spaces.tasks.currentTask.id,
          roomId: state.client.spaces.rooms.currentRoom.id,
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
  "tasks/editTask",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      //Agregamos el id del espacio a editar
      input.taskId = state.client.spaces.tasks.currentTask.id;
      input.roomId = state.client.spaces.rooms.currentRoom.id;
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
  name: "tasks",
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<TasksProps>) => {
      //recibimos la tarea
      console.log("data current task", action.payload);
      state.currentTask = action.payload as TasksProps;
    },
    resetReducer: (state) => {
      state.currentRoomTasks = [];
      state.currentTask = {} as TasksProps;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createTask.pending, (state) => {})
      .addCase(createTask.fulfilled, (state, action) => {
        console.log("data createTask", action.payload);
        toast.success("Tarea creada correctamente", toastSuccess);
      })
      .addCase(createTask.rejected, (state) => {
        console.log("Error al crear tarea");
        toast.error("Error al crear tarea", toastError);
      })
      .addCase(editTask.pending, (state) => {})
      .addCase(editTask.fulfilled, (state, action) => {
        toast.success("Tarea editada correctamente", toastSuccess);
      })
      .addCase(editTask.rejected, (state) => {
        console.log("Error al editar tarea");
        toast.error("Error al editar tarea", toastError);
      })
      .addCase(deleteTask.pending, (state) => {})
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log("data rooms", action.payload);
        toast.success("Tarea borrada correctamente", toastSuccess);
      })
      .addCase(deleteTask.rejected, (state) => {
        console.log("Error al borrar tarea");
        toast.error("Error al borrar tarea", toastError);
      });
  },
});

export const { resetReducer, setCurrentTask } = postsSlice.actions;

export default postsSlice.reducer;
