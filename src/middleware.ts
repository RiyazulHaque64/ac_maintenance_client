// middleware.ts
import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const url = req.nextUrl.clone();

  const isProtected = protectedRoutes.some((route) => url.pathname.startsWith(route));

  if (isProtected && !token) {
    url.pathname = '/login';
    url.searchParams.set('return_to', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
