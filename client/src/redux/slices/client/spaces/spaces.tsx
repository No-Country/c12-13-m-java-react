import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_SPACE_BY_ID } from "@/graphql/queries";
import {
  CREATE_SPACE,
  DELETE_SPACE,
  EDIT_SPACE,
  JOIN_SPACE,
  LEAVE_SPACE,
  SEND_MESSAGE,

} from "@/graphql/mutations";
import { serverUrl } from "@/data/config";

import { toast } from "sonner";
import { toastError, toastWarning, toastSuccess } from "@/utils/toastStyles";
import { RootState } from "@/redux/store/store";
import Router from "next/router";
import { SpaceProps, ChatProps } from "@/utils/types/client/spaces";
import axios from "axios";

const initialState = {
  spaces: [] as SpaceProps[],
  currentSpace: {} as SpaceProps,
  currentSpaceChat: {} as ChatProps,
  userIsAdminOfCurrentSpace: false,
  spaceLoading: false,
};

export const getCurrentSpace = createAsyncThunk(
  "spaces/getCurrentSpace",
  async (spaceId: string, { dispatch, getState }) => {
    try {
      const { data } = await client.query({
        query: GET_SPACE_BY_ID,
        variables: { id: spaceId },
        fetchPolicy: "network-only",
      });

      return data.findSpaceById;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
);

export const createSpace = createAsyncThunk(
  "spaces/createSpace",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      input.userOwner = state.authSession.session.current.id;
      // const { data } = await client.mutate({
      //   mutation: CREATE_SPACE,
      //   variables: {
      //     userOwner: state.authSession.session.current.id,
      //     name: input.name,
      //     description: input.description,
      //     accessCode: input.accessCode,
      //     coverImage: input.coverImage,
      //   },
      //   fetchPolicy: "network-only",
      // });

      const res = await axios.post(
        `${serverUrl}rest/spaces/create`,
        input,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
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
          id: state.client.spaces.spaces.currentSpace.id,
        },
        fetchPolicy: "network-only",
      });

      return data.deleteSpace;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const editSpace = createAsyncThunk(
  "spaces/editSpace",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      //Agregamos el id del espacio a editar
      input.spaceId = state.client.spaces.spaces.currentSpace.id;
      const { data } = await client.mutate({
        mutation: EDIT_SPACE,
        variables: input,
        fetchPolicy: "network-only",
      });

      return data.editSpace;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

//-----------------------Chat-----------------------//
export const sendMessage = createAsyncThunk(
  "spaces/sendMessage",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: SEND_MESSAGE,
        variables: {
          userId: state.authSession.session.current.id,
          chatId: state.client.spaces.spaces.currentSpaceChat.id,
          content: input.message,
        },
        fetchPolicy: "network-only",
      });

      return data.sendMessage;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

//-----------------------Otros-----------------------//
export const joinSpace = createAsyncThunk(
  "spaces/joinSpace",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: JOIN_SPACE,
        variables: {
          accessCode: input.accessCode,
          userId: state.authSession.session.current.id,
          spaceId: input.spaceId,
        },
        fetchPolicy: "network-only",
      });
      console.log("data joinSpace", data);
      return data.joinSpace;
    } catch (err) {
      console.log(err);
    }
  }
);

export const leaveSpace = createAsyncThunk(
  "spaces/leaveSpace",
  async (data, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      console.log("state", state.authSession.session.current.id);
      console.log("state", state.client.spaces.spaces.currentSpace.id);
      const { data } = await client.mutate({
        mutation: LEAVE_SPACE,
        variables: {
          userId: state.authSession.session.current.id,
          spaceId: state.client.spaces.spaces.currentSpace.id,
        },
        fetchPolicy: "network-only",
      });

      return data.leaveSpace;
    } catch (err) {
      console.log(err);
    }
  }
);

//usamos leave
export const expulseMember = createAsyncThunk(
  "spaces/expulseMember",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: LEAVE_SPACE,
        variables: {
          userId: input.userId,
          spaceId: state.client.spaces.spaces.currentSpace.id,
        },
        fetchPolicy: "network-only",
      });

      return data.leaveSpace;
    } catch (err) {
      console.log(err);
    }
  }
);

