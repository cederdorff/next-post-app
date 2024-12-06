"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuthTokenSync from "../hooks/useAuthTokenSync";

export default function Nav() {
  const pathname = usePathname();
  useAuthTokenSync(); // Sync user token with the server

  return (
    <nav>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link href="/posts" className={pathname === "/posts" ? "active" : ""}>
        Posts
      </Link>
      <Link href="/create" className={pathname === "/create" ? "active" : ""}>
        New Post
      </Link>
      <Link href="/profile" className={pathname === "/profile" ? "active" : ""}>
        Profile
      </Link>
    </nav>
  );
}
