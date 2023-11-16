import * as React from "react";

export const IconShare: React.FC<any> = ({
  primaryColor,
  secondaryColor,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 4 4"
      {...props}
    >
      <g fillRule="evenodd" clipRule="evenodd" strokeWidth={0.2857142857142857}>
        <path
          className="fill-white opacity-40"
          style={{ fill: primaryColor }}
          d="M2.508 1.175A.214.214 0 102.39.763l-.08.022a6.233 6.233 0 00-.574.178 4.66 4.66 0 00-.591.3.214.214 0 10.21.373c.266-.15.398-.219.537-.273.132-.052.273-.092.543-.168l.072-.02zm0 1.65a.214.214 0 01-.117.412l-.08-.022a6.145 6.145 0 01-.574-.178 4.67 4.67 0 01-.59-.3.214.214 0 11.21-.373c.265.15.397.219.537.273.131.052.272.092.542.168l.072.02z"
        />
        <path
          className="fill-white opacity-100"
          style={{ fill: secondaryColor }}
          d="M3.06.071c-.221 0-.415.063-.553.201-.138.138-.2.331-.2.553s.062.415.2.553c.138.138.332.2.553.2.222 0 .416-.062.553-.2.138-.138.201-.331.201-.553s-.063-.415-.2-.553c-.138-.138-.332-.2-.554-.2zm-.553 2.55c.138-.137.332-.2.553-.2.222 0 .416.063.553.2.138.139.201.332.201.554s-.063.415-.2.553c-.138.138-.332.2-.554.2s-.415-.062-.553-.2c-.138-.138-.2-.331-.2-.553s.062-.415.2-.553zM.94 1.247c-.222 0-.416.063-.553.2-.138.139-.201.332-.201.554s.063.415.2.553c.138.138.332.2.554.2s.415-.062.553-.2c.138-.138.2-.331.2-.553s-.062-.415-.2-.553c-.138-.138-.332-.2-.553-.2z"
        />
      </g>
    </svg>
  );
};
