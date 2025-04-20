const Input = ({
  label,
  name,
  placeholder,
  type = "text",
  width = "w-full",
  defaultValue = "",
  onChange,
}) => {
  return (
    <div className={`flex flex-col items-start ${width}`}>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="bg-white border border-gray mb-3 py-[25px] px-[30px] rounded-[10px] focus:outline-none min-w-[400px] max-w-[500px]"
        required
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
