"use client";

import { Client, Plumber } from "@prisma/client";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import TopPlumbersSection from "@/components/topPlumbersSection";
import PlumbersNearbySection from "./plumbersNearbySection";
import BoostedPlumbersSection from "./boostedPlumbersSection";

interface HomeContentProps {
  client: Client;
  plumbers: Plumber[];
  nearbyPlumbers: Plumber[];
  boostedPlumbers: Plumber[];
}

export default function HomeContent({
  client,
  plumbers,
  nearbyPlumbers,
  boostedPlumbers,
}: HomeContentProps) {
  const [isLocationSaved, setIsLocationSaved] = useState<boolean | null>(null);

  useEffect(() => {
    const saveClientLocation = async () => {
      try {
        // Get the client's location
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Send location to the server
            const response = await fetch("/api/clientRoutes/location", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                latitude,
                longitude,
                email: client?.email ?? "",
              }),
            });

            // Update state based on API response
            if (response.ok) {
              setIsLocationSaved(true);
            } else {
              setIsLocationSaved(false);
            }
          },
          () => {
            // Handle geolocation errors (e.g., user denies access)
            setIsLocationSaved(false);
          },
        );
      } catch (error) {
        console.error("Error saving client location:", error);
        setIsLocationSaved(false);
      }
    };

    saveClientLocation();
  }, [client.email]);

  // If location saving fails, display an error message
  if (!isLocationSaved) {
    return <p>You need to enable location services to use this app.</p>;
  }

  // Render the main content if location is saved successfully
  return (
    <Fragment>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">
          Welcome Plumplex, {client.firstname}!
        </h2>
        <p className="text-sm">Find the best plumbers in the city</p>
        <div className="mt-4">
          <p>Top Plumbers</p>
          <TopPlumbersSection plumbers={plumbers} />
        </div>
        <div>
          <p>Plumbers Near you - within 50miles</p>
          <PlumbersNearbySection nearbyPlumbers={nearbyPlumbers} />
        </div>
        <div>
          <p>Boosted Plumbers</p>
          <BoostedPlumbersSection boostedPlumbers={boostedPlumbers} />
        </div>
      </div>
    </Fragment>
  );
}
