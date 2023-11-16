import * as React from "react";
import { cn } from "utils/cn";

export const IconNotification: React.FC<any> = ({
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
      <path d="M22 5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        fillRule="evenodd"
        d="M6.25 14a.75.75 0 01.75-.75h9a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M3.464 20.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12c0-1.399 0-2.59-.038-3.612a4.5 4.5 0 01-6.35-6.35C14.59 2 13.399 2 12 2 7.286 2 4.929 2 3.464 3.464 2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535zM6.25 17.5a.75.75 0 01.75-.75h6a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
};
