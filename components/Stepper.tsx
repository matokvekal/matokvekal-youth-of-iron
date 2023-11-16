'use client';
import React from 'react';
import { Skeleton } from './Skeleton';
import { cn } from 'utils/cn';

export interface StepItem {
  title: React.ReactNode | string;
  body?: React.ReactNode;
  icon?: React.ReactNode;
}

interface StepperProps {
  items: StepItem[];
}

const Stepper: React.FC<StepperProps> = ({ items }) => {
  return (
    <ol className='relative flex w-full flex-col'>
      {items.map((item, index) => (
        <li key={index} className='flex w-full flex-col gap-3 '>
          <div className='relative flex  h-full items-center gap-3'>
            <span className='relative  flex  aspect-square h-8 w-8 items-center justify-center  rounded-full bg-foreground font-bold text-white rtl:flex-row-reverse'>
              {item.icon}
            </span>
            {item.title && <div className='font-medium leading-tight'>{item.title}</div>}
          </div>
          <div
            className={cn(
              'mt-1.5 flex w-full flex-col gap-2',
              index !== items.length - 1 && 'pb-6',
            )}
          >
            {item.body && <div className='text-sm'>{item.body}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
};

const StepperSkeleton: React.FC = () => {
  return (
    <ol className='relative h-[258px]'>
      {Array.from({ length: 2 }).map((_, index) => (
        <li
          key={index}
          className={`flex flex-col ltr:pl-8 rtl:pr-8 ${
            index !== 1 ? 'border-slate-200 pb-8 ltr:border-l  rtl:border-r' : ''
          }`}
        >
          <span className='absolute flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white text-lg font-bold text-blue-700 ltr:-left-4 rtl:-right-4 rtl:flex-row-reverse'>
            <Skeleton className='h-9 w-9 rounded-full' />
          </span>
          <div className='mt-2 flex flex-col gap-4'>
            <div className='font-medium leading-tight'>
              <Skeleton className='h-4 w-32 rounded-xl' />
            </div>
            <div className='text-sm'>
              <Skeleton className='h-14 w-full rounded-xl' />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export { Stepper, StepperSkeleton };
