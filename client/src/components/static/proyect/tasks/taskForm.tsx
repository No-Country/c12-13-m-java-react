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
dispatch(createComment({content: e.target.comment.value}))
  };

  return (
    <div className=" flex  min-w-[300px] flex-col gap-4 ">
      <div className="flex ">
        {hasDefaultValues && editing === false && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col ">
              <p className="titulo-3">{currentTask.getTitle()}</p>
              <p className="bodyText">{currentTask.getDescription()}</p>
              <p className="bodyText mt-3 ">
                {currentTask.getLongDescription()}
              </p>
              <MembersList
                members={currentTask.getAssignedTo()}
                size="small"
                pictureHasMargin={true}
              />
            </div>
            <div className="flex flex-col gap ">
              <h2 className="titulo-4 font-medium ">Comentarios</h2>
              <div className="overflow-y-scroll max-h-[150px] flex gap-2 flex-col mt-4">
              {Array.isArray(currentTaskComments) &&
                currentTaskComments.map((message) => (
                  <div key={message.id} className="flex-row flex justify-start items-start gap-2">
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
              <form className="flex gap-2 mt-4 items-end justify-start" onSubmit={handleComment}>
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
            <button
              type="submit"
              className={` primaryButton mt-4 w-full
           `}
           onClick = {() => setEditing(true)}
            >
              Editar
            </button>
          </div>
        )}
        {editing && (
          <div className="flex flex-col gap-4 w-full">
            <h1 className="titulo-3 font-medium">{title}</h1>
            <form
              className="flex w-full flex-col gap-4 w-full "
              onSubmit={handleSubmit}
            >
              <Input
                label="Titulo"
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                required={hasDefaultValues ? false : true}
                error={errors.title}
                defaultValue={hasDefaultValues ? currentTask?.getTitle() : ""}
              />
              <Input
                label="Descripción"
                type="text"
                name="description"
                onChange={handleChange}
                placeholder="Description"
                required={hasDefaultValues ? false : true}
                error={errors.description}
                defaultValue={
                  hasDefaultValues ? currentTask?.getDescription() : ""
                }
              />
              <textarea
                className="rounded-2xl px-4 py-2"
                name="longDescription"
                onChange={handleChange}
                placeholder="Long Description"
                required={hasDefaultValues ? false : true}
                defaultValue={
                  hasDefaultValues ? currentTask?.getLongDescription() : ""
                }
              />
              <p className="text-sm font-medium">{errors.longDescription}</p>
              <label className="text-sm font-medium">
                Estado
                <select
                  className="rounded-2xl px-4 py-2"
                  name="status"
                  onChange={handleSelectChange}
                  defaultValue={1}
                >
                  <option value="1">To-do</option>
                  <option value="2">En progreso</option>
                  <option value="3">Completado</option>
                </select>
              </label>
              <MultiSelect
                options={multiOptions}
                setSelected={setSelected}
                selected={selected}
              />
              <div className="flex gap-2">
                {hasDefaultValues && (
                  // <button
                  //   type="button"
                  //   className="secondaryButton mt-4 whitespace-nowrap bg-red-200  text-red-800"
                  //   onClick={() => handleDelete()}
                  // >
                  //   Borrar
                  // </button>
                  <ConfirmationModal
                    confirmText="¿Estás seguro que quieres borrar esta tarea?"
                    confirmParagraph="Esta acción no se puede deshacer"
                    triggerText="Borrar"
                    triggerClass="secondaryButton mt-4 whitespace-nowrap bg-red-200  text-red-800"
                    triggerColor=""
                    trueAction={handleDelete}
                  />
                )}
                <button
                  type="submit"
                  className={` primaryButton mt-4 w-full
           `}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
