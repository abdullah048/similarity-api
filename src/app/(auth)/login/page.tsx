import { buttonVariants } from '@/components/UI/Button';
import Icons from '@/components/Icons';
import Heading from '@/components/UI/Heading';
import Link from 'next/link';
import Paragraph from '@/components/UI/Paragraph';
import UserAuthForm from '@src/app/components/UserAuthForm';

const Login = () => {
  return (
    <div className='absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 max-w-lg'>
        <div className='flex flex-col items-center gap-6 text-center'>
          <Link
            className={buttonVariants({
              variant: 'ghost',
              className: 'w-fit',
            })}
            href='/'>
            <Icons.ChevronLeft className='mr-2 h-4 w-4' />
            Back to home
          </Link>
          <Heading>Welcome back!</Heading>
          <Paragraph>Please sign in using your google account.</Paragraph>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
