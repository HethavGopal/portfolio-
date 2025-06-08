'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
} 