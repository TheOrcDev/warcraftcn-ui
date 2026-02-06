import { Analytics } from "@vercel/analytics/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import SearchDialog from "@/components/search";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

import "./global.css";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "warcraftcn - Warcraft UI components",
  description:
    "A set of components inspired by classic Warcraft III RTS UI aesthetics. Open source, copy paste ready. Works with your favorite frameworks. Fan made. No affiliation.",
  openGraph: {
    images: "/warcraftcn-og.png",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <RootProvider
            search={{
              SearchDialog,
            }}
          >
            <SiteHeader />

            <div className="mx-auto w-full max-w-[1400px] flex-1 border-r border-l">
              {children}
            </div>
            <Toaster />
            <Analytics />
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
