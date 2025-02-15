import { auth } from "@/app/auth";
import FormPost from "@/app/components/FormPost";
import { redirect } from "next/navigation";

export default async function UpdatePage({ params }) {
  const session = await auth();
  // if the user is not signed in, redirect them to the sign-in page
  if (!session) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts/${id}.json`;
  const response = await fetch(url);
  const post = await response.json();

  async function updatePost(formData) {
    "use server";
    const caption = formData.get("caption");
    const image = formData.get("image");

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ caption, image })
    });

    if (response.ok) {
      redirect(`/posts/${id}`);
    }
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update Post</h1>
        <FormPost action={updatePost} post={post} />
      </div>
    </section>
  );
}
