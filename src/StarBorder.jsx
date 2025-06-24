const StarBorder = ({
  as: Component = "button",
  className = "",
  starColor = "#FFD100",
  backgroundColor = "#FFEE32",
  textColor = "#202020",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}) => {
  return (
    <Component 
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`} 
      style={{
        padding: `${thickness}px`,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${starColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${starColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div 
        className="relative z-1 text-center text-[16px] py-[16px] px-[26px] rounded-[20px] font-bold"
        style={{
          backgroundColor: backgroundColor,
          color: textColor
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder; 