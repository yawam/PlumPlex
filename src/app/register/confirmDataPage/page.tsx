import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConfirmDataForm from "@/components/confirmDataForm";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation"; // Use for server-side redirects
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export default async function ConfirmDataPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    console.log("No session data available");
    return redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(
        "/register/confirmDataPage"
      )}`
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  console.log(user);
  if (!user) {
    return <div>User not found</div>;
  }

  let roleData = null;

  if (session) {
    if (user.isPlumber) {
      roleData = await prisma.plumber.findUnique({
        where: {
          email: session.user.email ?? "",
        },
      });
    } else if (user.isClient) {
      roleData = await prisma.client.findUnique({
        where: {
          email: session.user.email ?? "",
        },
      });
    }
  }

  return (
    <ConfirmDataForm
      initialData={roleData || null}
      isPlumber={user.isPlumber}
      isClient={user.isClient}
    />
  );
}
