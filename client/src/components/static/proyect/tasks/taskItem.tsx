import { TasksProps } from "@/utils/types/client/spaces";

type TaskItemProps = {
    item: TasksProps;
  };

export default function TaskItem({ item }: TaskItemProps) {

    return (

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
    )
}