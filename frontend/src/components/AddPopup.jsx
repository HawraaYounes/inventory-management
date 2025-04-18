// src/components/AddPopup.jsx
import React, { useEffect } from "react";
import { useFetcher, useRevalidator } from "react-router-dom";
import Input from "./ui/atoms/Input";
import Button from "./ui/atoms/Button";
import FileInput from "./ui/atoms/FileInput";

const AddPopup = ({
  onClose,
  title,
  fields,
  initialValues = {},
  actionUrl,
}) => {
  const fetcher = useFetcher();
  const revalidator = useRevalidator();

  // when the mutation finishes, re‑run the parent loader and close the popup
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data !== undefined) {
      revalidator.revalidate();
      onClose();
    }
  }, [fetcher.state, fetcher.data, revalidator, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-lg">
        <h2 className="text-lg font-bold mb-6 font-poppins">{title}</h2>

        <fetcher.Form
          method="post"
          action={actionUrl}
          encType="multipart/form-data"
          className="flex flex-col gap-5"
        >
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === "file" ? (
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor={field.name}
                    className="block mb-[22px] font-medium font-poppins"
                  >
                    {field.label}
                  </label>
                  <FileInput
                    name={field.name}
                    label={field.label}
                    required={field.required}
                    accept="image/*"
                  />
                </div>
              ) : (
                <Input
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  defaultValue={initialValues[field.name] || ""}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-4 mt-6">
            <Button
              label="Cancel"
              variant="outline"
              type="button"
              onClick={onClose}
            />
            <Button label="Submit" variant="hero" type="submit" />
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default AddPopup;
