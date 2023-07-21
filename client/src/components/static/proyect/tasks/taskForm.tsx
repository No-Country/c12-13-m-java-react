import { TextToInput, MultiSelect, Input, ConfirmationModal } from "@/components";
import { useState } from "react";
import { TasksProps } from "@/utils/types/client";
import { MembersProps, SpaceProps } from "@/utils/types/client";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

type TaskFormProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  const { currentTask: cTask } = useAppSelector(
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

  return (
    <div className=" flex  flex-col gap-4 ">
      <h1 className="titulo-3 font-medium">{title}</h1>
      <form className="flex w-full flex-col gap-4 " onSubmit={handleSubmit}>
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
          defaultValue={hasDefaultValues ? currentTask?.getDescription() : ""}
        />
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
  );
}
