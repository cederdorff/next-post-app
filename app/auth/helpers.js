"use server";

import { signIn, signOut } from "./index";

export async function getUserByMail(mail) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users.json?orderBy="mail"&equalTo="${mail}"`;
  const response = await fetch(url);
  const userData = await response.json();
  if (Object.keys(userData).length === 0) return null;
  const user = { id: Object.keys(userData)[0], ...Object.values(userData)[0] };
  return user;
}

export async function createUser(user) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users.json`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user)
  });
  const data = await response.json();

  return { id: data.name, ...user };
}

export async function signInUserOnServer(user) {
  await signIn("credentials", user); // calling the signIn function from auth.js
}

export async function signOutUserOnServer() {
  await signOut();
}
