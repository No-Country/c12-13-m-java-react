import { TextToInput } from "@/components";
import { useState } from "react";

type SpaceEditFormProps = {
  originalData: any;
  setProcessedData: (data: any) => void;
  processedData: any;
  setNowEditing: (data: any) => void;
};

export default function SpaceEditForm({
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

  return (
    <div className="flex gap-10 ">
      <div className="flex w-full flex-col gap-4 ">
        <TextToInput
          text={localOriginalData.name}
          setResultText={(data) => handleSaveField(data)}
          title="Nombre"
          name="name"
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
          text={localOriginalData.accessCode}
          setResultText={(data) => handleSaveField(data)}
          inputTag="input"
          title="Codigo de acceso"
          name="accessCode"
          setNowEditing={(data) => setNowEditing(data)}
        />
        <div>
          <p className="bodyText text-blue-700">Rooms</p>
          <p className="bodyText ">Puedes editar cada room individualmente</p>
        </div>
      </div>
      <div className="flex  flex-col gap-4">
        <TextToInput
          text={localOriginalData.coverImage}
          setResultText={(data) => handleSaveField(data)}
          inputTag="image"
          title="Portada"
          name="coverImage"
          setNowEditing={(data) => setNowEditing(data)}
        />
      </div>
    </div>
  );
}
