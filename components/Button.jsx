const Button = ({ variant = "main", children, onClick, className, href }) => {
    // กำหนดสไตล์ของแต่ละ variant
    const baseStyle =
      "py-2 px-12 md:py-2.5 md:px-10 rounded-full text-2xl font-semibold transition text-center drop-shadow-lg";
  
    const variants = {
      main: "bg-buttoncolormain text-terticolor hover:bg-opacity-90",
      sub: "bg-buttoncolorsub text-white hover:bg-opacity-90",
      sub2: "bg-buttoncolorsub2 text-white hover:bg-opacity-90",
      tertiary: "text-white hover:text-opacity-80",
    };
  
    // รวมคลาสพื้นฐานกับคลาสของ variant ที่เลือก
    const buttonClass = `${baseStyle} ${variants[variant]} ${className || ""}`;
  
    return href ? (
      <a href={href} className={buttonClass}>
        {children}
      </a>
    ) : (
      <button onClick={onClick} className={buttonClass}>
        {children}
      </button>
    );
  };
  
  export default Button;
  