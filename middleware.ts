// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(_request: NextRequest) {
  try {
    return NextResponse.next()
  } catch (_error) {
    // Always fail open in middleware to avoid deployment/runtime crashes
    return NextResponse.next()
  }
}

export const config = {
  // Simple, safe matcher: run on all paths except common static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}