import { useAppSelector, useAppDispatch } from "@/redux/hooks";

type EditManagerProps = {
  children?: React.ReactNode;
  title: string;
  processedData: any;
  originalData: any;
  deleteAction: any;
  route: string;
  editAction: any;
  nowEditing: boolean;
};

export default function EditManager({
  processedData,
  originalData,
  children,
  title,
  deleteAction,
  editAction,
  route,
  nowEditing,
}: EditManagerProps) {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    let editedData = {};

    for (const key in originalData) {
      if (
        originalData[key] !== processedData[key as keyof typeof processedData]
      ) {
        editedData = { ...editedData, [key]: processedData[key] };
      }
    }
    editAction(editedData);
  };

  const handleDelete = async () => {
    dispatch(deleteAction());
  };

  return (
    <div className=" flex  flex-col gap-4 ">
      <h1 className="titulo-3 font-medium">{title}</h1>
      {children}
      <div className="flex gap-2">
        <button
          className="secondaryButton mt-4 whitespace-nowrap bg-red-200  text-red-800"
          onClick={() => handleDelete()}
        >
          Borrar
        </button>
        <button
          onClick={() => handleSave()}
          className={` mt-4 w-full ${nowEditing ? "disabledPrimaryButton" : "primaryButton"} `}
          disabled={nowEditing}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
