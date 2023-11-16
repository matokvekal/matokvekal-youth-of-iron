'use client';
import { useI18n } from 'locales/client';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogXClose } from 'components/Dialog';
import { Button } from 'components/Button';
import Image from 'next/image';
import { EMAIL_NOTIFICATION_FORM_LINK, WHATSAPP_GROUP_LINK } from '../constants';
import { useRef } from 'react';
import { trackButtonClick } from 'utils/events';

interface Props {
  isOpen: boolean;
  hideReloadBtn?: boolean;
  onSubmit: () => void;
  onDismiss: () => void;
  onClose: () => void;
}

function GetNotifiedDialog({ isOpen, hideReloadBtn, onDismiss, onSubmit, onClose }: Props) {
  const autoFocusRef = useRef<HTMLButtonElement>(null);
  const t = useI18n();

  const idPrefix = hideReloadBtn ? 'get-notified' : 'success-get-notified';

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) =>
        open
          ? null
          : () => {
              onClose();
              trackButtonClick({ id: `${idPrefix}-close` });
            }
      }
    >
      <DialogContent
        className='max-w-sm'
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          autoFocusRef.current?.focus();
        }}
      >
        <DialogXClose id={`${idPrefix}-close`} ref={autoFocusRef} onClick={onClose} />
        <div className='flex flex-col items-center justify-center text-center'>
          <Image
            className='mb-6 mt-4'
            src='/love_letter.png'
            alt='Stay updated icon'
            width={80}
            height={80}
            unoptimized
          />
          <div>
            <div>
              <DialogTitle className='mb-2'>{t('get_notified_title')}</DialogTitle>
              <p className='mx-auto mb-2 max-w-[500px] px-4 text-slate-500'>
                {t('get_notified_subtitle')}
              </p>
            </div>
          </div>
          <div className='mt-4 flex w-full flex-col items-center gap-2'>
            <DialogClose asChild onClick={onSubmit}>
              <Button className='w-full font-normal' size='md' asChild>
                <a
                  id={`${idPrefix}-by-email`}
                  className='flex items-center gap-1'
                  href={EMAIL_NOTIFICATION_FORM_LINK}
                  target='_blank'
                  type={undefined}
                >
                  <span>{t('get_notified_email')}</span>
                  <img src='/icon_email.svg' aria-hidden='true' alt='email icon' />
                </a>
              </Button>
            </DialogClose>
            <DialogClose asChild onClick={onSubmit}>
              <Button className='w-full font-normal' size='md' asChild>
                <a
                  id={`${idPrefix}-by-whatsapp`}
                  className='flex items-center gap-1'
                  href={WHATSAPP_GROUP_LINK}
                  target='_blank'
                  type={undefined}
                >
                  <span>{t('get_notified_whatsapp')}</span>
                  <img src='/icon_whatsapp.svg' aria-hidden='true' alt='whatsapp icon' />
                </a>
              </Button>
            </DialogClose>
            {hideReloadBtn ? null : (
              <DialogClose asChild onClick={onDismiss}>
                <Button
                  id={`${idPrefix}-dismiss`}
                  className='w-full font-normal'
                  variant='outline'
                  size='md'
                >
                  {t('get_notified_dismiss')}
                </Button>
              </DialogClose>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GetNotifiedDialog;
