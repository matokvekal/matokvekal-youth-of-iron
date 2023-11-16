import * as React from "react";
import { cn } from "utils/cn";

export const IconDeny: React.FC<any> = ({
  primaryColor,
  secondaryColor,
  skin,
  ...props
}) => {
  return skin === "filled" ? (
    <svg
      width={128}
      height={128}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className={cn(skin === "filled" && "fill-current")}
        fillRule="evenodd"
        d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22zM8.97 8.97a.75.75 0 011.06 0L12 10.94l1.97-1.97a.75.75 0 011.06 1.06L13.06 12l1.97 1.97a.75.75 0 11-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 11-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22z"
        className={cn("fill-current  opacity-20")}
      />
      <path
        className={cn("fill-current")}
        d="M8.97 8.97a.75.75 0 011.06 0L12 10.94l1.97-1.97a.75.75 0 111.06 1.06L13.06 12l1.97 1.97a.75.75 0 11-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 01-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 010-1.06z"
      />
    </svg>
  );
};
