import { TextToInput } from "@/components";
import { useState } from "react";

type SpaceEditFormProps = {
  originalData: any;
  setProcessedData: (data: any) => void;
  processedData: any;
  setNowEditing: (data: any) => void;
};

export default function TaskEditForm({
  originalData,
  processedData,
  setProcessedData,
  setNowEditing,
}: SpaceEditFormProps) {
  const [localOriginalData, setLocalOriginalData] = useState<any>(originalData);

  const handleSaveField = (data: any) => {
    setLocalOriginalData({ ...localOriginalData, [data.key]: data.text });
    setProcessedData({ ...processedData, [data.key]: data.text });
  };

  const selectOptions = [
    {
      value: 1,
      label: "To-do",
    },
    {
      value: 2,
      label: "En progreso",
    },
    {
      value: 3,
      label: "Completado",
    },
  ];

  return (
    <div className="flex gap-10 ">
      <div className="flex w-full flex-col gap-4 ">
        <TextToInput
          text={localOriginalData.title}
          setResultText={(data) => handleSaveField(data)}
          title="Nombre"
          name="title"
          inputTag="input"
          setNowEditing={(data) => setNowEditing(data)}
        />
        <TextToInput
          text={localOriginalData.description}
          setResultText={(data) => handleSaveField(data)}
          inputTag="textarea"
          title="Descripcion"
          name="description"
          setNowEditing={(data) => setNowEditing(data)}
        />
        <TextToInput
          text={
            localOriginalData.status == 1
              ? { value: 1, label: "To-do" }
              : localOriginalData.status == 2
              ? { value: 2, label: "En progreso" }
              : { value: 3, label: "Completado" }
          }
          setResultText={(data) => handleSaveField(data)}
          selectOptions={selectOptions}
          inputTag="select"
          title="Estado"
          name="status"
          setNowEditing={(data) => setNowEditing(data)}
        />
      </div>
    </div>
  );
}
