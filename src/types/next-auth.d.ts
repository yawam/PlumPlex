import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      firstName?: string | null; // Add firstName to the session type
      lastName?: string | null; // Add lastName to the session type
      name?: string | null;
      email?: string | null;
      image?: string | null;
      needsRegistration?: boolean;
    };
  }

  interface User {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    needsRegistration?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    needsRegistration?: boolean;
  }
}
