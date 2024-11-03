"use client";

import { useSession, signOut } from "next-auth/react";
// import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    console.log("session", session);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Welcome to home <Button onClick={() => signOut()}>Sign-Out</Button>
    </div>
  );
}
