'use client';

import { cn } from '@/lib/utils';
import Button from '@/ui/Button';
import { Copy } from 'lucide-react';
import { ButtonHTMLAttributes, FC } from 'react';
import toast from 'react-hot-toast';

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToClipboard: string;
}

const CopyButton: FC<CopyButtonProps> = ({
  className,
  valueToClipboard,
  ...props
}) => {
  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(valueToClipboard);
        toast.success('Api key copied to clipboard');
      }}
      variant='ghost'
      className={cn('', className)}>
      <Copy className='h-5 w-5' />
    </Button>
  );
};

export default CopyButton;
