import {
  LayoutSpaces,
  TasksList,
  HeroSpaceArea,
  RoomEditForm,
  EditManager,
  TaskCreateForm,
  CircularLoader,
} from "@/components";
import { deleteRoom, editRoom } from "@/redux/slices/client/spaces/rooms";
import {
  addTaskSubs,
  deleteTaskSubs,
  editTaskSubs,
} from "@/redux/slices/client/spaces/tasks";
import {
  NOTIFY_TASK_CHANGED,
  NOTIFY_TASK_CREATED,
  NOTIFY_TASK_DELETED,
} from "@/graphql/subscriptions";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Head from "next/head";
import { useSubscription } from "@apollo/client";
import { GeneralPermission } from "@/utils/types/client";
import { RoomsProps } from "@/utils/types/client";

export default function CurrentRoom() {
  const dispatch = useAppDispatch();
  const { currentRoom: cRoom, roomLoading } = useAppSelector(
    (state) => state?.client?.spaces?.rooms
  );

  const currentRoom = RoomsProps.deserialize(cRoom);

  const [processedData, setProcessedData] = useState<any>(currentRoom);
  const [nowEditing, setNowEditing] = useState<boolean>(false);

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
      dispatch(editTaskSubs(datachange?.notifyTaskChanged));
    }
  }, [datachange]);

  useEffect(() => {
    console.log("createTask index", datacreate);
    if (datacreate?.notifyTaskCreated) {
      dispatch(addTaskSubs(datacreate?.notifyTaskCreated));
    }
  }, [datacreate]);

  useEffect(() => {
    console.log("deleteTask index", datadelete);
    if (datadelete?.notifyTaskDeleted) {
      dispatch(deleteTaskSubs(datadelete?.notifyTaskDeleted));
    }
  }, [datadelete]);
  const [loading, setLoading] = useState<boolean>(false);
  const [manualClose, setManualClose] = useState<boolean>(false);
  const handleSave = async (editedData: any) => {
    console.log(editedData);
    setLoading(true);
    await dispatch(editRoom(editedData));
    setManualClose(true);

    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
  };

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteRoom());
    setManualClose(true);
    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
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
              secondaryLoading={loading}
              primaryLoading={loading}
              primaryManualClose={manualClose}
              secondaryManualClose={manualClose}
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
                  deleteAction={() => handleDelete()}
                  deletePermission={GeneralPermission.DeleteRoom}
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
              <TaskCreateForm
                setLoading={setLoading}
                setManualClose={setManualClose}
              />
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