//Reducers
const postsSlice = createSlice({
  name: "spaces",
  initialState,
  reducers: {
    setSpaces: (state, action: PayloadAction<SpaceProps[]>) => {
      console.log("action.payload setspaces", action.payload);
      state.spaces = action.payload as SpaceProps[];
    },
    setIsAdminOfCurrentSpace: (state, action: PayloadAction<boolean>) => {
      state.userIsAdminOfCurrentSpace = action.payload;
    },
    addMessage: (state, action: PayloadAction<any>) => {
      console.log("action.payload addMessage", action.payload);
      state.currentSpaceChat.messages.push(action.payload);
    },
    resetReducer: (state) => {
      state.spaces = initialState.spaces;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentSpace.pending, (state, action) => {
        console.log("state pendinf", action);
        if(action.meta.arg === state.currentSpace.id){
          state.spaceLoading = false;
        } else {
          state.spaceLoading = true;
        }

      })
      .addCase(getCurrentSpace.fulfilled, (state, action) => {
        state.currentSpace = action?.payload as SpaceProps;
        state.currentSpaceChat = action?.payload?.chat as ChatProps;
        state.spaceLoading = false;
        console.log("state.currentSpace", state.currentSpace);
      })
      .addCase(getCurrentSpace.rejected, (state) => {
        console.log("Error al obtener espacio");
        toast.error("Error al obtener espacio", toastError);
      })
      .addCase(createSpace.pending, (state) => {})
      .addCase(createSpace.fulfilled, (state, action) => {
        state.currentSpace = action?.payload as SpaceProps;
        Router.push(`/client/${action.payload}`);
        toast.success("Espacio creado correctamente", toastSuccess);
      })
      .addCase(createSpace.rejected, (state) => {
        console.log("Error al crear espacio");
        toast.error("Error al crear espacio", toastError);
      })
      .addCase(deleteSpace.pending, (state) => {})
      .addCase(deleteSpace.fulfilled, (state, action) => {
        toast.success("Espacio borrado correctamente", toastSuccess);
        Router.push(`/client`);
      })
      .addCase(deleteSpace.rejected, (state) => {
        console.log("Error al borrar espacio");
        toast.error("Error al borrar espacio", toastError);
      })
      .addCase(editSpace.pending, (state) => {})
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
        console.log("Error al editar espacio");
        toast.error("Error al editar espacio", toastError);
      })

      .addCase(joinSpace.pending, (state) => {})
      .addCase(joinSpace.fulfilled, (state, action) => {
        Router.push(`/client/${action.payload.id}`);
        toast.success("Espacio unido correctamente", toastSuccess);
      })
      .addCase(joinSpace.rejected, (state) => {
        console.log("Error al unirse al espacio");
        toast.error("Error al unirse al espacio", toastError);
      })
      .addCase(leaveSpace.pending, (state) => {})
      .addCase(leaveSpace.fulfilled, (state, action) => {
        Router.push(`/client`);
        toast.success("Espacio abandonado correctamente", toastSuccess);
      })
      .addCase(leaveSpace.rejected, (state) => {
        console.log("Error al abandonar espacio");
        toast.error("Error al abandonar espacio", toastError);
      })
      .addCase(expulseMember.pending, (state) => {})
      .addCase(expulseMember.fulfilled, (state, action) => {
        toast.success("Miembro expulsado correctamente", toastSuccess);
      })
      .addCase(expulseMember.rejected, (state) => {
        console.log("Error al expulsar miembro");
        toast.error("Error al expulsar miembro", toastError);
      })
      .addCase(sendMessage.pending, (state) => {})
      .addCase(sendMessage.fulfilled, (state, action) => {})
      .addCase(sendMessage.rejected, (state) => {
        console.log("Error al enviar mensaje");
        toast.error("Error al enviar mensaje", toastError);
      });
  },
});

export const {
  resetReducer,
  setSpaces,
  addMessage,
  setIsAdminOfCurrentSpace,
} = postsSlice.actions;

export default postsSlice.reducer;
