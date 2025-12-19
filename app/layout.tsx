import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import I18nProvider from "@/components/providers/i18n-provider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";

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

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <I18nProvider locale={params.locale}>
              <SidebarProvider defaultOpen={defaultOpen}>
                {children}
              </SidebarProvider>
              <Toaster position="bottom-center" />
              <ReactQueryDevtools initialIsOpen={false} />
            </I18nProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
