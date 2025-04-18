import React from "react";

/**
 * A reusable file‐upload input with label and styling.
 */
const FileInput = ({
  name,
  label,
  required = false,
  accept = "image/*",
  className = "",
  onChange,
}) => (
  <div className="flex flex-col items-start w-full">
    {/* Accessible label */}
    {label && (
      <label
        htmlFor={name}
        className="block mb-[22px] font-medium font-poppins"
      >
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      type="file"
      required={required}
      accept={accept}
      onChange={onChange}
      className={
        "bg-white border border-gray py-[15px] px-[20px] rounded-[10px] focus:outline-none " +
        className
      }
    />
  </div>
);


export default FileInput;
