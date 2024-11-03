import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email ?? "" },
      });

      if (!existingUser) {
        const [firstName, ...lastNameParts] = (user.name ?? "").split(" ");
        const lastName = lastNameParts.join(" "); // Handle cases where the last name has spaces

        await prisma.user.create({
          data: {
            firstName,
            lastName,
            name: user.name,
            email: user.email ?? "",
            image: user.image,
            isClient: false,
            isPlumber: false,
          },
        });
      }

      if (!existingUser?.isClient && !existingUser?.isPlumber) {
        user.needsRegistration = true;
      }
      return true;
    },

    async jwt({ token, user }) {
      // Pass the needsRegistration flag from the user to the token if it exists
      if (user?.needsRegistration) {
        token.needsRegistration = true;
      }
      return token;
    },

    async session({ session, token }) {
      // Pass the needsRegistration flag from the token to the session
      session.user.needsRegistration = token.needsRegistration || false;
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
