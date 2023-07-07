import { TasksProps } from "@/utils/types/client/spaces";
import {MembersList} from "@/components";
type TaskItemProps = {
  item: TasksProps;
};

export default function TaskItem({ item }: TaskItemProps) {
  const defaultClass =
    "font-medium  smalltext font-medium rounded-full w-max px-2 py-1";
  const completedClass = "text-green-900  bg-green-200  font-medium ";
  const inProgressClass = "text-orange-900 font-medium bg-orange-200  ";
  const toDoClass = "text-sky-900 font-medium bg-sky-200  ";

  const statusClass =
    item.status == 1
      ? toDoClass
      : item.status == 2
      ? inProgressClass
      : completedClass;

  return (
    <div
      key={item.id}
      className="flex h-auto cursor-pointer flex-col gap-2 rounded-3xl bg-white p-5"
    >
      <div className="gap-2 flex flex-col" >
        <p className={statusClass + defaultClass}>
          {item.status == 1
            ? "To-do"
            : item.status == 2
            ? "En progreso"
            : "Completado"}
        </p>
        <div>
        <p className="subitulo font-medium">{item.title}</p>
        <p className="smalltext font-light">{item.description}</p>
        </div>
      </div>
      <MembersList members={item.assignedTo} size="small" pictureHasMargin={true} />
    </div>
  );
}
