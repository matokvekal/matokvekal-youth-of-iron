import { VariantProps } from 'tailwind-variants';
import { Button, buttonVariants } from './Button';
import { cn } from 'utils/cn';

type ActionItem = {
  label: string;
  onClick: () => void;
  id?: string;
  icon?: React.ReactElement;
  btnProps?: VariantProps<typeof buttonVariants>;
};

interface ActionsRowProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: ActionItem[];
}

export const ActionsRow: React.FC<ActionsRowProps> = ({ actions, className }) => (
  <div className={cn('flex w-full flex-col justify-center gap-2 md:flex-row', className)}>
    {actions.map(({ onClick, icon, label, id, ...buttonVariants }, index) => (
      <Button key={index} className='flex-grow px-0' onClick={onClick} id={id} {...buttonVariants}>
        {icon}
        {label}
      </Button>
    ))}
  </div>
);
