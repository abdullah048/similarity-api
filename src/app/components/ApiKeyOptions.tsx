'use client';
import { FC, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/DropdownMenu';
import Button from '@/ui/Button';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ApiKeyOptionsProps {
  apiKeyId: string;
  apiKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKey, apiKeyId }) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);

  const createNewApiKey = async () => {
    setIsCreatingNew(true);
    // try {
    //     await revokeApiKey({keyId:apiKeyId})
    //     await
    // } catch (error) {

    // }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant='ghost' className='flex gap-2 items-center'>
          <p>
            {isCreatingNew
              ? 'Creating new key'
              : isRevoking
              ? 'Revoking key'
              : 'Options'}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className='animate-spin h-4 w-5' />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKey);
            toast.success('Copied to clipboard');
          }}>
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create New Key
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKey);
            toast.success('Copied to clipboard');
          }}>
          Revoke Key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
