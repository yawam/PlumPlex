"use client";

import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";

/// do form for registration
export default function Registration() {
  const { data: session } = useSession();
  console.log("session user email:", session?.user?.email);
  const [isSetting, setIsSetting] = useState(false);
  const router = useRouter();
  const handleSetClient = async () => {
    setIsSetting(true);
    //api route to set isClient to true in my database
    try {
      await fetch("/api/clientRoutes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isClient: true,
          email: session?.user?.email,
        }),
      });

      handleAddClient();
      toast.success("Client registration successful");
      router.push("register/confirmDataPage");
    } catch (error) {
      toast.error("Error setting client");
      console.error("Error setting client:", error);
    } finally {
      setIsSetting(false);
    }
  };

  const handleAddClient = async () => {
    try {
      await fetch("/api/clientRoutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const handleAddPlumber = async () => {
    try {
      await fetch("/api/plumberRoutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
    } catch (error) {
      console.error("Error adding plumber:", error);
    }
  };

  const handleSetPlumber = async () => {
    setIsSetting(true);
    //api route to set isPlumber to true in my database
    try {
      await fetch("/api/plumberRoutes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isPlumber: true,
          email: session?.user?.email,
        }),
      });

      handleAddPlumber();
      toast.success("Plumber registration successful");
      router.push("register/confirmDataPage");
    } catch (error) {
      toast.error("Error setting plumber");
      console.error("Error setting plumber:", error);
    } finally {
      setIsSetting(false);
    }
  };

  return (
    <Fragment>
      <IoArrowBack
        size={50}
        className="ml-8 transition-all hover:scale-105"
        onClick={() => router.back()}
      />
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-[5%]">
        <h2 className="text-3xl">Who are you?</h2>
        <div className="flex flex-col space-y-4 ">
          <Button
            onClick={handleSetClient}
            disabled={isSetting}
            className="transition-all hover:scale-95"
          >
            Client
          </Button>
          <Button
            onClick={handleSetPlumber}
            disabled={isSetting}
            className="transition-all hover:scale-95"
          >
            Plumber
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
