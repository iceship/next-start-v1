import type { Metadata } from "next";
import { Suspense } from "react";

import { GeistSans } from "geist/font/sans";

import Providers from "@/components/providers";
import { TRPCReactProvider } from "@/trpc/react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Starter App",
  description: "A basic starter for next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      </head>
      <body className="h-screen w-screen">
        <TRPCReactProvider>
          <Providers>
            <main className="flex-grow overflow-auto bg-[url(/light-bg.svg)] bg-cover dark:bg-[url(/dark-bg.svg)]">
              <Suspense>{children}</Suspense>
            </main>
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
