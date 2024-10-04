import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { siteConfig } from "~/config/site"

import { TRPCReactProvider } from "~/trpc/react";
import { SiteHeader } from "./_components/site-header";
import { ThemeProvider } from "~/components/providers"
import { cn } from "~/lib/utils";
import { Analytics } from "@vercel/analytics/react"
import { SiteFooter } from "~/components/site-footer";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Top Trailblazers",
  description: "Top Salesforce Trailblazers",
  icons: [{ rel: "icon", url: "/favicons/favicon.ico" }],
  authors: [
    {
      name: "Justin Wills",
      url: "https://1sync.co",
    },
  ],
  keywords: [
    "nextjs",
    "react",
    "table",
    "react-table",
    "tanstack-table",
    "shadcn",
    'salesforce',
    'salesforce trailblazers',
    'trailhead'
  ],
  creator: "jawills",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [`${siteConfig.url}/opengraph-image.png`]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: "jawills",
  },
  robots:{
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body         className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}>
        <TRPCReactProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          
        >
          <div className="relative flex min-h-screen flex-col items-center	">
                      <SiteHeader/>
                      {children}
                      <Toaster />
                      <SiteFooter/>
          </div>
          
          </ThemeProvider>
          <Analytics/>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
