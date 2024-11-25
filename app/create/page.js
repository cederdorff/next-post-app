import { redirect } from "next/navigation";
import FormPost from "../components/FormPost";
import { auth } from "../auth";

export default async function CreatePage() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts.json`; // Get Firebase Realtime Database URL

  async function createPost(formData) {
    "use server";
    const caption = formData.get("caption");
    const image = formData.get("image");

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        caption,
        image,
        uid: session.fbUid
      })
    });

    if (response.ok) {
      redirect("/posts");
    }
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Create New Post</h1>
        <FormPost action={createPost} />
      </div>
    </section>
  );
}
