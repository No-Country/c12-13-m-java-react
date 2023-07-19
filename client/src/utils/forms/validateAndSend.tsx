type handleChangeProps = {
  e: React.ChangeEvent<HTMLInputElement>;
  setFormValues: (formValues: any) => void;
  setErrors: (errors: any) => void;
  validate: (value: string | File, type: string, fileType: string) => any;
};

export const changeManager = ({
  e,
  setFormValues,
  setErrors,
  validate,
}: handleChangeProps) => {
  const { name, value, type } = e.target as HTMLInputElement;
  console.log("type", type);
  const file = e.target.files ? e.target.files[0] : "";
  const { field, error, isValid } = validate(
    type === "text" || type === "password" || type === "email" ? value : file,
    name,
    type
  );

  console.log("field", field, "error", error, "isValid", isValid, value, type);

  if (e.target.type === "file") {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: file,
    }));
  } else {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  if (!isValid) {
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: error[name],
    }));
  } else {
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: null,
    }));
  }
};

type handleSubmitProps = {
  e: React.FormEvent<HTMLFormElement>;
  formValues: any;
  setFormValues: (formValues: any) => void;
  errors: any;
  dispatch: any;
  actionToDispatch: any;
};

//async
export const submitManager = async ({
  e,
  formValues,
  errors,
  dispatch,
  actionToDispatch,
  setFormValues,
}: handleSubmitProps) => {
  e.preventDefault();
  console.log("errors", errors, formValues);
  //si errors tiene alguna propiedad diferente de null, no se envia el formulario
  if (
    !Object.values(errors).every((error) => error === null) ||
    Object.keys(formValues).length <= 0
  ) {
    throw new Error("Formulario invalido");
  }
  
  console.log("formValues", formValues);
  await dispatch(actionToDispatch(formValues));

  //reset form
  //e.currentTarget.reset();
  setFormValues({});
};
