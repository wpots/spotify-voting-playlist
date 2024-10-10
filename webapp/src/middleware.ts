import { NextRequest } from 'next/server';
import { withAuthMiddleware } from './utils/authentication';

export async function middleware(request: NextRequest) {
  return withAuthMiddleware(request);
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
};
