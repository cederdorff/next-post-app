"use server";
import { cookies } from "next/headers";
import { adminAuth } from "../firebaseAdminConfig";

export async function loginUser(idToken) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Set HTTP-only cookie
    cookies().set("authToken", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600, // 1 hour
      path: "/"
    });

    return { success: true, email: decodedToken.email };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export async function logoutUser() {
  cookies().delete("authToken");
  return { success: true };
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) return null;
  const decodedToken = await adminAuth.verifyIdToken(token);
  return decodedToken;
}
