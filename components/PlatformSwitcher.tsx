'use client';
import { FC, useContext } from 'react';
import { Platform } from 'types/internal';
import { useRouter } from 'next/navigation';
import { useI18n } from 'locales/client';
import Image from 'next/image';
import { Card } from './Card';
import { cn } from 'utils/cn';
import { IntentContext, PlatformContext } from 'providers';

const PlatformSwitcher = () => {
  const { platform } = useContext(PlatformContext);
  const { intent } = useContext(IntentContext);
  const navigaiton = useRouter();
  const t = useI18n();

  const platforms: Omit<PlatformToggleProps, 'intent' | 'onClick' | 'active'>[] = [
    {
      label: t('twitter'),
      id: Platform.Twitter,
      logo: '/logo_x.svg',
    },
    {
      label: t('instagram'),
      id: Platform.Instagram,
      logo: '/logo_instagram.svg',
    },
    {
      label: t('tiktok'),
      id: Platform.TikTok,
      logo: '/logo_tiktok.svg',
    },
    {
      label: t('facebook'),
      id: Platform.Facebook,
      logo: '/logo_facebook.svg',
    },
  ];

  return (
    <Card.Container>
      <Card.Content className='flex-col items-center px-0 py-0 pt-0 '>
        <div className='relative flex h-full items-center justify-between'>
          {platforms.map((p, i) => (
            <div
              key={p.id}
              className={cn(
                "itemx-center before:contents-[''] relative flex flex-grow items-center justify-center before:absolute before:h-8 before:w-[1px] before:bg-transparent ltr:before:right-0 rtl:before:left-0",

                i !== platforms.length - 1 && 'before:bg-zinc-200',
              )}
            >
              <PlatformToggle
                active={p.id === platform}
                {...p}
                onClick={(id) => navigaiton.replace(`/${intent}/${id}`)}
              />
            </div>
          ))}
        </div>
      </Card.Content>
    </Card.Container>
  );
};

type PlatformToggleProps = {
  logo: string;
  id: Platform;
  label: string;
  active: boolean;
  onClick: (href: Platform) => void;
};

const PlatformToggle: FC<PlatformToggleProps> = ({ logo, id, label, active, onClick }) => {
  return (
    <div className={cn('relative flex items-center last:after:mx-0 last:after:w-0')}>
      <div
        className={cn(
          "before:contents-[''] relative flex h-full w-full py-4 before:absolute before:bottom-0 before:h-[4px] before:w-full before:bg-cyan-400 before:opacity-0",
          active && 'before:opacity-100',
        )}
      >
        <button
          id={`platform-tab-${id}`}
          className={cn(
            'flex aspect-square h-16 w-16 items-center  justify-center overflow-hidden rounded-2xl transition-colors ease-out',
            active && 'bg-selago-200',
          )}
          onClick={() => onClick(id)}
        >
          <Image width={54} height={54} alt={`${label} logo`} src={logo} />
        </button>
      </div>
    </div>
  );
};

export { PlatformSwitcher };
