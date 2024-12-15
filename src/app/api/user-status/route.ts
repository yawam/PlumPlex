import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, status } = body;

    if (!email || !status) {
      return NextResponse.json(
        { error: "Email and status are required" },
        { status: 400 },
      );
    }

    // Update the user's status in the database
    await prisma.user.update({
      where: { email },
      data: { status },
    });

    return NextResponse.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 },
    );
  }
}
