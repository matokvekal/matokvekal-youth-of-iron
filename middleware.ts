import { createI18nMiddleware } from "next-international/middleware";
import type { NextRequest } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "he"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
  resolveLocaleFromRequest: (request: NextRequest) => {
    return request.headers.get("accept-language") === "he" ? "he" : "en";
  },
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};