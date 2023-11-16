import { setStaticParamsLocale } from 'next-international/server';
import { getI18n, getScopedI18n, getStaticParams } from 'locales/server';
import Link from 'next/link';
import WordsOfIronLogo from 'components/icons/Logo';
import { Intent, Platform } from 'types/internal';
import Image from 'next/image';
import { LanguageSwitcher } from 'components/LanguageSwitcher';
import { IconEdit } from 'components/icons/IconEdit';
import { IconVisible } from 'components/icons/IconVisible';
import { IconShare2 } from 'components/icons/IconShare2';
import NewsLogos from 'components/NewsLogos';

export function generateStaticParams() {
  return getStaticParams();
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  setStaticParamsLocale(locale);
  const t = await getI18n();
  const shareT = await getScopedI18n(Intent.Share);
  const reportT = await getScopedI18n(Intent.Report);
  // 0CFFA8
  const buttons = [
    {
      title: shareT('homepage_card_title'),
      body: shareT('alert_body'),
      url: `/${Intent.Share}/${Platform.Twitter}`,
      id: 'main_reply',
      icon: (
        <div className='flex w-full flex-col  h-full w-32 flex-grow items-center justify-center rounded-xl bg-blue-100 py-6'>
          <Image alt='Thumbs up emoji' src='/iconTumbUp.png' width={42} height={42} />
        </div>
      ),
    },
    {
      title: reportT('homepage_card_title'),
      body: reportT('alert_body'),
      url: `/${Intent.Report}/${Platform.Twitter}`,
      id: 'main_report',
      icon: (
        <div className='flex aspect-square h-full w-32 items-center justify-center rounded-xl bg-red-100 py-6'>
          <Image alt='Thumbs up emoji' src='/thumbs_down_animated.png' width={42} height={42} />
        </div>
      ),
    },
  ];

  const howItWorksSteps = [
    {
      title: t('how_it_works_step_1_title'),
      description: t('how_it_works_step_1_description'),
      icon: <IconVisible />,
    },
    {
      title: t('how_it_works_step_2_title'),
      description: t('how_it_works_step_2_description'),
      icon: <IconEdit />,
    },
    {
      title: t('how_it_works_step_3_title'),
      description: t('how_it_works_step_3_description'),
      icon: <IconShare2 />,
    },
  ];

  return (
    <main className='py-2 md:py-12'>
      <div className=' w-full overflow-y-auto px-8 py-8 md:py-0 '>
        <section className='relative z-20 flex w-full items-center'>
          <div className='z-1 relative flex h-full w-full sm:px-8 xl:px-0'>
            <header className='relative z-20 flex h-full w-full flex-col items-center justify-center text-center'>
              <div className='flex-colmb-2 flex aspect-square h-16 w-16 items-center justify-center   p-1 md:mb-6 md:h-24 md:w-24'>
                <WordsOfIronLogo className='fill-foreground ' />
              </div>

              <h1 className='text-center text-[2.6rem] font-semibold leading-[4.35rem] tracking-tighter md:text-left md:text-7xl md:text-[3rem] md:leading-[5rem] '>
                {t('title')}
              </h1>
              <p className='mx-auto   mb-9 max-w-[500px] px-4  text-lg'>{t('description')}</p>

              <div className='flex w-full flex-grow flex-col gap-4 md:max-w-3xl lg:flex-row lg:justify-center'>

                {buttons.map(({ url, title, body, id, icon }) => (
                  <Link id={id} key={url} className='w-full' href={url}>
                             
                    <div className='flex h-full flex-col  w-full flex-grow gap-4 rounded-2xl bg-white  p-4 shadow-md md:max-w-3xl lg:justify-center'>
                      {icon}
                      <div className='flex w-full flex-col items-center justify-center '>
                        <h3 className='flex items-center gap-2 text-lg font-semibold'>{title}</h3>
                        <p className='text-sm text-muted-foreground'>{body}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </header>
          </div>
        </section>
        <section className='relative z-20 w-full py-16 text-center sm:px-8 xl:px-0'>
          <h2 className='mb-2 text-lg font-bold'>{t('how_it_works')}</h2>
          <div className='relative z-20 flex w-full flex-col items-center justify-center'>
            <div className='flex w-full flex-grow flex-col gap-4 md:max-w-3xl lg:flex-row lg:justify-center'>
              <div className='h-64 w-full overflow-hidden rounded-xl shadow-xl md:h-96'>
                <iframe
                  width='100%'
                  height='100%'
                  src='https://www.youtube.com/embed/Bd3CFhLmpP0?si=USdBmjkwTwZ0b_QM&amp;controls=0'
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                  frameBorder='0'
                ></iframe>
              </div>
            </div>
          </div>
          <div className='mx-auto flex max-w-sm flex-col items-center justify-start gap-4 pt-16 sm:px-7'>
            {howItWorksSteps.map((step) => {
              return (
                <div key={step.title}>
                  <div className='mb-4 inline-flex h-10 w-10 items-start  justify-start rounded-full bg-indigo-950 p-2'>
                    <div className='h-6 w-6'>{step.icon}</div>
                  </div>
                  <div className='mb-1 text-sm font-bold leading-normal tracking-tight text-zinc-700'>
                    {step.title}
                  </div>
                  <div className='text-sm font-light leading-6 tracking-tight text-black'>
                    {step.description}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className='relative z-20 w-full pb-16 text-center sm:px-8 xl:px-0'>
          <h2 className='mb-8 text-lg font-bold'>{t('from_the_news_title')}</h2>
          <NewsLogos />
        </section>
        <section className='relative z-20 mx-auto flex w-full max-w-7xl justify-center lg:px-24'>
          <LanguageSwitcher context='home' />
        </section>
      </div>
    </main>
  );
}
