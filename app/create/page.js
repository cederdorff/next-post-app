import { redirect } from "next/navigation";
import FormPost from "../components/FormPost";

export default function CreatePage() {
  async function createPost(formData) {
    "use server";
    const caption = formData.get("caption");
    const image = formData.get("image");

    const response = await fetch(
      "https://fb-rest-race-default-rtdb.firebaseio.com/posts.json",
      {
        method: "POST",
        body: JSON.stringify({
          caption,
          image,
          uid: "OPPe5jue2Ghxx3mtnxevB5FwCYe2"
        })
      }
    );

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
