import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { TopNav } from "./_components/topnav";

export const metadata: Metadata = {
  title: "Top Trailblazers",
  description: "Top Salesforce Trailblazers",
  icons: [{ rel: "icon", url: "/favicons/favicon.ico" }],
};



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <TopNav/>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
