"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <ArrowLeft
      size={40}
      className="absolute left-4 top-4 cursor-pointer"
      onClick={() => router.back()} // Use router.back() to navigate to the previous page
    />
  );
}
