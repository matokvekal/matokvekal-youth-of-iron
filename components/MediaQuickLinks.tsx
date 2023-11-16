import { MEDIA_LINKS } from 'constants/index';
import { BaseIconProps, Icon } from './icons';
import { FC } from 'react';
import Link from 'next/link';

export const MediaQuickLinks = () => {
  const logos: Record<keyof typeof MEDIA_LINKS, FC<BaseIconProps>> = {
    facebook: Icon.FacebookLogo,
    x: Icon.XLogo,
    instagram: Icon.InstagramLogo,
    tiktok: Icon.TiktokLogo,
    linkedin: Icon.LinkedInLogo,
  };

  const mediaLinks = Object.entries(MEDIA_LINKS).map(([platform, props]) => ({
    ...props,
    icon: logos[platform as keyof typeof MEDIA_LINKS],
  }));

  return (
    <div className='flex flex-row gap-4'>
      {mediaLinks.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.url}>
            <Link id={`media-quick-link-${item.label}`} href={item.url} target='_blank'>
              <Icon
                className=' cursor-pointer transition-colors duration-100'
                size='lg'
                supportRtl={false}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
