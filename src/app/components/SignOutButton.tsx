'use client';
import { FC, useState } from 'react';
import Button from '@/ui/Button';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const logout = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success('Logged out successfully');
      setLoading(false);
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error('Error signing out. \n Please try again, later.');
    }
  };

  return (
    <Button onClick={logout} isLoading={isLoading}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
