import {
  Main,
  LayoutSpaces,
  TasksList,
  ModalTrigger,
  Image,
  HeroSpaceArea,
  RoomEditForm,
  EditManager,
  TaskCreateForm,
} from "@/components";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Head from "next/head";
import { deleteRoom, editRoom } from "@/redux/slices/client/spaces";

export default function CurrentRoom() {
  const [index, setIndex] = useState(0);
  const [nowEditing, setNowEditing] = useState<boolean>(false);
  const indexItems = ["Todas", "To-do", "En progreso", "Completado"];

  const dispatch = useAppDispatch();
  const { currentRoom } = useAppSelector((state) => state.client.spaces);
  const [processedData, setProcessedData] = useState<any>(currentRoom);

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
