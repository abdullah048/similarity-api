'use client';
import { FC, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { createApiKey } from '@/lib/helper';
import { Key } from 'lucide-react';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import CopyButton from '@/components/CopyButton';

interface RequestApiKeyProps {}

const RequestApiKey: FC<RequestApiKeyProps> = ({}) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error('Error generating Api key!');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className='container md:max-w-2xl'>
      <div className='flex flex-col gap-6 items-center'>
        <Key className='mx-auto h-12 w-12 text-gray-400' />
        <Heading>Request your Api Key</Heading>
        <Paragraph>You have&apos;t requested an api key yet.</Paragraph>
      </div>
      <form onSubmit={createNewApiKey} className='mt-6 sm:flex sm:items-center'>
        <div className='relative rounded-md shadow-sm sm:min-w-0 sm:flex-1'>
          {apiKey ? (
            <CopyButton
              type='button'
              className='absolute inset-y-0 right-0 animate-in fade-in duration-300'
              valueToClipboard={apiKey}
            />
          ) : // Todo: Create a reusable input component...
          null}
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
