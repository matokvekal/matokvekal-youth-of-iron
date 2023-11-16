import * as React from 'react';
import { IconMessage } from './IconMessage';
import { IconShare } from './IconShare';
import { cn } from 'utils/cn';
import { IconRefresh } from './IconRefresh';
import { VariantProps, tv } from 'tailwind-variants';
import { IconCopy } from './IconCopy';
import { IconMenu } from './IconMenu';
import { IconHome } from './IconHome';
import { IconThumbsUp } from './IconThumbsUp';
import { IconDeny } from './IconDeny';
import { IconDoc } from './IconDoc';
import { IconUsers } from './IconUsers';
import { IconLetter } from './IconLetter';
import { IconNotification } from './IconNotification';
import { IconFacebookLogo } from './IconFacebookLogo';
import { IconInstagramLogo } from './IconInstagramLogo';
import { IconTiktokLogo } from './IconTiktokLogo';
import { IconXLogo } from './IconXLogo';
import { IconLinkedinLogo } from './IconLinkedinLogo';
import { IconFlagIsrael } from './IconFlagIsrael';
import { IconFlagUS } from './IconFlagUS';
import { IconEdit } from './IconEdit';
import { IconVisible } from './IconVisible';
import { IconShare2 } from './IconShare2';

const iconStyle = tv({
  base: '',
  variants: {
    supportRtl: {
      true: 'rtl:scale-x-[-1] rtl:transform',
      false: 'rtl:scale-x-[1]',
    },
    size: {
      sm: 'w-[16px] h-[16px]',
      md: 'w-[24px] h-[24px]',
      lg: 'w-[32px] h-[32px]',
      xl: 'w-11 h-11',
    },
  },
  defaultVariants: {
    size: 'md',
    supportRtl: true,
    color: 'primary',
  },
});

export type BaseIconProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyle> & {
    skin?: 'filled' | 'outline' | 'duotone';
  };

const withBaseIcon = (IconComponent: React.FC<BaseIconProps>) => {
  const WrappedComponent: React.FC<BaseIconProps> = ({
    className,
    size,
    supportRtl,
    skin = 'filled',
    ...props
  }) => {
    const computedClass = iconStyle({ size, supportRtl });
    return <IconComponent className={cn(computedClass, className)} skin={skin} {...props} />;
  };
  return WrappedComponent;
};

export const Icon = {
  Message: withBaseIcon(IconMessage),
  Share: withBaseIcon(IconShare),
  Share2: withBaseIcon(IconShare2),
  Refresh: withBaseIcon(IconRefresh),
  Copy: withBaseIcon(IconCopy),
  Menu: withBaseIcon(IconMenu),
  Home: withBaseIcon(IconHome),
  ThumbsUp: withBaseIcon(IconThumbsUp),
  Deny: withBaseIcon(IconDeny),
  Doc: withBaseIcon(IconDoc),
  Users: withBaseIcon(IconUsers),
  Letter: withBaseIcon(IconLetter),
  Notification: withBaseIcon(IconNotification),
  FacebookLogo: withBaseIcon(IconFacebookLogo),
  InstagramLogo: withBaseIcon(IconInstagramLogo),
  TiktokLogo: withBaseIcon(IconTiktokLogo),
  XLogo: withBaseIcon(IconXLogo),
  LinkedInLogo: withBaseIcon(IconLinkedinLogo),
  FlagIsrael: withBaseIcon(IconFlagIsrael),
  FlagUS: withBaseIcon(IconFlagUS),
  Edit: withBaseIcon(IconEdit),
  Visible: withBaseIcon(IconVisible),
};
