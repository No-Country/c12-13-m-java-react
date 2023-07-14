import { Input } from "@/components";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { createSpace } from "@/redux/slices/client/spaces/spaces";
import { useRouter } from "next/router";
import axios from "axios";

export default function SpaceCreateForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  //const [form, setForm] = useState<any>();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const coverImage = e.target.image.files[0];
    const name = e.target.name.value;
    const description = e.target.description.value;
    //  const coverImage = e.target.coverImage.value;
    const accessCode = e.target.accessCode.value;
    const form = {
      //  image,
      name,
      description,
      coverImage,
      accessCode,

      filename: coverImage.name,
    };
console.log(form);
    // try {
    // const res = await axios.post("http://localhost:8080/rest/createSpace", form, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // console.log("res", res);
    // } catch (error) {
    //   console.log(error);
    // }

    // console.log(form);

     await dispatch(createSpace(form));
    // router.push(`/client/${spaceId}`);
  };

  return (
    <div className="max-w[50vw] flex w-[40vw] flex-col gap-4 ">
      <h1 className="titulo-3 font-medium">Crear un espacio</h1>
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
        <input
          className="flex-grow rounded-full  py-2 text-sm font-normal text-violet-800 outline-none placeholder:text-violet-800"
          type="file"
          name="image"
        />
        <Input
          label="Código de acceso"
          type="text"
          name="accessCode"
          onChange={handleChange}
          placeholder="Access Code"
          required
        />
        <button type="submit" className="primaryButton mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
}
