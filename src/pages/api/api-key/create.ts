import { authOptions } from '@/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { CreateApiData } from '../../../../typings';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { withMethods } from '@src/app/lib/api-middlewares/with.methods';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateApiData>
) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      res => res?.user
    );
    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        createdApiKey: null,
      });
    }
    const existingApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });
    if (existingApiKey) {
      return res.status(400).json({
        error: 'Already have an API Key!',
        createdApiKey: null,
      });
    }

    const newlyCreatedApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });

    return res.status(200).json({
      error: null,
      createdApiKey: newlyCreatedApiKey,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: err.issues,
        createdApiKey: null,
      });
    }
    return res.status(500).json({
      error: 'Internal server error',
      createdApiKey: null,
    });
  }
};

export default withMethods(['GET'], handler);
