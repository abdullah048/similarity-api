import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatDistance } from 'date-fns';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import { Input } from '@/ui/Input';
import Table from '@/ui/Table';
import ApiKeyOptions from '@/components/ApiKeyOptions';

const ApiDashboard = async () => {
  const user = await getServerSession(authOptions);
  if (!user) {
    notFound();
  }

  const allApiKeys = await db.apiKey.findMany({
    where: {
      userId: user.user.id,
    },
  });

  const activeApiKey = allApiKeys.find(apiKey => apiKey.enabled);

  if (!activeApiKey) {
    notFound();
  }

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: allApiKeys.map(key => key.id),
      },
    },
  });

  // Making timestamps serialized
  const serializedRequest = userRequests.map(req => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return (
    <div className='container flex flex-col gap-6'>
      <Heading>Welcome back, {user.user.name}</Heading>
      <div className='flex flex-col sm:flex-row lg:flex-row gap-4 justify-center lg:justify-start items-center'>
        <Paragraph>Your API Key:</Paragraph>
        <Input className='w-fit truncate' readOnly value={activeApiKey.key} />
        <ApiKeyOptions apiKey={activeApiKey.key} apiKeyId={activeApiKey.id} />
      </div>
      <Paragraph className='text-center lg:text-left mt-4 -mb-4'>
        Your API history:
      </Paragraph>
      <Table userRequests={serializedRequest} />
    </div>
  );
};

export default ApiDashboard;
