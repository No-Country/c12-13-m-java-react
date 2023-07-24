import {
  TextToInput,
  MultiSelect,
  Input,
  ConfirmationModal,
  MembersList,
} from "@/components";
import { useState } from "react";
import { TasksProps } from "@/utils/types/client";
import { MembersProps, SpaceProps } from "@/utils/types/client";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { createComment } from "@/redux/slices/client/spaces/tasks";

type TaskFormProps = {
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: any) => void;
  errors: any;
  hasDefaultValues?: boolean;
  handleDelete: () => void;
  handleSelectChange: (e: any) => void;
  title: string;
  selected: any;
  setSelected: any;
};

export default function TaskForm({
  handleChange,
  handleSubmit,
  handleDelete,
  errors,
  hasDefaultValues,
  title,
  selected,
  setSelected,
  handleSelectChange,
}: TaskFormProps) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(hasDefaultValues ? false : true);
  const { currentTask: cTask, currentTaskComments } = useAppSelector(
    (state) => state.client.spaces.tasks
  );
  const { currentSpaceMembers: cSpaceMembers } = useAppSelector(
    (state) => state.client.spaces.spaces
  );
  const currentTask = TasksProps.deserialize(cTask);
  const currentSpaceMembers = MembersProps.deserializeList(cSpaceMembers);

  const multiOptions = currentSpaceMembers.map((memb) => {
    const member = MembersProps.deserialize(memb);
    return {
      value: member.getId(),
      label: member.getFullName(),
    };
  });

  const handleComment = (e: any) => {
    e.preventDefault();
    dispatch(createComment({ content: e.target.comment.value }));
  };

  const selectOptions = [
    { value: "1", label: "To-do" },
    { value: "2", label: "En progreso" },
    { value: "3", label: "Completado" },
  ];

  return (
    <div className=" flex  h-full overflow-auto   gap-4  ">
      {hasDefaultValues && editing === false && (
        <div className="grid grid-cols-2 gap-8  w-full min-h-[45vh] ">
          <div className="flex flex-col ">
            <p className="titulo-3">{currentTask.getTitle()}</p>
            <p className="bodyText">{currentTask.getDescription()}</p>
            <p className="bodyText mb-3 mt-3 ">
              {currentTask.getLongDescription()}
            </p>
            <MembersList
              members={currentTask.getAssignedTo()}
              size="medium"
              pictureHasMargin={true}
            />
            <button
              type="submit"
              className={` primaryButton mt-4 w-max
           `}
              onClick={() => setEditing(true)}
            >
              Editar tarea
            </button>
          </div>
          <div className="gap flex flex-col overflow-scroll min-h-0 flex-grow  ">
            <h2 className="titulo-4 font-medium ">Comentarios</h2>
            <div className="mt-4 flex min-h-0 flex-grow  flex-col gap-3 overflow-y-scroll">
              {Array.isArray(currentTaskComments) &&
                currentTaskComments.map((message) => (
                  <div
                    key={message.id}
                    className="flex flex-row items-start justify-start gap-2"
                  >
                    <Image
                      src={message.fromUser.profileImage}
                      width={35}
                      height={35}
                      alt="profileImage"
                      className="aspect-square rounded-full object-cover"
                    />
                    <div className="flex max-w-full flex-col items-start gap-[2px] ">
                      <p className=" max-w-full  rounded-2xl bg-blue-100 px-4 py-1  text-sm text-blue-700">
                        {message.content}
                      </p>
                      <p className={`w-full  text-xs text-black`}>
                        {message.fromUser.firstName +
                          " " +
                          message.fromUser.lastName}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <form
              className="mt-4 flex flex-grow items-end justify-start gap-2"
              onSubmit={handleComment}
            >
              <Input
                type="text"
                placeholder="Escribe un comentario"
                name="comment"
                label=""
              />
              <button
                type="submit"
                className="primaryButton smalltext px-4 py-3"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
      {editing && (
        <div className="flex flex-grow flex-col gap-4 ">
          <h1 className="titulo-3 font-medium">{title}</h1>
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8 ">
              <div className="flex flex-col gap-3">
                <Input
                  label="Titulo"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="Titulo"
                  required={hasDefaultValues ? false : true}
                  error={errors.title}
                  defaultValue={hasDefaultValues ? currentTask?.getTitle() : ""}
                />
                <Input
                  label="Descripción corta"
                  type="text"
                  name="description"
                  onChange={handleChange}
                  placeholder="Descripción"
                  required={hasDefaultValues ? false : true}
                  error={errors.description}
                  defaultValue={
                    hasDefaultValues ? currentTask?.getDescription() : ""
                  }
                />
                <Input
                  label="Estado"
                  type="select"
                  name="status"
                  handleSelectChange={(e)=>  handleSelectChange(e)}
                  placeholder="Estado"
                  required={hasDefaultValues ? false : true}
                  error={errors.status}
                  //defaultValue={hasDefaultValues ? currentTask?.getStatus() : ""}
                  selectOptions={selectOptions}
                />
                <MultiSelect
                  label="Asignar a"
                  options={multiOptions}
                  setSelected={setSelected}
                  selected={selected}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Input
                  label="Descripción larga"
                  type="textarea"
                  name="longDescription"
                  onChange={handleChange}
                  placeholder="Descripción larga"
                  required={hasDefaultValues ? false : true}
                  error={errors.longDescription}
                  defaultValue={
                    hasDefaultValues ? currentTask?.getLongDescription() : ""
                  }
                  rows={8}
                />
              </div>
            </div>

            <div className="flex gap-2">
              {hasDefaultValues && (
                <ConfirmationModal
                  confirmText="¿Estás seguro que quieres borrar esta tarea?"
                  confirmParagraph="Esta acción no se puede deshacer"
                  triggerText="Borrar"
                  triggerClass="secondaryButton mt-4 whitespace-nowrap bg-red-200  text-red-800"
                  triggerColor=""
                  trueAction={handleDelete}
                />
              )}
              <button type="submit" className="primaryButton mt-4 w-full">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
