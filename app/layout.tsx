import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import RouteProgress from "@/components/features/route-progess";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Callable",
  description: "Connect with your loved ones through seamless video calls.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <SessionProvider>
              <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
            </SessionProvider>
            <RouteProgress />
            <Toaster position="bottom-center" />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
