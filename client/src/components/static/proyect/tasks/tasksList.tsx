import { TaskItem } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { TasksProps } from "@/utils/types/client/spaces";
import { useEffect, useState } from "react";

export default function TasksList() {
  const [index, setIndex] = useState(0);
  const { currentRoom } = useAppSelector((state) => state.client.spaces.rooms);
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const indexItems = ["Todas", "To-do", "En progreso", "Completado"];
  useEffect(() => {
    setTasks(
      index === 0
        ? currentRoom?.tasks
        : currentRoom?.tasks?.filter((task) => task.status == index)
    );
  }, [index, currentRoom]);

  return (
    <section className="listContainer gap-0">
      <Indexer index={index} indexItems={indexItems} setIndex={setIndex} />
      <div className="gridContainer bg-[#F6F8FA] mt-6 rounded-3xl ">
        {Array.isArray(tasks) &&
          tasks.map((item: TasksProps) => (
            <TaskItem key={item.id} item={item} />
          ))}
      </div>
    </section>
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
