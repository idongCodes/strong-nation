import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const rubikDirt = localFont({
  src: "./fonts/RubikDirt-Regular.ttf",
  variable: "--font-rubik-dirt",
  display: "swap",
});

import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Strong Nation | High-Intensity Community Fitness",
  description: "Join the Strong Nation community at the YMCA of Central Massachusetts in Worcester, MA. Experience a high-intensity, music-led workout program that combines body weight, muscle conditioning, cardio, and plyometric training. Discover your inner strength, push your boundaries, and thrive in our inclusive group fitness classes. All fitness levels welcome! RSVP online for our Thursday evening sessions.",
  keywords: ["Strong Nation", "Fitness Worcester MA", "YMCA Central Massachusetts", "High-Intensity Interval Training", "HIIT", "Group Fitness Classes", "Cardio Workout", "Plyometric Training", "Community Health", "Muscle Conditioning"],
  openGraph: {
    title: "Strong Nation | Discover Your Inner Strength",
    description: "Join our high-intensity, community-focused workout sessions at the YMCA of Central Massachusetts in Worcester, MA. RSVP for upcoming Thursday classes and push your boundaries.",
    siteName: "Strong Nation",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Strong Nation Community Fitness Workout",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strong Nation | Discover Your Inner Strength",
    description: "Join our high-intensity, community-focused workout sessions at the YMCA of Central Massachusetts in Worcester, MA. RSVP for upcoming Thursday classes.",
    images: ["/hero-bg.jpg"],
  },
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
        <TopBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}