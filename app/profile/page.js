import { redirect } from "next/navigation";
import { auth, signOut } from "../auth";
import Image from "next/image";
import FormUserProfile from "../components/FormUserProfile";

export default async function Profile() {
  const session = await auth();
  console.log("session", session);
  if (!session) {
    redirect("/sign-in");
  }

  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${session.fbUid}.json`;
  const response = await fetch(url);
  const user = await response.json();

  async function handleSignOut() {
    "use server";
    await signOut();
    redirect("/");
  }

  async function handleSaveUser(formData) {
    "use server";
    const name = formData.get("name");
    const title = formData.get("title");
    const image = formData.get("image");

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ name, title, image })
    });
    if (response.ok) {
      redirect("/profile");
    }
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Profile Page</h1>
        <FormUserProfile action={handleSaveUser} user={user} />
        <div className="btns">
          <button className="btn-cancel" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}
