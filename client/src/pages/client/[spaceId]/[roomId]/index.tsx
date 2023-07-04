import {
  Main,
  LayoutSpaces,
  TasksList,
  ModalTrigger,
  Image,
  HeroSpaceArea,
} from "@/components";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
export default function CurrentRoom() {
  const [index, setIndex] = useState(0);
  const indexItems = ["Todas", "To-do", "En progreso", "Completado"];
  const { currentRoom } = useAppSelector((state) => state.client.spaces);

  return (
    <LayoutSpaces>
      <HeroSpaceArea
        current={currentRoom}
        type="room"
        triggerText="Crear una tarea"
      >
        <div>Crear una tarea</div>
      </HeroSpaceArea>
      <section className="flex flex-col gap-5">
        <Indexer index={index} indexItems={indexItems} setIndex={setIndex} />
        <TasksList index={index} />
      </section>
    </LayoutSpaces>
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
