'use client';
import { FC, useState } from 'react';
import Button from './UI/Button';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signIn('google');
      setLoading(false);
      toast.success('Signed in successfully');
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error('Error signing in. \n Please try again, later.');
    }
  };

  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading}>
      Sign in
    </Button>
  );
};

export default SignInButton;
