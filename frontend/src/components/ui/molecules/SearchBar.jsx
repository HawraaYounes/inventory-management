import React from "react";
import Input from "../atoms/Input"

const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="mb-4">
    <Input
      type="text"
      name="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="max-w-sm"
    />
  </div>
);

export default SearchBar;
