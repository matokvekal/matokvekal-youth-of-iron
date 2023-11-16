import React from 'react';
import { cn } from 'utils/cn';

export const IconEdit: React.FC<any> = ({ primaryColor, secondaryColor, skin, ...props }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
      className={cn('fill-current', props.className)}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.9249 6.31759C20.5106 6.90337 20.5106 7.85312 19.9249 8.43891L11.4764 16.8874C11.1915 17.1723 10.8039 17.3306 10.401 17.3267L6.87763 17.292C6.06962 17.284 5.41312 16.6375 5.39286 15.8297L5.30692 12.4025C5.29662 11.9918 5.45526 11.5948 5.74579 11.3043L14.268 2.78205C14.8538 2.19627 15.8035 2.19627 16.3893 2.78205L19.9249 6.31759Z'
        fill='white'
      />
      <rect opacity='0.3' x='5' y='19.9995' width='15' height='2' rx='1' fill='white' />
    </svg>
  );
};
