import { Drawer } from 'vaul';
import { Icon } from './icons';
import { useCurrentLocale, useI18n, useScopedI18n } from 'locales/client';
import { FEEDBACK_URL } from 'constants/index';
import { Intent } from 'types/internal';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from 'utils/cn';
import useIsMobile from 'hooks/useIsMobile';
import * as Sheet from 'components/Sheet';
import { MediaQuickLinks } from './MediaQuickLinks';
import { LanguageSwitcher } from './LanguageSwitcher';
import { IntentContext, PlatformContext } from 'providers';

type MenuProps = {
  onGetNotifiedOpen: () => void;
};

export const Menu = ({ onGetNotifiedOpen }: MenuProps) => {
  const t = useI18n();
  const shareT = useScopedI18n(Intent.Share);
  const reportT = useScopedI18n(Intent.Report);
  const { platform } = useContext(PlatformContext);
  const { intent } = useContext(IntentContext);
  const [isOpen, setIsOpen] = useState(false);
  const locale = useCurrentLocale();
  const router = useRouter();
  const isRtl = locale === 'he';

  const isMobile = useIsMobile();
  const ActiveComponent = isMobile ? Drawer : Sheet;

  const isActive = (href: string) => `/${intent}/${platform}` === href;

  const menuItems = [
    { label: t('menu_item_home'), href: '/', icon: <Icon.Home />, id: 'home-menu' },
    {
      label: shareT('homepage_card_title'),
      href: `/${Intent.Share}/${platform}`,
      icon: <Icon.ThumbsUp />,
      id: 'share-menu',
    },
    {
      label: reportT('homepage_card_title'),
      href: `/${Intent.Report}/${platform}`,
      icon: <Icon.Deny />,
      id: 'report-menu',
    },
    {
      label: t('menu_item_stay_updated'),
      icon: <Icon.Notification />,
      blank: true,
      id: 'stay-updated-menu',
      href: '',
      onClick: () => {
        setIsOpen(false);
        onGetNotifiedOpen();
      },
    },
    {
      label: t('menu_item_share_feedback'),
      href: FEEDBACK_URL,
      icon: <Icon.Letter />,
      blank: true,
      id: 'share-feedback-menu',
    },
  ];

  return (
    <ActiveComponent.Root open={isOpen} onOpenChange={setIsOpen}>
      <ActiveComponent.Trigger asChild>
        <button id='menu_opener' className='hover:opacity-75'>
          <Icon.Menu size='xl' />
        </button>
      </ActiveComponent.Trigger>
      <ActiveComponent.Portal>
        <ActiveComponent.Overlay className='fixed inset-0 bg-zinc-950/60' />
        <ActiveComponent.Content
          side={isRtl ? 'right' : 'left'}
          className={cn(
            'fixed bottom-0 left-0    right-0 flex flex-col bg-mirage-950',
            isMobile && 'rounded-t-3xl',
          )}
        >
          <div className='flex-1  rounded-t-3xl py-6 text-white'>
            {isMobile && (
              <div className='mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-haze-800' />
            )}
            <div className='mb-4 flex w-full items-center justify-between px-7'>
              <Drawer.Title className='text-2xl font-semibold '>{t('menu_title')}</Drawer.Title>
              <LanguageSwitcher context='menu' />
            </div>
            <ul className='flex list-inside flex-col  px-3'>
              {menuItems.map(({ label, icon, href, blank, id, onClick }) => (
                <li
                  tabIndex={0}
                  role='button'
                  onClick={onClick || (() => (blank ? window.open(href) : router.push(href)))}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-xl p-4 transition-colors ease-out hover:bg-mirage-900/50',
                    isActive(href) && 'bg-mirage-900/50',
                  )}
                  key={href}
                  id={id}
                >
                  {icon}
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className='mt-auto border-t border-haze-900 bg-foreground px-7 py-6'>
            <div className='mx-auto flex max-w-md justify-start gap-6 text-white'>
              <MediaQuickLinks />
            </div>
          </div>
        </ActiveComponent.Content>
      </ActiveComponent.Portal>
    </ActiveComponent.Root>
  );
};
