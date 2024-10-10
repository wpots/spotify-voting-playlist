import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const authToken = request.headers.get('authorization')?.split(`Bearer `)[1];
  const loginUrl = new URL('/signin', request.url);

  if (!authToken) return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/', '/bands/:path*', '/members/:path*'],
};
