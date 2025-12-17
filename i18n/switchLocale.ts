import Cookies from "js-cookie";

export function switchLocale(locale: "en" | "vi") {
  Cookies.set("NEXT_LOCALE", locale, { path: "/", expires: 365, sameSite: "lax" });
}
