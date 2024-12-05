import { redirect } from "next/navigation";
import { auth } from "../auth";
import FormUserProfile from "../components/FormUserProfile";
import SignOutButton from "../components/SignOutButton";

export default async function Profile() {
  const session = await auth();
  console.log(session);

  // if the user is not signed in, redirect them to the sign-in page
  if (!session) {
    redirect("/sign-in");
  }

  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${session.fbUid}.json`;
  const response = await fetch(url);
  const user = await response.json();

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
          <SignOutButton />
        </div>
      </div>
    </section>
  );
}
