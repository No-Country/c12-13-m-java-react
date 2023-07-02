import { useRouter } from "next/router";
import { Main, Image, LayoutSpaces } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  SpaceProps,
  RoomsProps,
  MembersProps,
  TasksProps,
} from "@/utils/types/client/spaces";
import { getCurrentRoom } from "@/redux/slices/client/spaces";
import { useEffect, useState } from "react";

export default function CurrentRoom() {
  const router = useRouter();
  const { roomId } = router.query;
  const { currentRoom } = useAppSelector((state) => state.client.spaces);

  const [index, setIndex] = useState(0);
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  useEffect(() => {
    setTasks(
      index === 0
        ? currentRoom?.tasks
        : currentRoom?.tasks.filter((task) => task.status == index)
    );
    console.log("index", index, tasks);
  }, [index, currentRoom]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentRoom(roomId as string));
    console.log("roomId", roomId);
  }, [roomId]);

  return (
    <LayoutSpaces>
      <Main>
        <section className="h-screen bg-gray-100 px-[60px] py-[60px] ">
          <h1 className="text-2xl font-medium">Tus tareas</h1>
          <button className="rounded-3xl bg-blue-500 px-4 py-2 text-white">
            Crear tarea
          </button>
          <div className="mt-6 flex gap-5 rounded-2xl bg-white p-5">
            <button
              className={index === 0 ? "font-semibold" : ""}
              onClick={() => setIndex(0)}
            >
              Todas
            </button>
            <button
              className={index === 1 ? "font-semibold" : ""}
              onClick={() => setIndex(1)}
            >
              To-do
            </button>
            <button
              className={index === 2 ? "font-semibold" : ""}
              onClick={() => setIndex(2)}
            >
              En progreso
            </button>
            <button
              className={index === 3 ? "font-semibold" : ""}
              onClick={() => setIndex(3)}
            >
              Completado
            </button>
          </div>
          <div className="mt-7 grid grid-cols-3 gap-4">
            {Array.isArray(tasks) &&
              tasks.map((item: TasksProps) => (
                <div
                  key={item.id}
                  className="flex h-auto cursor-pointer flex-col gap-2 rounded-3xl bg-white p-4"
                >
                  <div>
                    <p className="font-semibold">
                      {item.status == 1
                        ? "To-do"
                        : item.status == 2
                        ? "En progreso"
                        : "Completado"}
                    </p>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </Main>
    </LayoutSpaces>
  );
}
