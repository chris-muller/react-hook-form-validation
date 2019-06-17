import { useState, useEffect } from "react";

const checkIsFilled = value => {
  return value;
};

const checkIsEmail = value => {
  return value.includes("@")
};

export const useInput = options => {
  const {
    initialValue,
    validate,
    isRequired,
    isEmail,
    minChar,
    maxChar,
    label = "This field",
    onChange
  } = options;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isRequired && !checkIsFilled(value)) {
      setError(`${label} is required.`);
      return;
    }

    if (isEmail && !checkIsEmail(value)) {
      setError(`${label} must be a valid email address.`);
      return;
    }

    if (minChar && value.length <= minChar) {
      setError(`${label} must be at least ${minChar} characters long.`);
      return;
    }

    if (maxChar && value.length >= maxChar) {
      setError(`${label} cannot exceed ${maxChar} characters.`);
      return;
    }

    if (validate) {
      setError(validate(value) || "");
      return;
    }

    setError("");
  }, [value, isRequired, isEmail, minChar, maxChar, validate, label]);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    error,
    bind: {
      value,
      onChange: event => {
        onChange && onChange(event);
        setValue(event.target.value);
      }
    }
  };
};
