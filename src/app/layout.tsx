import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const rubikDirt = localFont({
  src: "./fonts/RubikDirt-Regular.ttf",
  variable: "--font-rubik-dirt",
  display: "swap",
});

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Strong Nation",
  description: "Your path to a stronger you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubikDirt.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}