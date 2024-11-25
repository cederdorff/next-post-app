import { redirect } from "next/navigation";
import { auth, signOut } from "../auth";
import Image from "next/image";

export default async function Profile() {
  const session = await auth();
  const user = session?.fbUser;
  console.log("session", session);

  if (!session) {
    redirect("/sign-in");
  }

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

    const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${user.id}.json`;

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ name, title, image })
    });
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Profile Page</h1>
        <form className="form-grid" action={handleSaveUser}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Type name"
            defaultValue={user.name}
          />

          <label htmlFor="email">Mail</label>
          <input
            type="email"
            name="email"
            placeholder="Type email"
            disabled
            defaultValue={user.mail}
          />

          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Type your title"
            defaultValue={user.title}
          />

          <label htmlFor="image-url">Image</label>
          <input type="file" className="hide" accept="image/*" />
          <Image
            id="image"
            className={"image-preview"}
            src={user.image}
            width="200"
            height="200"
            alt="User Profile Image"
          />

          <div className="btns">
            <button>Save User</button>
          </div>
        </form>
        <div className="btns">
          <button className="btn-cancel" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}
