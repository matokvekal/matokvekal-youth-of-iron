'use client';
import { useCurrentLocale } from 'locales/client';

export default function NewsLogos() {
  const locale = useCurrentLocale();

  const items =
    locale === 'he'
      ? [
          {
            id: 'calcalist',
            logo: '/logo_calcalist.svg',
            link: 'https://www.calcalist.co.il/calcalistech/article/hjypr3swa',
          },
          {
            id: 'themarker',
            logo: '/logo_themarker.svg',
            link: 'https://www.themarker.com/technation/2023-10-09/ty-article/0000018b-141b-df09-a9db-5dbb3dc60000',
          },
          {
            id: 'ynet',
            logo: '/logo_ynet.svg',
            link: 'https://www.ynet.co.il/digital/article/byhpq80bp',
          },
          {
            id: 'walla',
            logo: '/logo_walla.svg',
            link: 'https://marketing.walla.co.il/item/3617956',
          },
        ]
      : [
          {
            id: 'wsj',
            logo: '/logo_wsj.svg',
            link: 'https://www.wsj.com/articles/israeli-cyber-companies-rally-as-digital-physical-assaults-continue-90b457f2',
          },
          {
            id: 'ctech',
            logo: '/logo_ctech.png',
            link: 'https://www.calcalistech.com/ctechnews/article/bj9qt8hzt#:~:text=Words%20of%20Iron%20is%20one,and%20tech%20companies%20called%20%27IsraelTechGuards.',
          },
          {
            id: 'israel21c',
            logo: '/logo_israel21c.svg',
            link: 'https://www.israel21c.org/with-workers-called-to-battle-israeli-firms-rally-support/',
          },
          {
            id: 'ynet_eng',
            logo: '/logo_ynet-eng.png',
            link: 'https://www.ynetnews.com/magazine/article/sy0ojiig6',
          },
        ];

  return (
    <div className='mx-auto flex max-w-md flex-wrap items-center justify-center gap-10'>
      {items.map((item) => (
        <a key={item.id} id={`from-the-news-${item.id}`} href={item.link} target='_blank'>
          <img
            className='h-[40px] w-[90px] sm:h-[50px] sm:w-[140px]'
            src={item.logo}
            alt='testimonial logo'
          />
        </a>
      ))}
    </div>
  );
}
