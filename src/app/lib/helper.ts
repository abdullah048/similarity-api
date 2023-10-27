import { CreateApiData } from '../../../typings';

export const createApiKey = async () => {
  const response = await fetch('/api/api-key/create');
  const data = (await response.json()) as CreateApiData;

  if (data.error || data.createdApiKey === null) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(' '));
    } else {
      throw new Error(data.error ?? 'Something went wrong (api-key/create)');
    }
  }

  return data.createdApiKey.key;
};
