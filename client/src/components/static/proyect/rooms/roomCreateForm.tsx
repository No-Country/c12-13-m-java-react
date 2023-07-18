import { Input } from "@/components";
import { useAppDispatch } from "@/redux/hooks";
import { createRoom } from "@/redux/slices/client/spaces/rooms";

type RoomCreateFormProps = {
  setManualClose: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};

export default function RoomCreateForm({ setManualClose, setLoading }: RoomCreateFormProps) {
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const coverImage = e.target.coverImage.files[0];
    const name = e.target.name.value;
    const description = e.target.description.value;

    const form = {
      coverImage,
      name,
      description,
      filename: coverImage.name,
    };

    await dispatch(createRoom(form));
    setManualClose(true);
    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
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
          type="file"
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
