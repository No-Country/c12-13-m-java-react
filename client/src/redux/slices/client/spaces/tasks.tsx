import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { CREATE_TASK, EDIT_TASK, DELETE_TASK } from "@/graphql/mutations";
import { toast } from "sonner";
import { toastError, toastWarning, toastSuccess } from "@/utils/toastStyles";
import { RootState } from "@/redux/store/store";
import { TasksProps } from "@/utils/types/client";

const initialState = {
  currentRoomTasks: [] as TasksProps[],
  currentTask: new TasksProps("", "", "", "", 0, [], []),
};

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (input: any, { dispatch, getState }) => {
    try {
      console.log("input createTask", input);
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
      console.log("input editTask", input);
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
    if (action.payload instanceof TasksProps) {
      state.currentTask = action.payload;
    }
  }
    ,
    setCurrentRoomTasks: (state, action: PayloadAction<TasksProps[]>) => {
      //recibimos la tarea
      console.log("data current room tasks", action.payload);
      state.currentRoomTasks = action.payload as TasksProps[];
    },
    addTaskSubs: (state, action: PayloadAction<TasksProps>) => {
      console.log("addTask redux", action.payload);
      state.currentRoomTasks.push(action.payload);
    },
    deleteTaskSubs: (state, action: PayloadAction<TasksProps>) => {
      console.log("deleteTask redux", action.payload);
      state.currentRoomTasks = state.currentRoomTasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
    editTaskSubs: (state, action: PayloadAction<TasksProps>) => {
      console.log("editTask redux", action.payload);
      state.currentRoomTasks = state.currentRoomTasks.map((task) => {
        if (task.id === action.payload.id) {
          console.log("encontrado");
          const newTask = new TasksProps(
            action.payload.id,
            action.payload.title,
            action.payload.description,
            action.payload.deadline,
            action.payload.status,
            action.payload.assignedTo,
            action.payload.comments
          );
          console.log("newTask", newTask);
          return newTask;
        } else {
          console.log("no encontrado");
          return task;
        }
      });
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

export const { resetReducer, setCurrentTask, setCurrentRoomTasks, addTaskSubs, editTaskSubs, deleteTaskSubs } = postsSlice.actions;

export default postsSlice.reducer;
