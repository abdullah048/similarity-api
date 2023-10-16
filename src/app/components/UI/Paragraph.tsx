import React from 'react';
import { cva } from 'class-variance-authority';

type Props = {};

const paragraphVariants = cva(
  'max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center',
  {
    variants: {
      size: {
        default: 'text-base sm:text-lg',
        large: '',
      },
    },
  }
);

const Paragraph = (props: Props) => {
  return <div>Paragraph</div>;
};

export default Paragraph;
