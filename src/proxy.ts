import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTH_PAGES = [
  "/login",
  "/register",
  "/reset-password",
  "/reset-password/confirm",
  "/verify",
  "/auth",
];

// (opcjonalnie) tu skonfiguruj wzorce tras chronionych
const PROTECTED_PREFIXES = ["/events", "/"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;
  const isAuthenticated = Boolean(access || refresh);

  const isAuthPage = AUTH_PAGES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // Zalogowany → nie wpuszczamy na strony auth
  if (isAuthenticated && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/events";
    return NextResponse.redirect(url);
  }

  // Niezalogowany → nie wpuszczamy na trasy chronione
  if (!isAuthenticated && isProtected) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname); // opcjonalnie: dokąd wrócić po logowaniu
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Ograniczamy działanie do interesujących tras
export const config = {
  matcher: [
    "/login",
    "/register",
    "/reset-password/:path*",
    "/verify",
    "/events/:path*",
    "/",
  ],
};
