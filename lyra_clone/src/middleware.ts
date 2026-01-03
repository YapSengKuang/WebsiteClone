// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - static files
     * - Next.js internals
     * - public auth pages
     */
    "/((?!_next|.*\\..*|sign-in|sign-up).*)",
  ],
};
