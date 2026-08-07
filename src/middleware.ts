import { NextResponse, type NextRequest } from "next/server";
import { isProtectedPath } from "@/lib/auth/routes";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (isProtectedPath(request.nextUrl.pathname) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*"]
};
