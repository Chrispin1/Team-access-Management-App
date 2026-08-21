import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Access Management App",
  description: "Role based access control system",
  keywords: ["team", "access", "control"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-screen ">{children}</body>
    </html>
  );
}
