import { FEEDBACK_URL } from 'constants/index';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MediaQuickLinks } from './MediaQuickLinks';
import { useI18n } from 'locales/client';

type FooterProps = {
  onGetNotifiedOpen: () => void;
};

export const Footer = ({ onGetNotifiedOpen }: FooterProps) => {
  const t = useI18n();

  return (
    <footer className='card flex w-full flex-col items-center gap-6 px-2 py-6 text-sm text-stratos-950 md:text-base lg:p-6'>
      <ul className='flex flex-wrap items-center justify-center gap-3 lg:gap-4'>
        <li className='flex items-center gap-2'>
          <span className='text-haze-400'>•</span>
          <button
            id='footer-stay-updated'
            className='hover:underline'
            onClick={onGetNotifiedOpen}
            tabIndex={0}
          >
            {t('menu_item_stay_updated')}
          </button>
        </li>
        <li className='flex items-center gap-2'>
          <span className='text-haze-400'>•</span>
          <a
            href={FEEDBACK_URL}
            className='hover:underline'
            target='_blank'
            id='share-feedback-footer'
          >
            {t('menu_item_share_feedback')}
          </a>
        </li>
        <LanguageSwitcher context='footer' />
      </ul>
      <div className='text-stratos-950'>
        <MediaQuickLinks />
      </div>
    </footer>
  );
};
