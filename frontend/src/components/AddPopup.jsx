import React from "react";
import { Form } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const AddPopup = ({ onClose, title, fields }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-lg">
        <h2 className="text-lg font-bold mb-6 font-poppins">{title}</h2>
        <Form
          method="post"
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
                  <input
                    id={field.name}
                    name={field.name}
                    type="file"
                    required={field.required}
                    accept="image/*"
                    className="bg-white border border-gray py-[15px] px-[20px] rounded-[10px] focus:outline-none"
                  />
                </div>
              ) : (
                <Input
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
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
            <Button label="Add" variant="hero" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddPopup;
