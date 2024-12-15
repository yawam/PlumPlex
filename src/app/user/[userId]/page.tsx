import ClientDetails from "@/components/ClientDetails";
import { PrismaClient } from "@prisma/client";

export default async function UserAccountPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const prisma = new PrismaClient();

  const client = await prisma.client.findUnique({
    where: {
      id: userId,
    },
  });

  return <div>{client && <ClientDetails client={client} />}</div>;
}
