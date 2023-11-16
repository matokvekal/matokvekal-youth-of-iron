import * as React from "react";
import { cn } from "utils/cn";

export const IconThumbsUp: React.FC<any> = ({
  primaryColor,
  secondaryColor,
  skin,
  ...props
}) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        className={cn(skin === "filled" && "fill-current")}
        d="M20.27 16.265l.705-4.08a1.666 1.666 0 00-1.64-1.95h-5.182a.833.833 0 01-.821-.969l.663-4.045a4.781 4.781 0 00-.09-1.973 1.635 1.635 0 00-1.093-1.137l-.145-.047a1.346 1.346 0 00-.993.068c-.34.164-.588.463-.68.818l-.476 1.834a7.629 7.629 0 01-.656 1.679c-.416.777-1.058 1.4-1.725 1.975l-1.44 1.24a1.67 1.67 0 00-.572 1.406l.813 9.393A1.666 1.666 0 008.596 22h4.649c3.481 0 6.452-2.426 7.024-5.735z"
      />
      <path
        fillRule="evenodd"
        d="M2.968 9.485a.75.75 0 01.78.685l.97 11.236a1.237 1.237 0 11-2.468.107V10.234a.75.75 0 01.718-.749z"
        clipRule="evenodd"
        className={cn(skin === "filled" && "fill-current opacity-20")}
      />
    </svg>
  );
};
