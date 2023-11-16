import React from 'react';
import { cn } from 'utils/cn';

export const IconVisible: React.FC<any> = ({ primaryColor, secondaryColor, skin, ...props }) => {
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
        opacity='0.3'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 11.9995C3 11.9995 5.45455 5.99951 12 5.99951C16.9091 5.99951 21 11.9995 21 11.9995C21 11.9995 16.9091 17.9995 12 17.9995C5.45455 17.9995 3 11.9995 3 11.9995Z'
        fill='white'
      />
      <path
        opacity='0.3'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 14.9995C10.3431 14.9995 9 13.6564 9 11.9995C9 10.3427 10.3431 8.99951 12 8.99951C13.6569 8.99951 15 10.3427 15 11.9995C15 13.6564 13.6569 14.9995 12 14.9995Z'
        fill='white'
      />
    </svg>
  );
};
