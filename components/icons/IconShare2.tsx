import React from 'react';
import { cn } from 'utils/cn';

export const IconShare2: React.FC<any> = ({ primaryColor, secondaryColor, skin, ...props }) => {
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
        d='M15.0775 4.78699L7.75586 9.10029C8.28202 9.60059 8.67213 10.2426 8.865 10.9652L15.9897 6.63362C15.5381 6.11797 15.2169 5.48528 15.0775 4.78699ZM15.1232 19.0107L7.83785 14.8185C8.31992 14.3332 8.67837 13.7249 8.862 13.0449L16.0981 17.2465C15.6353 17.7342 15.2941 18.3384 15.1232 19.0107Z'
        fill='white'
      />
      <circle opacity='0.3' cx='19' cy='3.99951' r='3' fill='white' />
      <circle opacity='0.3' cx='19' cy='19.9995' r='3' fill='white' />
      <circle opacity='0.3' cx='5' cy='11.9995' r='3' fill='white' />
    </svg>
  );
};
