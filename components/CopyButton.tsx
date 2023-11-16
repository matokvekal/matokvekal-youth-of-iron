import { Copy } from 'lucide-react';
interface Props {
  onClick: (e: React.MouseEvent<HTMLTextAreaElement | HTMLButtonElement>) => void;
  text: string;
}

export function CopyButton({ onClick, text }: Props) {
  return (
    <button
      id='copy_button'
      onClick={onClick}
      type='button'
      className='flex items-center gap-2 text-primary hover:underline'
    >
      <Copy className='h-4 w-4' />
      {text}
    </button>
  );
}
