import type { ReactElement } from 'react';

export default async function RootLayout({ children }: { children: ReactElement }) {
  return (
    <div className='flex w-screen flex-col items-center justify-center bg-background lg:w-full lg:py-8'>
      <div className='h-full w-full bg-background lg:max-w-xl lg:overflow-hidden lg:rounded-xl lg:shadow-lg lg:ring-1 lg:ring-slate-300'>
        {children}
      </div>
    </div>
  );
}
