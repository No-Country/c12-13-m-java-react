import {
  LayoutSpaces,
  TasksList,
  HeroSpaceArea,
  RoomEditForm,
  EditManager,
  TaskCreateForm,
  CircularLoader,
} from "@/components";
import {
  deleteRoom,
  editRoom,
  addTask,
  deleteTask,
  editTask,
} from "@/redux/slices/client/spaces/rooms";
import {
  NOTIFY_TASK_CHANGED,
  NOTIFY_TASK_CREATED,
  NOTIFY_TASK_DELETED,
} from "@/graphql/subscriptions";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Head from "next/head";
import { useSubscription } from "@apollo/client";

export default function CurrentRoom() {
  const dispatch = useAppDispatch();
  const { currentRoom, roomLoading } = useAppSelector(
    (state) => state?.client?.spaces?.rooms
  );

  const [processedData, setProcessedData] = useState<any>(currentRoom);
  const [nowEditing, setNowEditing] = useState<boolean>(false);
  const indexItems = ["Todas", "To-do", "En progreso", "Completado"];

  const { data: datachange } = useSubscription(NOTIFY_TASK_CHANGED, {
    variables: { roomId: currentRoom?.id },
  });

  const { data: datacreate } = useSubscription(NOTIFY_TASK_CREATED, {
    variables: { roomId: currentRoom?.id },
  });

  const { data: datadelete } = useSubscription(NOTIFY_TASK_DELETED, {
    variables: { roomId: currentRoom?.id },
  });

  useEffect(() => {
    if (datachange?.notifyTaskChanged) {
      dispatch(editTask(datachange?.notifyTaskChanged));
    }
  }, [datachange]);

  useEffect(() => {
    if (datacreate?.notifyTaskCreated) {
      dispatch(addTask(datacreate?.notifyTaskCreated));
    }
  }, [datacreate]);

  useEffect(() => {
    console.log("deleteTask index", datadelete);
    if (datadelete?.notifyTaskDeleted) {
      dispatch(deleteTask(datadelete?.notifyTaskDeleted));
    }
  }, [datadelete]);

  const handleSave = async (editedData: any) => {
    console.log(editedData);
    await dispatch(editRoom(editedData));
  };

  return (
    <>
      <Head>
        <title>Room | Spaces</title>
      </Head>

      <LayoutSpaces type="client">
        {roomLoading ? (
          <RoomLoader />
        ) : (
          <>
            <HeroSpaceArea
              current={currentRoom}
              type="room"
              triggerText="Crear una tarea"
              secondControls={true}
              secondTriggerIsAdmin={true}
              triggerIsAdmin={false}
              triggerSecondText="Editar room"
              childrenSecond={
                <EditManager
                  processedData={processedData}
                  originalData={currentRoom}
                  title="Editar room"
                  deleteAction={deleteRoom}
                  nowEditing={nowEditing}
                  route={`/client`}
                  editAction={(editedData: any) => handleSave(editedData)}
                >
                  <RoomEditForm
                    originalData={currentRoom}
                    processedData={processedData}
                    setProcessedData={setProcessedData}
                    setNowEditing={setNowEditing}
                  />
                </EditManager>
              }
            >
              <TaskCreateForm />
            </HeroSpaceArea>
            <TasksList />
          </>
        )}
      </LayoutSpaces>
    </>
  );
}

function RoomLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center gap-4">
        <CircularLoader />
        <div>
          <p className="subtitulo">Cargando tu room</p>
          <p className="text-sm font-light">Solo un momento mas...</p>
        </div>
      </div>
    </div>
  );
}
