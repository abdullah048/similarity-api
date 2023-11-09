import { CreateApiData } from '../../../typings';
import OpenAI from 'openai';

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

export const revokeApiKey = async ({ keyId }: { keyId: string }) => {
  const res = await fetch('/api/api-key/revoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keyId }),
  });

  const data = (await res.json()) as { error?: string };
  if (data.error) {
    throw new Error(data.error);
  }
};

// open ai config
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? '',
  dangerouslyAllowBrowser: true,
});

export const cosineSimilarity = (A: number[], B: number[]) => {
  var dotProduct = 0;
  var mA = 0;
  var mB = 0;
  for (let i = 0; i < A.length; i++) {
    // here you missed the i++
    dotProduct += A[i] * B[i];
    mA += A[i] * A[i];
    mB += B[i] * B[i];
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  var similarity = dotProduct / (mA * mB); // here you needed extra brackets
  return similarity;
};
