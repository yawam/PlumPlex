import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { email, longitude, latitude } = await req.json();
    const prisma = new PrismaClient();
    await prisma.client.update({
      where: { email: email },
      data: {
        longitude: longitude,
        latitude: latitude,
      },
    });
    return NextResponse.json({ message: "update client location successful" });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Error updating client location" },
      { status: 500 },
    );
  }
}
