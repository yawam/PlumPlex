"use client";

import { Client, Plumber } from "@prisma/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ConfirmDataFormProps {
  initialData: Client | Plumber | null;
  isClient: boolean;
  isPlumber: boolean;
}

export default function ConfirmDataForm({
  initialData,
  isClient,
  isPlumber,
}: ConfirmDataFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstname ?? "",
    lastName: initialData?.lastname ?? "",
    email: initialData?.email ?? "",
  });

  const [update, isUpdating] = useState(false);

  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isUpdating(true);
    try {
      const endpoint = isPlumber
        ? "/api/plumberRoutes"
        : isClient
        ? "/api/clientRoutes"
        : null;

      if (!endpoint) {
        throw new Error("Use type not specified to choose endpoint");
      }

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response) {
        throw new Error("Failed to update user Data failed");
      }

      toast.success("User data updated successfully");
      //   console.log("User data updated successfully");
      router.push("/");
      isUpdating(false);
    } catch (error) {
      isUpdating(false);
      toast.error("Error updating user data");
      console.error("Error updating user data", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold">Confirm Your Data</h2>

      <div>
        <label className="block text-sm font-medium">First Name</label>
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          readOnly // Make email read-only if it shouldn't be editable
          className="cursor-not-allowed bg-gray-500"
        />
      </div>

      <Button
        type="submit"
        className="w-full transition-all hover:scale-95"
        disabled={update}
      >
        Submit
      </Button>
    </form>
  );
}
