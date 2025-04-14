import createMiddleware from 'next-intl/middleware';
import { auth } from "@/auth";
import { routing } from '@/i18n/routing';

// Initialize the i18n middleware
const handleI18nRouting = createMiddleware(routing);

export default auth(async (req) => {
  const { pathname, origin } = req.nextUrl;

  // Protected routes
  const protectedRoutes = ['/business', '/dashboard'];

  // Check if the user is authenticated for protected routes
  if (!req.auth && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const newUrl = new URL("/", origin); // Redirect to home or login page
    return Response.redirect(newUrl);
  }

  // If not a protected route, proceed with i18n routing
  const i18nResponse = handleI18nRouting(req);

  // Return the i18n middleware's response
  return i18nResponse;
});

// Define the matcher to include all relevant paths
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Avoid applying middleware to API routes, Next.js assets, or static files
};