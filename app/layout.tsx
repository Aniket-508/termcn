import type { Metadata } from "next";

import { ActiveThemeProvider } from "@/components/active-theme";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { META_THEME_COLORS } from "@/lib/config";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { JsonLdScripts } from "@/seo/json-ld";
import { baseMetadata } from "@/seo/metadata";

import "@/styles/globals.css";

export const metadata: Metadata = baseMetadata;

const ThemeScript = ({ darkColor }: { darkColor: string }) => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `
        try {
          if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '${darkColor}')
          }
          document.documentElement.classList.add('layout-fixed')
        } catch (_) {}
      `,
    }}
  />
);

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <JsonLdScripts />
      <ThemeScript darkColor={META_THEME_COLORS.dark} />
      <meta name="theme-color" content={META_THEME_COLORS.light} />
    </head>
    <body
      className={cn(
        "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
        fontVariables
      )}
    >
      <ThemeProvider>
        <ActiveThemeProvider>
          {children}
          <Toaster position="top-center" />
          <Analytics />
        </ActiveThemeProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
