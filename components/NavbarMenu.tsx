"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/actions/auth.action";

interface Props {
  user: any
}

const NavbarMenu = ({ user }: Props) => {
  const router = useRouter();
  
  return (
    <div className="flex items-center justify-between px-4 py-2">
      {/* Profile Icon and Sign Out Button */}
      <div className="flex items-center space-x-4">
        {/* Hello, Username */}
        {user && (
          <span className="text-gray-700">Hello, {user.username}</span>
        )}
        {/* Profile Icon */}
        {user && (
          <Link href="/profile">
            <span className="cursor-pointer">
              {/* Displaying the first character of the username */}
              <span className="h-8 w-8 flex items-center justify-center bg-gray-300 rounded-full text-gray-700">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </span>
          </Link>
        )}
        
        {/* Sign Out Button */}
        <button onClick={async () => {
          await signOut();
          router.push("/auth/sign-in"); // Redirect to login page after logout
        }} className="bg-blue-700 text-white px-4 py-2 rounded">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default NavbarMenu;