import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { SiteHeader } from "./_components/site-header";
import { ThemeProvider } from "~/components/providers"

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
};



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader/>
          {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
