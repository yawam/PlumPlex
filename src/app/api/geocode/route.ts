import { NextResponse } from "next/server";

interface AddressComponent {
  types: string[];
  long_name: string;
}

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 },
    );
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch location data" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const result = data.results[0];

    if (!result) {
      return NextResponse.json(
        { error: "No location data found" },
        { status: 404 },
      );
    }

    const components = result.address_components;
    const city = components.find((c: AddressComponent) =>
      c.types.includes("locality"),
    )?.long_name;

    const state = components.find((c: AddressComponent) =>
      c.types.includes("administrative_area_level_1"),
    )?.long_name;

    return NextResponse.json({
      city: city || "Unknown",
      state: state || "Unknown",
      formatted_address: result.formatted_address,
    });
  } catch (error) {
    console.error("Geocoding error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
