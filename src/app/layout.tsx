import SessionProviderWrapper from "../providers/SessionProviderWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ProfileButton } from "@/components/profileButton";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust this path based on where your auth options are defined

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlumPlex",
  description: "Find a plumber near you",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="p-2">
        {session && (
          <div className="flex justify-end">
            <ProfileButton
              userImage={user?.image ?? ""}
              userId={user?.id ?? ""}
            />
          </div>
        )}
        <SessionProviderWrapper>
          {children}
          <Toaster position="top-left" reverseOrder={false} />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
