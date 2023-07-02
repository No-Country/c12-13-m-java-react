import { Main, LayoutSpaces, TasksList } from "@/components";
import { useState } from "react";

export default function CurrentRoom() {
  const [index, setIndex] = useState(0);
  const indexItems = ["Todas", "To-do", "En progreso", "Completado"];

  return (
    <LayoutSpaces>
      <Main>
        <section className="h-screen bg-gray-100 px-[60px] py-[60px] ">
          <h1 className="text-2xl font-medium">Tus tareas</h1>
          <button className="rounded-3xl bg-blue-500 px-4 py-2 text-white">
            Crear tarea
          </button>
          <Indexer index={index} indexItems={indexItems} setIndex={setIndex} />
          <TasksList index={index} />
        </section>
      </Main>
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
    <div className="mt-6 flex gap-5 rounded-2xl bg-white p-5">
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
