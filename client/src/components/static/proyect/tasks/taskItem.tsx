//Redux
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  editTask,
  deleteTask,
  setCurrentTask,
} from "@/redux/slices/client/spaces/tasks";
import {
  MembersList,
  ModalTrigger,
  EditManager,
  TaskEditForm,
} from "@/components";
import { TasksProps, GeneralPermission, MembersProps } from "@/utils/types/client";
import { useState } from "react";
import Image from "next/image";

type TaskItemProps = {
  item: TasksProps;
};

export default function TaskItem({ item }: TaskItemProps) {
  const dispatch = useAppDispatch();
  const { currentTask: cTask } = useAppSelector(
    (state) => state?.client?.spaces?.tasks
  );

  const currentTask = TasksProps.deserialize(cTask);
  item = TasksProps.deserialize(item);

  const originalData = currentTask instanceof TasksProps ? {
    ...currentTask,
    assignedToIds: !currentTask?.getAssignedTo().map((item) => {
      const member = MembersProps.deserialize(item);
      return {
        value: member?.getId(),
        label: member?.getFullName(),
      };
    }),
    } : new TasksProps("", "", "", "", 0, [], []);
  
  const [processedData, setProcessedData] = useState<any>(currentTask);
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    await dispatch(editTask(editedData));
    setEditing(false);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteTask());
    setEditing(false);
    setLoading(false);
  };

  const handleEditing = () => {
    console.log("item", item);
    dispatch(setCurrentTask(item));
    setEditing(true);
  };

  return (
    <div
      key={item.id}
      className="relative flex h-auto cursor-pointer flex-col gap-2 rounded-3xl bg-white p-5 shadow-sm"
    >
      <div className="relative flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className={statusClass + defaultClass}>
            {item?.getFormattedStatus()}
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
          <p className="subitulo font-medium">{item?.getTitle()}</p>
          <p className="smalltext font-light">{item?.getDescription()}</p>
        </div>
      </div>
      <MembersList
        members={item?.getAssignedTo()}
        size="small"
        pictureHasMargin={true}
      />
      {editing && (
        <ModalTrigger
          triggerText={""}
          buttonType="primaryButton"
          loading={loading}
          alwaysOpen={editing}
          alwaysOpenCloser={() => setEditing(false)}
        >
          <>
            <EditManager
              processedData={processedData}
              deletePermission={GeneralPermission.DeleteTask}
              originalData={originalData}
              title="Editar tarea"
              nowEditing={nowEditing}
              deleteAction={handleDelete}
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
