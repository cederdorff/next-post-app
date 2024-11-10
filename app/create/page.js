import Image from "next/image";
import { redirect } from "next/navigation";

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
        <form action={createPost} className="form-grid">
          <label htmlFor="caption">Caption</label>
          <input
            id="caption"
            name="caption"
            type="text"
            aria-label="caption"
            placeholder="Write a caption..."
          />
          <label htmlFor="image">Image</label>
          <input
            type="url"
            name="image"
            id="image"
            placeholder="Paste an image URL"
          />
          <label htmlFor="image-preview"></label>
          <Image
            id="image-preview"
            className="image-preview"
            src="https://placehold.co/600x400.webp?text=Paste+image+URL"
            alt="Choose"
            width={200}
            height={300}
          />

          <div className="error-message">
            <p></p>
          </div>

          <div className="btns">
            <button>Create</button>
          </div>
        </form>
      </div>
    </section>
  );
}
