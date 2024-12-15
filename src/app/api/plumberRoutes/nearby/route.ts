import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Radius in miles
const RADIUS_MILES = 51;

// Function to calculate haversine distance
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export async function GET(req: Request) {
  const prisma = new PrismaClient();

  // Get the client's email from the query parameter or authentication session
  const { searchParams } = new URL(req.url);
  const clientEmail = searchParams.get("email");

  // Fetch the client information
  const client = await prisma.client.findUnique({
    where: { email: clientEmail || "" },
  });

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const { latitude, longitude } = client;
  console.log(latitude, longitude);

  // Fetch plumbers nearby using the Haversine formula
  const plumbers = await prisma.$queryRaw`
    SELECT *, 
      ( 3959 * acos( 
        cos(radians(${latitude})) * cos(radians(latitude)) * 
        cos(radians(longitude) - radians(${longitude})) + 
        sin(radians(${latitude})) * sin(radians(latitude)) 
      )) AS distance
    FROM Plumber
    HAVING distance <= ${RADIUS_MILES}
    ORDER BY distance ASC;
  `;

  console.log(plumbers);

  return NextResponse.json(plumbers);
}
