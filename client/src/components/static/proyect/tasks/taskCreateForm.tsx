import { Input, MultiSelect } from "@/components";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { createRoom,createTask } from "@/redux/slices/client/spaces";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function TaskCreateForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<any>();
  const [selected, setSelected] = useState<any>([]);
  const { id } = useAppSelector((state) => state.authSession.session.current);
  const { currentSpace } = useAppSelector((state) => state.client.spaces);
  

  console.log("id", id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    //actulizamos el form con el id del usuario
    setForm({ ...form, assignedToIds: selected.map((item: any) => item.value) });
  }, [selected]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(form);
    dispatch(createTask(form));

    //await dispatch(createRoom(form));
    // router.push(`/client/${spaceId}`);
  };

  //eliminamos "role" y traemos user al frente

  const multiOptions = currentSpace.members.map((member) => {
    return {
      value: member.user.id,
      label: `${member.user.firstName} ${member.user.lastName}`,
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
