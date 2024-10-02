"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export default function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider className="flex h-full w-full flex-col">
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          {...themeProps}
        >
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
