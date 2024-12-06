"use client";

import { signOut } from "firebase/auth";
import { logoutUser } from "../auth/";
import { auth } from "../firebaseConfig";

export default function SignOutButton() {
  async function handleSignOut() {
    // sign out the user
    await signOut(auth); // Call client-side function
    await logoutUser(); // Call server-side function
  }

  return (
    <button className="btn-cancel" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
