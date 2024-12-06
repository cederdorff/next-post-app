"use client";

import { onIdTokenChanged } from "firebase/auth";
import { useEffect } from "react";
import { loginUser } from "../auth";
import { auth } from "../firebaseConfig";

export default function useAuthTokenSync() {
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async user => {
      if (user) {
        const idToken = await user.getIdToken(); // Automatically refreshed token
        await loginUser(idToken); // Sync refreshed token with the server
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);
}
