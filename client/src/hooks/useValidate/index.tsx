import { validationRules } from "./stringValidationRules";
import { validationRules as imageValidationRules } from "./imageValidationRules";

export type ValidationErrors = {
  [key: string]: string;
};

type validResponse = {
  isValid: boolean;
  error: string;
};

type ValidationResult = {
  field: string;
  error: ValidationErrors;
  isValid: boolean;
};

const useValidate = (): ((
  value: string | File,
  type: string,
  fileType: string
) => ValidationResult) => {
  return (
    value: string | object,
    type: string,
    fileType: string
  ): ValidationResult => {
    let error: ValidationErrors = {};
    let isValid = false;

    console.log("value", value, "type", type, "fileType", fileType);
    console.log("received");
    if (!value || !type || !fileType)
      return {
        field: type,
        error: { [type]: "Campo requerido" },
        isValid: false,
      };
    console.log("validating");

    const validateString = (): void => {
      const newErrors: ValidationErrors = {};
      console.log("validationRules[type]", type, value);
      const rules: validResponse = validationRules[type](value as string);

      isValid = rules.isValid;
      newErrors[type] = rules.error;
      error = newErrors;
    };

    const validateImage = (): void => {
      const newErrors: ValidationErrors = {};

      const rules: validResponse = imageValidationRules[type](value as File);

      isValid = rules.isValid;
      newErrors[type] = rules.error;
      error = newErrors;
    };

    if (typeof value === "string") {
      console.log("validateString");
      validateString();
    } else {
      validateImage();
    }

    return { field: type, error, isValid };
  };
};

export default useValidate;
