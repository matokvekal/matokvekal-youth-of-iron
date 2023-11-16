'use client';

import { useChangeLocale, useCurrentLocale } from 'locales/client';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { ChevronsUpDown } from 'lucide-react';
import { BaseIconProps, Icon } from './icons';
import { FC } from 'react';

type LanguageSwitcherProps = {
  context: 'home' | 'menu' | 'footer';
};
export function LanguageSwitcher({ context }: LanguageSwitcherProps) {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const languages: Record<typeof locale, { label: string; icon: FC<BaseIconProps> }> = {
    en: { label: 'English', icon: Icon.FlagUS },
    he: { label: 'עברית', icon: Icon.FlagIsrael },
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='flex items-center gap-1' id={`language-switcher-${context}`}>
          {languages[locale].icon({
            className: 'rounded-full aspect-square overflow-hidden',
          })}
          {languages[locale].label}
          <ChevronsUpDown className='h-4 w-4' />
        </button>
      </PopoverTrigger>
      <PopoverContent collisionPadding={50} className='w-6'>
        <div className='flex w-full flex-col'>
          {Object.entries(languages).map(([key, { label, icon }]) => (
            <button
              key={key}
              className='flex items-center gap-3 rounded-2xl  bg-white p-4 hover:bg-slate-100 lg:justify-center  '
              onClick={() => changeLocale(key as typeof locale)}
              id={`language-switcher-${key}`}
            >
              <div className='flex aspect-square h-10 w-10 items-center justify-center rounded-full '>
                {icon({
                  className: 'fill-foreground w-full h-full',
                })}
              </div>
              <div className='flex flex-col items-start text-start'>
                <p className='flex items-center gap-2 text-base'>{label}</p>
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
