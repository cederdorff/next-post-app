import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UpdatePage({ params }) {
  const { id } = await params;
  const url = `https://fb-rest-race-default-rtdb.firebaseio.com/posts/${id}.json`;
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
        <form action={updatePost} className="form-grid">
          <label htmlFor="caption">Caption</label>
          <input
            id="caption"
            name="caption"
            type="text"
            aria-label="caption"
            defaultValue={post.caption}
          />
          <label htmlFor="image">Image</label>
          <input type="url" name="image" id="image" defaultValue={post.image} />
          <label htmlFor="image-preview"></label>
          <Image
            id="image-preview"
            className="image-preview"
            src={post.image}
            width={600}
            height={400}
            alt={post.caption}
          />

          <div className="btns">
            <button>Update</button>
          </div>
        </form>
      </div>
    </section>
  );
}
