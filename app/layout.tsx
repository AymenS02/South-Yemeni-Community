import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const erodeH = localFont({
  src: "../fonts/Erode_Complete/Fonts/WEB/fonts/Erode-Semibold.woff2",
  variable: "--font-erode-bold",
  display: "swap",
});

const erodeP = localFont({
  src: "../fonts/Erode_Complete/Fonts/WEB/fonts/Erode-Light.woff2",
  variable: "--font-erode",
  display: "swap",
});
export const metadata: Metadata = {
  title: "South Yemeni Community of Hamilton",
  description:
    "Connecting the South Yemeni community in Hamilton through culture, support, and meaningful connections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${erodeH.variable} ${erodeP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}