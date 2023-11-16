import * as React from "react";
import { cn } from "utils/cn";

export const IconTiktokLogo: React.FC<any> = ({
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
      <path d="M16 8.245V15.5a6.5 6.5 0 11-5-6.326v3.163a3.5 3.5 0 102 3.163V2h3a5 5 0 005 5v3a7.966 7.966 0 01-5-1.755z" />
    </svg>
  );
};
