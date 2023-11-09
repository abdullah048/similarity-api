import { authOptions } from '@/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { withMethods } from '@src/app/lib/api-middlewares/with.methods';
import { RevokeApiData } from '../../../../typings';
import { cosineSimilarity, openai } from '@src/app/lib/helper';

// schema validation using zod
const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body as unknown;
    const apiKey = req.headers.authorization;
    if (!apiKey) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });
    if (!validApiKey) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    const { text1, text2 } = reqSchema.parse(body);
    const start = new Date();
    const embeddings = await Promise.all(
      [text1, text2].map(async txt => {
        const res = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: txt,
        });
        return res?.data[0].embedding;
      })
    );

    const similarityCheck = cosineSimilarity(embeddings[0], embeddings[1]);
    const duration = new Date().getTime() - start.getTime();

    // Persistance of request
    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    });
    return res.status(200).json({
      success: true,
      text1,
      text2,
      similarity: similarityCheck,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: err.issues,
        success: false,
      });
    }
    console.log('error', err);
    return res.status(500).json({
      error: 'Internal server error',
      success: false,
    });
  }
};

export default withMethods(['POST'], handler);
