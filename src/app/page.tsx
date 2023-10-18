import { Metadata } from 'next';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Similarity api | Home',
  description: 'Free & open-source text similarity api',
};

export default function Home() {
  return (
    <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pt-32 max-w-7xl mx-auto w-full h-full'>
        <div className='h-full gap-6 flex flex-col justify-start xl:justify-center items-center xl:items-start'>
          <Heading
            size='lg'
            className='three-d text-black dark:text-light-gold'>
            Easily determine <br /> text similarity.
          </Heading>
          <Paragraph className='max-w-xl xl:text-left'>
            With the text similarity api you can easily determine the similarity
            between two pieces text with a free{' '}
            <Link
              href='/login'
              className='underline underline-offset-2 text-black dark:text-light-gold'>
              API key
            </Link>
            .
          </Paragraph>
          <div className='relative w-full max-w-lg xl:max-w-2xl xl:left-1/2 aspect-square xl:absolute'>
            <Image
              priority
              className='img-shadow'
              quality={100}
              style={{
                objectFit: 'contain',
              }}
              fill
              src='/typewriter.png'
              alt='typewriter'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
