import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import StoreProvider from "./StoreProvider";
import Wrapper from "./components/layout/Wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PPTI QODR FORUM",
  description: "PPTI QODR FORUM by ArsyadDev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#050505]`}
      >
        <StoreProvider>
          <Wrapper>{children}</Wrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
