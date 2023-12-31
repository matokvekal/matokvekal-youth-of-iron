import * as React from "react";
import { cn } from "utils/cn";

export const IconFlagIsrael: React.FC<any> = ({
  primaryColor,
  secondaryColor,
  skin,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("fill-current", props.className)}
    >
      <path
        fill="#f9f9f9"
        d="M52.1 10c-5.4-5-12.5-8-20.4-8s-15 3-20.4 8h40.8M11.3 54c5.4 5 12.5 8 20.4 8s15-3 20.4-8H11.3M1.7 32c0 4.3.9 8.3 2.5 12h55c1.6-3.7 2.5-7.7 2.5-12s-.9-8.3-2.5-12h-55c-1.6 3.7-2.5 7.7-2.5 12"
      />
      <path
        fill="#428bc1"
        d="M11.4 54h40.7c3-2.8 5.5-6.2 7.1-10h-55c1.7 3.8 4.2 7.2 7.2 10m40.7-44H11.4c-3 2.8-5.5 6.2-7.1 10h55c-1.7-3.8-4.2-7.2-7.2-10M40.7 27h-6l-3-5-3 5h-6l3 5-3 5h6l3 5 3-5h6l-3-5 3-5m-9-2.1L33 27h-2.5l1.2-2.1m-6.3 3.6h2.5l-1.2 2.1-1.3-2.1m0 7l1.2-2.1 1.2 2.1h-2.4m6.3 3.6L30.5 37H33l-1.3 2.1m2.2-3.6h-4.2L27.5 32l2.1-3.5h4.2L36 32l-2.1 3.5m4.2 0h-2.5l1.2-2.1 1.3 2.1m-1.2-5l-1.2-2.1h2.5l-1.3 2.1"
      />
    </svg>
  );
};
