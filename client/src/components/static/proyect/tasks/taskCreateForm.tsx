import { Input, MultiSelect } from "@/components";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { createTask } from "@/redux/slices/client/spaces/tasks";
import { SpaceProps, MembersProps } from "@/utils/types/client";

type TaskCreateFormProps = {
  setManualClose: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};

export default function TaskCreateForm({
  setManualClose,
  setLoading,
}: TaskCreateFormProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<any>();
  const [selected, setSelected] = useState<any>([]);
  const { currentSpace: cSpace, currentSpaceMembers:cSpaceMembers } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

  const currentSpace = SpaceProps.deserialize(cSpace);
  const currentSpaceMembers = MembersProps.deserializeList(cSpaceMembers);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setForm({
      ...form,
      assignedToIds: selected.map((item: any) => item.value),
    });
  }, [selected]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(createTask(form));
    setManualClose(true);
    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
  };

  const multiOptions = currentSpaceMembers.map((memb) => {
    const member = MembersProps.deserialize(memb);
    return {
      value: member.getId(),
      label: member.getFullName(),
    };
  });

  return (
    <div className="max-w[50vw] flex w-[40vw] flex-col gap-4 ">
      <h1 className="titulo-3 font-medium">Crear una tarea</h1>
      <form className="flex w-full flex-col gap-4 " onSubmit={handleSubmit}>
        <Input
          label="Titulo"
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <Input
          label="Descripción"
          type="text"
          name="description"
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <MultiSelect
          options={multiOptions}
          setSelected={setSelected}
          selected={selected}
        />

        <button type="submit" className="primaryButton mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
}
