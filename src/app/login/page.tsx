"use client";

import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    console.log("session", session);
  }

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.needsRegistration) {
        router.push("/register"); // Redirect to registration page
      } else {
        router.push("/"); // Redirect to homepage if registration is not needed
      }
    }
  }, [status, router, session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-[10%]">
      <div className="bg-slate-600 p-20 rounded-lg shadow-xl ">
        <div>Plum Icon</div>
      </div>
      <div>
        <Button onClick={() => signIn("google")}>Login with Google</Button>
      </div>
    </div>
  );
}
