const Button = ({ label, variant = 'hero', ...props }) => {
  const baseStyles = "font-poppins rounded-md min-w-[150px] text-nowrap";

  const buttonStyle =
    variant === 'hero'
      ? `${baseStyles} bg-[#B88E2F] text-white py-4 px-11 md:py-[15px] md:px-[50px] font-semibold`
      : variant === 'outline'
      ? `${baseStyles} bg-white text-black border border-black py-4 px-11 md:py-[15px] md:px-[50px] font-normal`
      : `${baseStyles} bg-white text-[#B88E2F] border-2 border-[#B88E2F] py-4 px-11 md:py-[15px] md:px-[50px] font-semibold`;

  return (
    <button className={buttonStyle} {...props}>
      {label}
    </button>
  );
};

export default Button;
