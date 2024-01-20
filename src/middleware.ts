import { withAuth } from 'next-auth/middleware';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_SECRET as string,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
});

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname; //relative path

    // Manage rate limiting
    if (pathname.startsWith('/api/v1')) {
      const ip = req.ip ?? '127.0.0.1';
      try {
        const { success } = await rateLimit.limit(ip);
        if (!success) {
          return NextResponse.json({
            error: 'Too many requests, try again after an hour!',
          });
        }
        return NextResponse.next();
      } catch (error) {
        console.log('redis', error);
        return NextResponse.json({
          error: 'Internal server error',
        });
      }
    }

    //Manage route protection
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const isAuthPage = pathname.startsWith('/login');
    const sensitiveRoutes = ['/dashboard'];

    if (isAuthPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      return null;
    }

    if (
      !isAuthenticated &&
      sensitiveRoutes.some(route => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*', '/api/:path*'],
};
