type validResponse = {
  isValid: boolean;
  error: string;
};

export const isValidProfileImage = (value: File): validResponse => {
  //un archivo de imagen maximo 5 mb
  console.log("isValidProfileImage", value.size);
  const isValid = value.size < 5242880;

  if (!isValid) {
    return {
      isValid: false,
      error: "El archivo no puede superar los 5 mb",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};

export const isValidCoverImage = (value: File): validResponse => {
  //un archivo de imagen maximo 5 mb
  console.log("isValidCoverImage", value.size);
  const isValid = value.size < 5242880;

  if (!isValid) {
    return {
      isValid: false,
      error: "El archivo no puede superar los 5 mb",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};
