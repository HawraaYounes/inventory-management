import React, { useState } from "react";

const AddPopup = ({ onClose, title, fields, onSubmit }) => {
  // Initialize form state based on provided fields
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = field.type === "file" ? null : "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e, field) => {
    if (field.type === "file") {
      setFormData({ ...formData, [field.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [field.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform validations or API calls here
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="font-medium">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.name]}
                  onChange={(e) => handleChange(e, field)}
                  className="border p-2 rounded-md"
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  value={field.type !== "file" ? formData[field.name] : undefined}
                  onChange={(e) => handleChange(e, field)}
                  className="border p-2 rounded-md"
                  required={field.required}
                  accept={field.type === "file" ? "image/*" : undefined}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
