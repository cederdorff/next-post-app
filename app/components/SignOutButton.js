"use client";

import { signOut } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";

export default function SignOutButton() {
  async function handleSignOut() {
    // sign out the user
    await signOut(firebaseAuth);
  }

  return (
    <button className="btn-cancel" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
