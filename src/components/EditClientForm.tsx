"use client";
import { Client } from "@prisma/client";
import { useState } from "react";

interface EditClientFormProps {
  client: Client;
  onClose: () => void; // Callback to close the form
}

export default function EditClientForm({
  client,
  onClose,
}: EditClientFormProps) {
  const [formData, setFormData] = useState({
    firstname: client.firstname,
    lastname: client.lastname,
    email: client.email,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const clientId = client.id;
      const response = await fetch(`/api/clientRoutes/${clientId}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to update client information");
      }

      // Call onClose to return to view mode
      onClose();
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 text-center md:text-left"
    >
      <h2 className="text-lg font-semibold">Edit Client Information</h2>
      <div>
        <label className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
