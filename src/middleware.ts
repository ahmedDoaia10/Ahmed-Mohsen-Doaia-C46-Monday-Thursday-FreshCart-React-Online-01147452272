import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const isAuthPages = ["/login", "/register", "/forget-password"].includes(pathname);

  
  if (token && isAuthPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  
  if (!token && !isAuthPages) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/login", "/register", "/forget-password", "/cart", "/wishlist"],
};