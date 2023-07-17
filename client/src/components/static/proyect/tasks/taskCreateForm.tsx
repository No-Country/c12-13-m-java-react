import { Input, MultiSelect } from "@/components";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { createTask } from "@/redux/slices/client/spaces/tasks";

export default function TaskCreateForm() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<any>();
  const [selected, setSelected] = useState<any>([]);
  const { currentSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );

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
    dispatch(createTask(form));
  };

  const multiOptions = currentSpace.members.map((member) => {
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
