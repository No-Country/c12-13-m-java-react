import { TasksProps } from "@/utils/types/client/spaces";
import {
  MembersList,
  ModalTrigger,
  EditManager,
  TaskEditForm,
} from "@/components";
type TaskItemProps = {
  item: TasksProps;
};
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  editTask,
  deleteTask,
  setCurrentTask,
} from "@/redux/slices/client/spaces/tasks";

export default function TaskItem({ item }: TaskItemProps) {
  const dispatch = useAppDispatch();
  const { currentTask } = useAppSelector((state) => state.client.spaces.tasks);
  const [processedData, setProcessedData] = useState<any>(currentTask);
  const [editing, setEditing] = useState<boolean>(false);
  const [nowEditing, setNowEditing] = useState<boolean>(false);
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


  const handleSave = async (editedData: any) => {
    await dispatch(editTask(editedData));
  };

const handleEditing = () => {
  dispatch(setCurrentTask(item));
  setEditing(true)
}

  return (
    <div
      key={item.id}
      className="relative flex h-auto cursor-pointer flex-col gap-2 rounded-3xl bg-white p-5"
    >
      <div className="relative flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className={statusClass + defaultClass}>
            {item.status == 1
              ? "To-do"
              : item.status == 2
              ? "En progreso"
              : "Completado"}
          </p>
          <Image
            src="/icon/settings.svg"
            width={20}
            height={20}
            alt="settings"
            className="cursor-pointer "
            onClick={handleEditing}
          />
        </div>
        <div>
          <p className="subitulo font-medium">{item.title}</p>
          <p className="smalltext font-light">{item.description}</p>
        </div>
      </div>
      <MembersList
        members={item.assignedTo}
        size="small"
        pictureHasMargin={true}
      />
      {editing && (
        <ModalTrigger
          triggerText={""}
          buttonType="primaryButton"
          alwaysOpen={editing}
          alwaysOpenCloser={() => setEditing(false)}
        >
          <>
            <EditManager
              processedData={processedData}
              originalData={currentTask}
              title="Editar tarea"
              nowEditing={nowEditing}
              deleteAction={deleteTask}
              route={`/client`}
              editAction={(editedData: any) => handleSave(editedData)}
            >
              <TaskEditForm
                originalData={currentTask}
                processedData={processedData}
                setProcessedData={setProcessedData}
                setNowEditing={(data) => setNowEditing(data)}
              />
            </EditManager>
          </>
        </ModalTrigger>
      )}
    </div>
  );
}
