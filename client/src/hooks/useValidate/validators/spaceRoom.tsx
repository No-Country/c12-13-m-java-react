type validResponse = {
  isValid: boolean;
  error: string;
};

export const isDescriptionValid = (value: string): validResponse => {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "Description is required",
    };
  }
  //regex
  const isValid = value.length <= 40;

  if (!isValid) {
    return {
      isValid: false,
      error: "Description must be less than 40 characters",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};

export const isAccessCodeValid = (value: string): validResponse => {
    if (!value || value.trim() === "") {
        return {
        isValid: false,
        error: "Access Code is required",
        };
    }
    //regex
    const isValid = value.length <= 10 && value.length >= 4;
    
    if (!isValid) {
        return {
        isValid: false,
        error: "Access Code must be less than 10 characters",
        };
    } else {
        return {
        isValid: true,
        error: "",
        };
    }
    };
