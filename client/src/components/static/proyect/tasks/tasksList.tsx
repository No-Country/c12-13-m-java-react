import { TaskItem } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { TasksProps } from "@/utils/types/client";
import { useEffect, useState } from "react";
import { RoomsProps } from "@/utils/types/client";

export default function TasksList() {
  const [index, setIndex] = useState(0);
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const { currentRoom: cRoom } = useAppSelector(
    (state) => state?.client?.spaces?.rooms
  );
  const { currentRoomTasks } = useAppSelector(
    (state) => state?.client?.spaces?.tasks
  );
  const indexItems = ["Todas", "To-do", "En progreso", "Completado"];
  const currentRoom = RoomsProps.deserialize(cRoom);

  useEffect(() => {
    console.log("setTasks");

    let updatedTasks = [];

    if (index === 0) {
      updatedTasks = currentRoomTasks;
    } else {
      updatedTasks = currentRoomTasks.filter((task) => task.status == index);
    }

    setTasks(updatedTasks);
  }, [index, currentRoomTasks]);

  return (
    <section className="listContainer  gap-0">
      <Indexer index={index} indexItems={indexItems} setIndex={setIndex} />
      <div className="gridContainer mt-6 rounded-3xl bg-[#F6F8FA] ">
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
    <div className="overflow-x-scroll flex gap-4 max-w-full w-full rounded-2xl px-10 py-5 bg-white">
        {indexItems.map((item, i) => (
          <button
            key={i}
            className={
              index === i
                ? "whitespace-nowrap font-semibold"
                : "whitespace-nowrap"
            }
            onClick={() => setIndex(i)}
          >
            {item}
          </button>
        ))}
 
    </div>
  );
}
