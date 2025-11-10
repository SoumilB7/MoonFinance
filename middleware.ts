import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default clerkMiddleware((auth, req: NextRequest) => {
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl.clone();
  
  // Check if the request is for b2b subdomain
  // Handle both b2b.localhost:3000 and b2b.* patterns
  const isB2BSubdomain = hostname.startsWith("b2b.") || 
                         hostname === "b2b.localhost:3000" ||
                         hostname.startsWith("b2b.localhost");
  
  if (isB2BSubdomain) {
    // If accessing root path on b2b subdomain, rewrite to /b2b
    if (url.pathname === "/") {
      url.pathname = "/b2b";
      return NextResponse.rewrite(url);
    }
    // For other paths on b2b subdomain, keep them as is (let Next.js routing handle it)
    // Only rewrite root to /b2b
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};