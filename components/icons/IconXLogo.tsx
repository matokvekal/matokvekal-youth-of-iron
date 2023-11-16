import * as React from "react";
import { cn } from "utils/cn";

export const IconXLogo: React.FC<any> = ({
  primaryColor,
  secondaryColor,
  skin,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("fill-current", props.className)}
    >
      <path d="M18.205 2.25h3.308l-7.227 8.26 8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77z" />
    </svg>
  );
};
