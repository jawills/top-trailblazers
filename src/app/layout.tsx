import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Top Trailblazers",
  description: "Top Salesforce Trailblazers",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function TopNav() {
  return (
    <nav className="flex items-center justify-between w-full p-4 text-xl font-semibold border-b">
      <div>Top Trailblazers</div>
      <div>Add Your Account</div>
    </nav>
  )
}

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
