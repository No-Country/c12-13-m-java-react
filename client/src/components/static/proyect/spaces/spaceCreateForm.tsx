import { Input } from "@/components";
import { useAppDispatch } from "@/redux/hooks";
import { createSpace } from "@/redux/slices/client/spaces/spaces";

type SpaceCreateFormProps = {
  setManualClose: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};

export default function SpaceCreateForm({
  setManualClose,
  setLoading,
}: SpaceCreateFormProps) {
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const coverImage = e.target.image.files[0];
    const name = e.target.name.value;
    const description = e.target.description.value;
    const accessCode = e.target.accessCode.value;
    const form = {
      name,
      description,
      coverImage,
      accessCode,
      filename: coverImage.name,
    };
    await dispatch(createSpace(form));
    setManualClose(true);
    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
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
          type="file"
          name="image"
          onChange={handleChange}
          placeholder="Cover Image"
          required
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
