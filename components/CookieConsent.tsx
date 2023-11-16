'use client';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { getI18n } from 'locales/server';
import { COOKIE_CONSENT_KEY } from '../constants';

type CookieConsentProps = {
  descriptionText: string;
  acceptText: string;
  rejectText: string;
};

const CookieConsent = ({ descriptionText, acceptText, rejectText }: CookieConsentProps) => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(COOKIE_CONSENT_KEY) !== 'true') {
      setShowConsent(true);
    }
  }, []);

  const handleAction = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 bg-slate-700 bg-opacity-70'>
      <div className='fixed bottom-0 left-0 right-0 flex flex-col items-center justify-between gap-5 bg-gray-100 px-3 py-4 text-center md:flex-row md:gap-10 md:px-8 md:py-6 md:text-start'>
        <span className='text-dark whitespace-normal text-base'>{descriptionText}</span>
        <div className='flex flex-1 flex-wrap gap-5 lg:flex-nowrap'>
          <Button
            id='cookies-accept'
            className='w-full whitespace-pre'
            size='md'
            onClick={handleAction}
          >
            {acceptText}
          </Button>
          <Button
            id='cookies-reject'
            className='w-full whitespace-pre'
            size='md'
            variant='outline'
            onClick={handleAction}
          >
            {rejectText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
