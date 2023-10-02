import React, { useState } from "react";

export const useForm = <T>(initialValue: T & {}) => {
  const [form, setForm] = useState(initialValue);

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const clearForm = () => {
    setForm(initialValue);
  };

  return {
    form,
    handleOnChange,
    clearForm,
  };
};
