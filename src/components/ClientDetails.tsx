"use client";
import { Client } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import EditClientForm from "./EditClientForm";
import { FaPencil } from "react-icons/fa6";
import BackButton from "./backButton";

interface ClientDetailsProps {
  client: Client;
}

export default function ClientDetails({ client }: ClientDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Handle toggling edit mode
  const handleEditClick = () => setIsEditing(!isEditing);

  const [location, setLocation] = useState<{
    city: string;
    state: string;
    address: string;
  } | null>(null);

  // Fetch plumber's location based on latitude and longitude
  useEffect(() => {
    async function fetchLocation() {
      if (!client.latitude || !client.longitude) return;
      try {
        const response = await fetch(
          `/api/geocode?lat=${client.latitude}&lon=${client.longitude}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch location");
        }
        const data = await response.json();
        setLocation({
          city: data.city,
          state: data.state,
          address: data.formatted_address,
        });
      } catch (error) {
        console.error("Error fetching location:", error);
        setLocation({ city: "Unknown", state: "Unknown", address: "Unknown" });
      }
    }

    fetchLocation();
  }, [client.latitude, client.longitude]);

  return (
    <div className="relative flex flex-col items-center justify-center rounded-xl bg-slate-200 p-4 shadow-md md:flex-row md:items-start">
      <BackButton />

      {isEditing ? (
        <EditClientForm client={client} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          {/* Image Section */}
          <div className="relative h-40 w-40 overflow-hidden rounded-full md:mr-6 md:h-[150px] md:w-[150px]">
            <Image
              src={client.image}
              alt={`Client image of ${client.firstname} ${client.lastname}`}
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              className="rounded-full"
            />
          </div>

          {/* Details Section */}
          <div className="p-4 text-center md:text-left">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Client Details</p>
              <button
                onClick={handleEditClick}
                className="text-blue-950 hover:text-blue-900"
                aria-label="Edit client information"
              >
                <FaPencil />
              </button>
            </div>
            <p>
              Client Name: {client.firstname} {client.lastname}
            </p>
            <p>Client Email: {client.email}</p>
            <p>Joined at: {new Date(client.created_at).toLocaleDateString()}</p>
            <p>
              Location:{" "}
              {location ? `${location.city}, ${location.state}` : "Fetching..."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
