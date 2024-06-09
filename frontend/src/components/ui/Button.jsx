import React from "react";

export const Button = ({ children, className, type, variant }) => {
  return (
    <button className={`${className} ${variant}`} type={type}>
      {children}
    </button>
  );
};
