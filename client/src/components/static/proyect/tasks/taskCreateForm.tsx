import { Input, MultiSelect } from "@/components";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { createTask } from "@/redux/slices/client/spaces/tasks";
import { SpaceProps, MembersProps } from "@/utils/types/client";
import useValidate from "@/hooks/useValidate";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";


type TaskCreateFormProps = {
  setManualClose: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};

export default function TaskCreateForm({
  setManualClose,
  setLoading,
}: TaskCreateFormProps) {
  const dispatch = useAppDispatch();
  const validate = useValidate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState<any>({});
  const [selected, setSelected] = useState<any>([]);
  const { currentSpace: cSpace, currentSpaceMembers: cSpaceMembers } =
    useAppSelector((state) => state?.client?.spaces?.spaces);

  const currentSpace = SpaceProps.deserialize(cSpace);
  const currentSpaceMembers = MembersProps.deserializeList(cSpaceMembers);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeManager({
      e,
      setFormValues,
      setErrors,
      validate,
    });
  };

  const handleSubmit = async (e: any) => {
    try {
    setLoading(true);
    await submitManager({
      e,
      formValues,
      errors,
      dispatch,
      actionToDispatch: createTask,
      setFormValues,
    });
    setManualClose(true);
    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error("Verifica los campos del formulario", toastError);

  };
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      assignedToIds: selected.map((item: any) => item.value),
    });
  }, [selected]);

  const multiOptions = currentSpaceMembers.map((memb) => {
    const member = MembersProps.deserialize(memb);
    return {
      value: member.getId(),
      label: member.getFullName(),
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
          error={errors.title}
        />
        <Input
          label="Descripción"
          type="text"
          name="description"
          onChange={handleChange}
          placeholder="Description"
          required
          error={errors.description}
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
