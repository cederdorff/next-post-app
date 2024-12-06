"use server";

export async function getUserByMail(mail) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users.json?orderBy="mail"&equalTo="${mail}"`;
  const response = await fetch(url);
  const userData = await response.json();
  if (Object.keys(userData).length === 0) return null;
  const user = { id: Object.keys(userData)[0], ...Object.values(userData)[0] };
  return user;
}

export async function saveUser(uid, name, mail) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${uid}.json`;
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ name, mail })
  });
  const data = await response.json();

  return { id: data.name, name, mail };
}
