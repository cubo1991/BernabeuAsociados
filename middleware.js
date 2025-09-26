import { NextResponse } from "next/server";

export function middleware(request) {
  const cookie = request.cookies.get("user");
  const url = request.nextUrl.pathname;

  if (url.startsWith("/admin")) {
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const user = JSON.parse(cookie.value);
      if (user.role !== "admin") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
