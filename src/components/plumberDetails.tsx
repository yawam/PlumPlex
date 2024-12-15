"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PlumberDetailsProps {
  image: string;
  firstname: string;
  lastname: string;
  email: string; // Plumber's email
  missions: number;
  created_at: Date;
  latitude: number | null;
  longitude: number | null;
}

export default function PlumberDetails({
  image,
  firstname,
  lastname,
  email,
  missions,
  created_at,
  latitude,
  longitude,
}: PlumberDetailsProps) {
  const [location, setLocation] = useState<{
    city: string;
    state: string;
    address: string;
  } | null>(null);

  const [status, setStatus] = useState<string>("Checking...");

  // Fetch plumber's location based on latitude and longitude
  useEffect(() => {
    async function fetchLocation() {
      if (!latitude || !longitude) return;
      try {
        const response = await fetch(
          `/api/geocode?lat=${latitude}&lon=${longitude}`,
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
  }, [latitude, longitude]);

  // Sync plumber's status in real-time
  useEffect(() => {
    const updateStatus = async (currentStatus: string) => {
      try {
        await fetch(`/api/user-status`, {
          method: "POST",
          body: JSON.stringify({ email, status: currentStatus }),
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Failed to sync status:", error);
      }
    };

    // Initial status sync
    const currentStatus = navigator.onLine ? "Online" : "Offline";
    setStatus(currentStatus);
    updateStatus(currentStatus);

    // Add event listeners for status changes
    const handleOnline = () => {
      setStatus("Online");
      updateStatus("Online");
    };

    const handleOffline = () => {
      setStatus("Offline");
      updateStatus("Offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [email]);

  return (
    <div className="mb-6 h-[500px] w-full grid-cols-[1fr_60%] rounded-xl bg-slate-200 shadow-md md:grid md:h-[400px]">
      <div className="relative h-[60%] w-full overflow-hidden md:h-full">
        <Image
          src={image}
          alt={`Plumber image of ${firstname} ${lastname}`}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          className="flex h-full w-full items-center justify-center rounded-t-xl md:rounded-l-xl"
        />
      </div>
      <div className="p-2 md:p-6">
        <p>Plumber Details</p>
        <p>
          Plumber Name: {firstname} {lastname}
        </p>
        <p>Plumber Email: {email}</p>
        <p>Joined at: {new Date(created_at).toLocaleDateString()}</p>
        <p>
          Location:{" "}
          {location ? `${location.city}, ${location.state}` : "Fetching..."}
        </p>
        <p>Full Address: {location?.address || "Fetching..."}</p>
        <p>Status: {status} </p> {/* Real-time status */}
        <p>No. of missions: {missions} </p>
      </div>
    </div>
  );
}
