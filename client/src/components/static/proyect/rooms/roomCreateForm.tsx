import { Input } from "@/components";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { createRoom } from "@/redux/slices/client/spaces/rooms";
import { useRouter } from "next/router";

export default function RoomCreateForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<any>();
  const { id } = useAppSelector((state) => state.authSession.session.current);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setForm({ ...form, userOwner: id });


    await dispatch(createRoom(form));
    // router.push(`/client/${spaceId}`);
  };

  return (
    <div className="max-w[50vw] flex w-[40vw] flex-col gap-4 ">
      <h1 className="titulo-3 font-medium">Crear un room</h1>
      <form className="flex w-full flex-col gap-4 " onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          type="text"
          name="name"
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
        <Input
          label="Imagen de portada"
          type="text"
          name="coverImage"
          onChange={handleChange}
          placeholder="Cover Image"
          required
        />
        <button type="submit" className="primaryButton mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
}
