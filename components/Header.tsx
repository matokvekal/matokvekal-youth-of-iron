'use client';
import WordsOfIronLogo from 'components/icons/Logo';
import { cn } from 'utils/cn';
import { Popover, PopoverContent } from './Popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useContext } from 'react';
import { useScopedI18n } from 'locales/client';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { Intent } from 'types/internal';
import Image from 'next/image';
import { Menu } from './Menu';
import { IntentContext, PlatformContext } from 'providers';

type HeaderProps = {
  onGetNotifiedOpen: () => void;
};

const Header = ({ onGetNotifiedOpen }: HeaderProps) => {
  const { intent } = useContext(IntentContext);
  const { platform } = useContext(PlatformContext);

  const t2 = useScopedI18n(intent);
  const shareT = useScopedI18n(Intent.Share);
  const reportT = useScopedI18n(Intent.Report);

  return (
    <div
      className={cn(
        ' relative flex h-20 w-full items-center justify-between bg-foreground px-4 text-background ',
      )}
    >
      <div className='flex items-center justify-start '>
        <Link id='main-home' href='/'>
          <WordsOfIronLogo className=' color-white h-8 w-8 fill-white' />
        </Link>
        <span className='text-shite mx-3 opacity-50'>/</span>
        <Popover>
          <PopoverTrigger asChild>
            <button id='header_intent_selector' className='flex items-center gap-1 font-medium'>
              {t2('header_select_label')}
              <ChevronsUpDown className='h-4 w-4' />
            </button>
          </PopoverTrigger>
          <PopoverContent collisionPadding={50} className='w-80'>
            <div className='flex w-full  flex-col'>
              <Link
                id='header_intent_selector_share'
                className='w-full'
                href={`/${Intent.Share}/${platform}`}
              >
                <div className='flex h-full w-full flex-grow  items-center gap-3 rounded-2xl bg-white p-4 hover:bg-slate-100 md:max-w-3xl lg:justify-center'>
                  <div className='flex aspect-square h-10 w-10 items-center justify-center rounded-full  bg-blue-100'>
                    <Image
                      alt='Thumbs up emoji'
                      src='/thumbs_up_animated.png'
                      width={30}
                      height={30}
                    />
                  </div>

                  <div className='flex flex-col items-start text-start'>
                    <h3 className='flex items-center gap-2 text-base font-semibold'>
                      {shareT('homepage_card_title')}
                    </h3>
                    <p className='text-sm text-slate-700'>{shareT('alert_body')}</p>
                  </div>
                </div>
              </Link>

              <Link
                id='header_intent_selector_report'
                className='flex w-full items-start'
                href={`/${Intent.Report}/${platform}`}
              >
                <div className='flex h-full w-full flex-grow  items-center gap-3 rounded-2xl bg-white p-4 hover:bg-slate-100 md:max-w-3xl lg:justify-center'>
                  <div className='flex aspect-square h-10 w-10 items-center justify-center rounded-full  bg-red-100'>
                    <Image
                      alt='Thumbs up emoji'
                      src='/thumbs_down_animated.png'
                      width={30}
                      height={30}
                    />
                  </div>

                  <div className='flex flex-col items-start text-start'>
                    <h3 className='flex items-center gap-2 text-base font-semibold'>
                      {reportT('homepage_card_title')}
                    </h3>
                    <p className='text-sm text-slate-700'>{reportT('alert_body')}</p>
                  </div>
                </div>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Menu onGetNotifiedOpen={onGetNotifiedOpen} />
    </div>
  );
};

export default Header;
