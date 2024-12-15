import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { clientId: string } },
) {
  try {
    const { clientId } = params;
    const body = await req.json();

    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
      },
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 },
    );
  }
}
