import * as React from "react";
import { cn } from "utils/cn";

export const IconUsers: React.FC<any> = ({
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
      <circle cx={15} cy={6} r={3} opacity={0.4} />
      <ellipse cx={16} cy={17} opacity={0.4} rx={5} ry={3} />
      <circle cx={9.001} cy={6} r={4} />
      <ellipse cx={9.001} cy={17.001} rx={7} ry={4} />
    </svg>
  );
};
