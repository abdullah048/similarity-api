import { FC, ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return <section className='pt-20'>{children}</section>;
};

export default DashboardLayout;
