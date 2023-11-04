import { FC } from 'react';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import RequestApiKey from '@/components/RequestApiKey';
import ApiDashboard from '@/components/ApiDashboard';

export const metadata: Metadata = {
  title: 'Similarity api | Dashboard',
  description: 'Free & open-source text similarity api',
};

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = async ({}) => {
  const user = await getServerSession(authOptions);

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: user?.user.id,
      enabled: true,
    },
  });

  return (
    <div className='max-w-7xl mx-auto mt-16'>
      {apiKey ? (
        <div>
          <ApiDashboard />
        </div>
      ) : (
        <div>
          <RequestApiKey />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
