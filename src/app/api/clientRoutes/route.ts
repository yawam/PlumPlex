import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const { isClient, email } = await req.json();
    console.log(email);

    await prisma.user.update({
      where: { email: email },
      data: {
        isClient: isClient,
      },
    });

    return NextResponse.json({ message: "update client status successful" });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Error updating client status" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const client = await prisma.user.findUnique({
      where: {
        email: email,
        isClient: true,
      },
    });

    console.log(client);

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    await prisma.client.create({
      data: {
        id: client.id,
        firstname: client.firstName ?? "",
        lastname: client.lastName ?? "",
        email: client.email,
        image: client.image ?? "",
      },
    });

    return NextResponse.json({ message: "add client successful" });
  } catch (error) {
    console.error("Couldn't add user to client list", error);
  }
}

export async function PUT(req: Request) {
  try {
    const { firstName, lastName, email } = await req.json();

    await prisma.client.update({
      where: { email: email },
      data: {
        firstname: firstName,
        lastname: lastName,
      },
    });
    return NextResponse.json({ message: "update client successful" });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Error updating client" },
      { status: 500 }
    );
  }
}
