import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TASA | Certified Loose Diamonds",
  description: "Natural and lab diamonds certified by GIA and IGI. Direct pricing, inspected stones, and fully insured delivery.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white">
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
