import {
  LayoutSpaces,
  TasksList,
  HeroSpaceArea,
  RoomEditForm,
  EditManager,
  TaskCreateForm,
} from "@/components";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Head from "next/head";
import {
  deleteRoom,
  editRoom,
  addTask,
  deleteTask,
  editTask,
} from "@/redux/slices/client/spaces/rooms";
import { useSubscription } from "@apollo/client";
import {
  NOTIFY_TASK_CHANGED,
  NOTIFY_TASK_CREATED,
  NOTIFY_TASK_DELETED,
} from "@/graphql/subscriptions";

export default function CurrentRoom() {
  const dispatch = useAppDispatch();
  const { currentRoom } = useAppSelector((state) => state?.client?.spaces?.rooms);
  const [index, setIndex] = useState(0);
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
      console.log("datachange", datachange);
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
        <section className="flex flex-col gap-5">
          <Indexer index={index} indexItems={indexItems} setIndex={setIndex} />
          <TasksList index={index} />
        </section>
      </LayoutSpaces>
    </>
  );
}

type IndexerProps = {
  index: number;
  indexItems: string[];
  setIndex: (index: number) => void;
};

function Indexer({ index, indexItems, setIndex }: IndexerProps) {
  return (
    <div className=" flex gap-4 rounded-2xl bg-white p-5">
      {indexItems.map((item, i) => (
        <button
          key={i}
          className={index === i ? "font-semibold" : ""}
          onClick={() => setIndex(i)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
