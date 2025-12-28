"use client";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 150,
  easing: "ease",
  speed: 300,
});
export default function RouteProgress() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
