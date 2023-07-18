import { TextToInput, MultiSelect } from "@/components";
import { useState } from "react";
import { TasksProps } from "@/utils/types/client";
import { MembersProps, SpaceProps } from "@/utils/types/client";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

type SpaceEditFormProps = {
  originalData: TasksProps;
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
  const [selected, setSelected] = useState<any>(originalData.assignedTo.map((item) => {
    const member = MembersProps.deserialize(item);
    return {
      value: member.getId(),
      label: member.getFullName(),
    };
  }));
const { currentSpace:cSpace, currentSpaceMembers:cSpaceMembers } = useAppSelector( (state) => state?.client?.spaces?.spaces );
const currentSpace = SpaceProps.deserialize(cSpace);
const currentSpaceMembers = MembersProps.deserializeList(cSpaceMembers);

  const multiOptions = currentSpaceMembers.map((memb) => {
    const member = MembersProps.deserialize(memb);
    return {
      value: member.getId(),
      label: member.getFullName(),
    };
  });

  const handleSaveField = (data: any) => {
    setLocalOriginalData({ ...localOriginalData, [data.key]: data.text });
    setProcessedData({ ...processedData, [data.key]: data.text });
    console.log("processedData", processedData);
  };

  useEffect(() => {
    setProcessedData({
      ...processedData,
      assignedToIds: selected.map((item: any) => item.value),
    });
    console.log("processedData", processedData);
  }, [selected]);

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
        <p className="text-sm font-medium">Asignado a:</p>
                <MultiSelect
          options={multiOptions}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
    </div>
  );
}
