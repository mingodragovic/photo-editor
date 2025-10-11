"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      {...props}
      // Prevent hydration mismatch by disabling SSR for theme
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      {children}
    </NextThemesProvider>
  );
}