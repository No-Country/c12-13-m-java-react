import { Input } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { GeneralPermission } from "@/utils/types/client";
import { SpaceProps, MembersProps } from "@/utils/types/client";

type FormProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: any) => void;
  errors: any;
  hasDefaultValues?: boolean;
  handleDelete: () => void;
  title: string;
};

export default function RoomForm({
  handleChange,
  handleSubmit,
  errors,
  hasDefaultValues,
  handleDelete,
  title,
}: FormProps) {
  const { currentMember: cMember } = useAppSelector(
    (state) => state.client.spaces.spaces
  );

  const { currentRoom: cRoom } = useAppSelector(
    (state) => state.client.spaces.rooms
  );

  const currentRoom = SpaceProps.deserialize(cRoom);
  const currentMember = MembersProps.deserialize(cMember);

  return (
    <div className=" flex  flex-col gap-4 ">
      <h1 className="titulo-3 font-medium">{title}</h1>
      <form className="flex w-full flex-col gap-4 " onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Name"
          required={hasDefaultValues ? false : true}
          error={errors.name}
          defaultValue={hasDefaultValues ? currentRoom?.getName() : ""}
        />
        <Input
          label="Descripción"
          type="text"
          name="description"
          onChange={handleChange}
          placeholder="Description"
          required={hasDefaultValues ? false : true}
          error={errors.description}
          defaultValue={hasDefaultValues ? currentRoom?.getDescription() : ""}
        />
        <Input
          label="Imagen de portada"
          type="file"
          name="coverImage"
          onChange={handleChange}
          placeholder="Cover Image"
          required={hasDefaultValues ? false : true}
          error={errors.coverImage}
        />
        <div className="flex gap-2">
          {currentMember.hasPermission(GeneralPermission.DeleteRoom) &&
            hasDefaultValues && (
              <button
                type="button"
                className="secondaryButton mt-4 whitespace-nowrap bg-red-200  text-red-800"
                onClick={() => handleDelete()}
              >
                Borrar
              </button>
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
