// Import necessary functions from NextAuth and Next.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust this path based on where your auth options are defined
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import HomeContent from "@/components/homeContent";

// Async server component

export default async function Home() {
  // Fetch session on the server
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();

  if (!session) {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  const client = await prisma.client.findUnique({
    where: {
      email: user?.email,
    },
  });

  const plumbers = await prisma.plumber.findMany();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Use an env variable or default to localhost
  const response = await fetch(
    `${baseUrl}/api/plumberRoutes/nearby?email=${client?.email}`,
  );

  const nearbyPlumbers = await response.json();

  const boostedPlumbers = await prisma.plumber.findMany({
    where: {
      boosted: true,
    },
  });

  // Redirect to login if there's no session (or return null as a placeholder if using `useRouter` to navigate to login)
  if (!session) {
    return redirect("/login");
  }
  return (
    <HomeContent
      client={client!}
      plumbers={plumbers}
      nearbyPlumbers={nearbyPlumbers}
      boostedPlumbers={boostedPlumbers}
    />
  );
}
