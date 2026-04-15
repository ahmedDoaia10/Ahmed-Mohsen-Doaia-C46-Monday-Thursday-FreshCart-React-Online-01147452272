import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(pathname, "my request");

  // route handler , proxy
  const token = await getToken({ req: request });

  //   const isAuthPage = pathname === "/login" || pathname === "/register";

  const isAuthPages = ["/login", "/register", "/forget-password"].includes(pathname);

  if (token && isAuthPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && !isAuthPages) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [ "/login", "/register" , "/cart", "/wishlist"],
}
