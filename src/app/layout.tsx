import SessionProviderWrapper from "../providers/SessionProviderWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlumPlex",
  description: "Find a plumber near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        <SessionProviderWrapper>
          {children}
          <Toaster position="top-left" reverseOrder={false} />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
