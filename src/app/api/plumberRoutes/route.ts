import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const { isPlumber, email } = await req.json();

    await prisma.user.update({
      where: { email: email },
      data: {
        isPlumber: isPlumber,
      },
    });

    return NextResponse.json({ message: "update Plumber status successful" });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Error updating Plumber status" },
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
        isPlumber: true,
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

    return NextResponse.json({ message: "Plumber added to client list" });
  } catch (error) {
    console.error("Couldn't add user to plumber list", error);
  }
}

export async function PUT(req: Request) {
  try {
    const { firstName, lastName, email } = await req.json();

    await prisma.plumber.update({
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
