'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <SessionProvider>{children}</SessionProvider>
      <Toaster position='bottom-right' />
    </ThemeProvider>
  );
};

export default Providers;
