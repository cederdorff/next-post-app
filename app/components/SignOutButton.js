"use client";

import { signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { signOutUserOnServer } from "../auth/helpers";

export default function SignOutButton() {
  async function handleSignOut() {
    // sign out the user
    await signOut(firebaseAuth);
    await signOutUserOnServer();
  }

  return (
    <button className="btn-cancel" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
