// ClientSignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";

import Image from "next/image";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ProfileButtonProps {
  userImage: string;
  userId: string;
}

export function ProfileButton({ userImage, userId }: ProfileButtonProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            className="rounded-[100%] p-2"
            src={userImage}
            alt="profile image"
            width={60}
            height={60}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/user/${userId}`}>
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
