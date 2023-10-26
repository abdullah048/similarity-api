import { FC } from 'react';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@src/app/lib/auth';

export const metadata: Metadata = {
  title: 'Similarity api | Dashboard',
  description: 'Free & open-source text similarity api',
};

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = async ({}) => {
  const user = await getServerSession(authOptions);
  console.log('user', user);
  return <div>Dashboard</div>;
};

export default Dashboard;
