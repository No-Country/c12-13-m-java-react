import { useRouter } from "next/router";
import { TaskItem } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { TasksProps } from "@/utils/types/client/spaces";
import { useEffect, useState } from "react";

type TasksListProps = {
  index: number;
};

export default function TasksList({ index }: TasksListProps) {
  const router = useRouter();

  const { currentRoom } = useAppSelector((state) => state.client.spaces);
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  useEffect(() => {
    setTasks(
      index === 0
        ? currentRoom?.tasks
        : currentRoom?.tasks?.filter((task) => task.status == index)
    );
    console.log("index", index, tasks);
  }, [index, currentRoom]);

  return (
    <div className=" grid grid-cols-3 gap-4">
      {Array.isArray(tasks) &&
        tasks.map((item: TasksProps) => <TaskItem key={item.id} item={item} />)}
    </div>
  );
}
