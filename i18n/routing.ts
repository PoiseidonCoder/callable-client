import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "vi",
  localePrefix: "never",
  localeCookie: {
    name: "NEXT_LOCALE",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});
export type Locale = (typeof routing.locales)[number];
