import { auth } from "@/app/auth";
import PostCard from "@/app/components/PostCard";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PostPage({ params }) {
  const session = await auth();
  // if the user is not signed in, redirect them to the sign-in page
  if (!session) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts/${id}.json`;
  const response = await fetch(url);
  const post = await response.json();

  async function deletePost() {
    "use server";
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
      redirect("/posts");
    }
  }

  return (
    <main className="page" id="post-page">
      <div className="container">
        <h1>{post.caption}</h1>
        <PostCard post={post} />
        <div className="btns">
          <form action={deletePost}>
            <button className="btn-cancel">Delete post</button>
          </form>
          <Link href={`/posts/${id}/update`}>
            <button>Update post</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
